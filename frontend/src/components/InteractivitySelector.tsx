import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Compass, Map, Rocket, ChevronDown } from 'lucide-react'
import { useStore, InteractivityLevel } from '../store/useStore'

const levels: { id: InteractivityLevel; label: string; icon: typeof Compass; description: string }[] = [
  { 
    id: 'guided', 
    label: 'Guided', 
    icon: Map,
    description: 'Step-by-step tutorials with hints'
  },
  { 
    id: 'explorer', 
    label: 'Explorer', 
    icon: Compass,
    description: 'Learn at your own pace with tips'
  },
  { 
    id: 'sandbox', 
    label: 'Sandbox', 
    icon: Rocket,
    description: 'Full freedom to experiment'
  },
]

export function InteractivitySelector() {
  const [isOpen, setIsOpen] = useState(false)
  const { interactivityLevel, setInteractivityLevel } = useStore()
  
  const currentLevel = levels.find(l => l.id === interactivityLevel)!

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-void-700 
                   border border-white/10 hover:border-white/20 transition-colors"
      >
        <currentLevel.icon className="w-4 h-4 text-flow-400" />
        <span className="text-sm font-medium">{currentLevel.label}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 top-full mt-2 w-64 glass-card p-2 z-50"
            >
              {levels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => {
                    setInteractivityLevel(level.id)
                    setIsOpen(false)
                  }}
                  className={`
                    w-full flex items-start gap-3 p-3 rounded-xl text-left transition-colors
                    ${interactivityLevel === level.id 
                      ? 'bg-flow-600/20 text-white' 
                      : 'hover:bg-white/5 text-gray-300'
                    }
                  `}
                >
                  <level.icon className={`w-5 h-5 mt-0.5 ${
                    interactivityLevel === level.id ? 'text-flow-400' : 'text-gray-500'
                  }`} />
                  <div>
                    <div className="font-medium">{level.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{level.description}</div>
                  </div>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

