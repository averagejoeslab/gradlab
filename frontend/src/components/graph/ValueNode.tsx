import { memo, useState } from 'react'
import { Handle, Position, NodeProps } from '@xyflow/react'
import { motion } from 'framer-motion'

export interface ValueNodeData {
  label: string
  value: number
  grad: number
  isInput?: boolean
  isOutput?: boolean
  showGradient?: boolean
  [key: string]: unknown
}

export const ValueNode = memo(({ data, selected }: NodeProps) => {
  const nodeData = data as ValueNodeData
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(nodeData.value.toString())

  const handleDoubleClick = () => {
    if (nodeData.isInput) {
      setIsEditing(true)
      setEditValue(nodeData.value.toString())
    }
  }

  const handleBlur = () => {
    setIsEditing(false)
    const newValue = parseFloat(editValue)
    if (!isNaN(newValue)) {
      nodeData.value = newValue
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur()
    }
  }

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`
        relative px-4 py-3 rounded-xl min-w-[100px]
        ${nodeData.isOutput 
          ? 'bg-gradient-to-br from-grad-500/20 to-grad-600/20 border-2 border-grad-500/50' 
          : nodeData.isInput
            ? 'bg-gradient-to-br from-flow-500/20 to-flow-600/20 border-2 border-flow-500/50'
            : 'bg-void-700 border-2 border-gray-600'
        }
        ${selected ? 'ring-2 ring-white/30' : ''}
        transition-all duration-200
      `}
      onDoubleClick={handleDoubleClick}
    >
      {/* Input handle */}
      {!nodeData.isInput && (
        <Handle
          type="target"
          position={Position.Left}
          className="!w-3 !h-3 !bg-flow-500 !border-2 !border-void-900"
        />
      )}

      {/* Content */}
      <div className="text-center">
        {nodeData.label && (
          <div className="text-xs text-gray-400 mb-1 font-mono">{nodeData.label}</div>
        )}
        
        {isEditing ? (
          <input
            type="number"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            className="w-full bg-void-900 border border-flow-500 rounded px-2 py-1 
                     text-center font-mono text-lg focus:outline-none"
          />
        ) : (
          <div className="font-mono text-xl text-white">
            {nodeData.value.toFixed(nodeData.value % 1 === 0 ? 0 : 2)}
          </div>
        )}

        {/* Gradient display */}
        {nodeData.showGradient && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 pt-2 border-t border-white/10"
          >
            <div className="text-xs text-gray-500">grad</div>
            <div className={`font-mono text-sm ${
              nodeData.grad > 0 ? 'text-grad-400' : 
              nodeData.grad < 0 ? 'text-accent-cyan' : 'text-gray-500'
            }`}>
              {nodeData.grad.toFixed(3)}
            </div>
          </motion.div>
        )}
      </div>

      {/* Output handle */}
      {!nodeData.isOutput && (
        <Handle
          type="source"
          position={Position.Right}
          className="!w-3 !h-3 !bg-flow-500 !border-2 !border-void-900"
        />
      )}

      {/* Glow effect */}
      {nodeData.showGradient && nodeData.grad !== 0 && (
        <div className={`
          absolute inset-0 rounded-xl -z-10 blur-xl opacity-30
          ${nodeData.grad > 0 ? 'bg-grad-500' : 'bg-accent-cyan'}
        `} />
      )}
    </motion.div>
  )
})

ValueNode.displayName = 'ValueNode'
