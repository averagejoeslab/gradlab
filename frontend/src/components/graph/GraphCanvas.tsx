import { useCallback, useRef, useState } from 'react'
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
  Panel,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  X as Multiply, 
  Zap, 
  Play, 
  RotateCcw,
  Hash,
  Trash2
} from 'lucide-react'
import { ValueNode, ValueNodeData } from './ValueNode'
import { OperationNode, OperationNodeData } from './OperationNode'
import { Value } from '../../core/engine'

const nodeTypes = {
  value: ValueNode,
  operation: OperationNode,
}

type ValueNodeType = Node<ValueNodeData, 'value'>
type OperationNodeType = Node<OperationNodeData, 'operation'>
type AppNode = ValueNodeType | OperationNodeType

interface GraphCanvasProps {
  showGradients?: boolean
  onBackward?: () => void
}

export function GraphCanvas({ showGradients = false }: GraphCanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])
  const [isBackwardMode, setIsBackwardMode] = useState(false)
  const nodeIdRef = useRef(0)

  const getNodeId = () => `node_${nodeIdRef.current++}`

  // Add a new value node
  const addValueNode = useCallback((isInput = true) => {
    const id = getNodeId()
    const newNode: ValueNodeType = {
      id,
      type: 'value',
      position: { 
        x: Math.random() * 300 + 100, 
        y: Math.random() * 200 + 100 
      },
      data: { 
        label: isInput ? `x${nodes.filter(n => n.type === 'value' && (n.data as ValueNodeData).isInput).length + 1}` : '',
        value: Math.round(Math.random() * 10 - 5), 
        grad: 0,
        isInput,
        showGradient: showGradients || isBackwardMode,
      },
    }
    setNodes((nds) => [...nds, newNode])
  }, [nodes, setNodes, showGradients, isBackwardMode])

  // Add an operation node
  const addOperationNode = useCallback((op: '+' | '*' | 'ReLU') => {
    const id = getNodeId()
    const newNode: OperationNodeType = {
      id,
      type: 'operation',
      position: { 
        x: Math.random() * 300 + 200, 
        y: Math.random() * 200 + 100 
      },
      data: { 
        op,
        showGradient: showGradients || isBackwardMode,
      },
    }
    setNodes((nds) => [...nds, newNode])
  }, [setNodes, showGradients, isBackwardMode])

  // Handle edge connections
  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge: Edge = {
        ...params,
        id: `edge_${params.source}_${params.target}`,
        animated: false,
        style: { stroke: '#3b82f6', strokeWidth: 2 },
      } as Edge
      setEdges((eds) => addEdge(newEdge, eds))
    },
    [setEdges]
  )

  // Compute forward pass
  const computeForward = useCallback(() => {
    // Build computation graph from nodes and edges
    const valueMap = new Map<string, Value>()
    
    // First, create Value objects for input nodes
    nodes.forEach(node => {
      if (node.type === 'value' && (node.data as ValueNodeData).isInput) {
        valueMap.set(node.id, new Value((node.data as ValueNodeData).value))
      }
    })

    // Topologically process operation nodes
    const processed = new Set<string>()
    let changed = true
    
    while (changed) {
      changed = false
      nodes.forEach(node => {
        if (processed.has(node.id)) return
        
        if (node.type === 'operation') {
          const incomingEdges = edges.filter(e => e.target === node.id)
          const inputValues = incomingEdges.map(e => valueMap.get(e.source)).filter(Boolean) as Value[]
          const opData = node.data as OperationNodeData
          const expectedInputs = opData.op === 'ReLU' ? 1 : 2
          
          if (inputValues.length === expectedInputs) {
            let result: Value
            
            switch (opData.op) {
              case '+':
                result = inputValues[0].add(inputValues[1])
                break
              case '*':
                result = inputValues[0].mul(inputValues[1])
                break
              case 'ReLU':
                result = inputValues[0].relu()
                break
              default:
                return
            }
            
            // Find output edge and set value
            const outEdge = edges.find(e => e.source === node.id)
            if (outEdge) {
              valueMap.set(outEdge.target, result)
            }
            valueMap.set(node.id, result)
            processed.add(node.id)
            changed = true
          }
        }
      })
    }

    // Update node values
    setNodes(nds => nds.map(node => {
      const value = valueMap.get(node.id)
      if (value && node.type === 'value') {
        return {
          ...node,
          data: {
            ...(node.data as ValueNodeData),
            value: value.data,
            grad: value.grad,
          }
        } as AppNode
      }
      return node
    }))

    return valueMap
  }, [nodes, edges, setNodes])

  // Run backward pass
  const runBackward = useCallback(() => {
    setIsBackwardMode(true)
    
    // Update all nodes to show gradients
    setNodes(nds => nds.map(node => ({
      ...node,
      data: {
        ...node.data,
        showGradient: true,
      }
    } as AppNode)))

    // Animate edges
    setEdges(eds => eds.map(edge => ({
      ...edge,
      animated: true,
      style: { ...edge.style, stroke: '#f97316' },
      className: 'edge-backward',
    })))

    // Compute forward then backward
    const valueMap = computeForward()
    
    // Find output node and run backward
    const outputNode = nodes.find(n => n.type === 'value' && (n.data as ValueNodeData).isOutput)
    if (outputNode && valueMap) {
      const outputValue = valueMap.get(outputNode.id)
      if (outputValue) {
        outputValue.backward()
        
        // Update gradients in nodes
        setNodes(nds => nds.map(node => {
          const value = valueMap.get(node.id)
          if (value && node.type === 'value') {
            return {
              ...node,
              data: {
                ...(node.data as ValueNodeData),
                grad: value.grad,
                showGradient: true,
              }
            } as AppNode
          }
          return node
        }))
      }
    }
  }, [nodes, setNodes, setEdges, computeForward])

  // Reset
  const reset = useCallback(() => {
    setIsBackwardMode(false)
    setNodes(nds => nds.map(node => ({
      ...node,
      data: {
        ...node.data,
        grad: 0,
        showGradient: false,
      }
    } as AppNode)))
    setEdges(eds => eds.map(edge => ({
      ...edge,
      animated: false,
      style: { ...edge.style, stroke: '#3b82f6' },
      className: '',
    })))
  }, [setNodes, setEdges])

  // Clear all
  const clearAll = useCallback(() => {
    setNodes([])
    setEdges([])
    setIsBackwardMode(false)
    nodeIdRef.current = 0
  }, [setNodes, setEdges])

  return (
    <div className="w-full h-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="bg-void-950"
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#1a1e25" />
        <Controls className="!bg-void-800 !border-white/10" />
        
        {/* Toolbar */}
        <Panel position="top-left" className="flex gap-2">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card !p-2 flex gap-2"
          >
            <button
              onClick={() => addValueNode(true)}
              className="p-2 rounded-lg bg-flow-600/20 hover:bg-flow-600/30 
                       text-flow-400 transition-colors group"
              title="Add Input Value"
            >
              <Hash className="w-5 h-5" />
            </button>
            <div className="w-px bg-white/10" />
            <button
              onClick={() => addOperationNode('+')}
              className="p-2 rounded-lg hover:bg-white/10 text-gray-400 
                       hover:text-white transition-colors"
              title="Add Addition"
            >
              <Plus className="w-5 h-5" />
            </button>
            <button
              onClick={() => addOperationNode('*')}
              className="p-2 rounded-lg hover:bg-white/10 text-gray-400 
                       hover:text-white transition-colors"
              title="Add Multiplication"
            >
              <Multiply className="w-5 h-5" />
            </button>
            <button
              onClick={() => addOperationNode('ReLU')}
              className="p-2 rounded-lg hover:bg-white/10 text-gray-400 
                       hover:text-white transition-colors"
              title="Add ReLU"
            >
              <Zap className="w-5 h-5" />
            </button>
          </motion.div>
        </Panel>

        {/* Actions */}
        <Panel position="top-right" className="flex gap-2">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card !p-2 flex gap-2"
          >
            <button
              onClick={runBackward}
              disabled={isBackwardMode}
              className="px-4 py-2 rounded-lg bg-grad-600/20 hover:bg-grad-600/30 
                       text-grad-400 transition-colors flex items-center gap-2
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play className="w-4 h-4" />
              Backward
            </button>
            <button
              onClick={reset}
              className="p-2 rounded-lg hover:bg-white/10 text-gray-400 
                       hover:text-white transition-colors"
              title="Reset Gradients"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button
              onClick={clearAll}
              className="p-2 rounded-lg hover:bg-red-500/20 text-gray-400 
                       hover:text-red-400 transition-colors"
              title="Clear All"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </motion.div>
        </Panel>

        {/* Instructions */}
        <AnimatePresence>
          {nodes.length === 0 && (
            <Panel position="bottom-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="glass-card !py-3 !px-6 text-center"
              >
                <p className="text-gray-400">
                  Click <span className="text-flow-400">#</span> to add values, 
                  then connect them with operations
                </p>
              </motion.div>
            </Panel>
          )}
        </AnimatePresence>
      </ReactFlow>
    </div>
  )
}
