import { memo } from 'react'
import { Handle, Position, NodeProps } from '@xyflow/react'
import { motion } from 'framer-motion'

export interface OperationNodeData {
  op: '+' | '*' | '**' | 'ReLU' | '-' | '/'
  showGradient?: boolean
  [key: string]: unknown
}

const opLabels: Record<string, string> = {
  '+': '+',
  '*': '×',
  '**': '^',
  '-': '−',
  '/': '÷',
  'ReLU': 'R',
}

export const OperationNode = memo(({ data, selected }: NodeProps) => {
  const nodeData = data as OperationNodeData
  const isUnary = nodeData.op === 'ReLU'

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`
        relative w-12 h-12 rounded-full
        bg-void-800 border-2 border-gray-600
        flex items-center justify-center
        font-mono text-xl text-gray-300
        ${selected ? 'ring-2 ring-white/30' : ''}
        hover:border-gray-400 transition-colors
      `}
    >
      {/* Input handles */}
      {isUnary ? (
        <Handle
          type="target"
          position={Position.Left}
          className="!w-3 !h-3 !bg-flow-500 !border-2 !border-void-900"
        />
      ) : (
        <>
          <Handle
            type="target"
            position={Position.Left}
            id="a"
            className="!w-3 !h-3 !bg-flow-500 !border-2 !border-void-900"
            style={{ top: '30%' }}
          />
          <Handle
            type="target"
            position={Position.Left}
            id="b"
            className="!w-3 !h-3 !bg-flow-500 !border-2 !border-void-900"
            style={{ top: '70%' }}
          />
        </>
      )}

      {/* Operation symbol */}
      <span>{opLabels[nodeData.op] || nodeData.op}</span>

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-flow-500 !border-2 !border-void-900"
      />
    </motion.div>
  )
})

OperationNode.displayName = 'OperationNode'
