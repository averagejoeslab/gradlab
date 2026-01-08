import { useState } from 'react'
import { motion } from 'framer-motion'
import { Boxes, Network, TrendingUp } from 'lucide-react'
import { GraphCanvas } from '../components/graph/GraphCanvas'
import { NeuronVisualizer } from '../components/neuron/NeuronVisualizer'
import { TrainingArena } from '../components/training/TrainingArena'

type PlaygroundMode = 'graph' | 'neuron' | 'training'

const modes = [
  { id: 'graph' as const, label: 'Computation Graph', icon: Boxes },
  { id: 'neuron' as const, label: 'Neuron Builder', icon: Network },
  { id: 'training' as const, label: 'Training Arena', icon: TrendingUp },
]

export function PlaygroundPage() {
  const [mode, setMode] = useState<PlaygroundMode>('graph')

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Mode selector */}
      <div className="border-b border-white/5 px-6 py-3">
        <div className="flex gap-2">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`
                relative px-4 py-2 rounded-lg flex items-center gap-2
                transition-colors duration-200
                ${mode === m.id 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }
              `}
            >
              <m.icon className="w-4 h-4" />
              <span className="font-medium">{m.label}</span>
              {mode === m.id && (
                <motion.div
                  layoutId="mode-indicator"
                  className="absolute inset-0 bg-white/10 rounded-lg -z-10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Playground content */}
      <div className="flex-1 overflow-hidden">
        {mode === 'graph' && <GraphCanvas />}
        {mode === 'neuron' && <NeuronVisualizer />}
        {mode === 'training' && <TrainingArena />}
      </div>
    </div>
  )
}

