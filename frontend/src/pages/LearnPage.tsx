import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Circle, 
  GitBranch, 
  Undo2, 
  Cpu, 
  Layers, 
  TrendingUp,
  Check,
  Lock,
  ArrowRight
} from 'lucide-react'
import { useStore } from '../store/useStore'

const modules = [
  {
    id: 'values',
    title: 'Values',
    subtitle: 'Everything is a number',
    description: 'Learn how neural networks represent and store information as simple numbers.',
    icon: Circle,
    color: 'flow',
    path: '/learn/values',
  },
  {
    id: 'operations',
    title: 'Operations',
    subtitle: 'Numbers combine',
    description: 'Discover how basic math operations form the building blocks of neural computation.',
    icon: GitBranch,
    color: 'violet',
    path: '/learn/operations',
  },
  {
    id: 'gradients',
    title: 'Gradients',
    subtitle: 'How sensitive is the output?',
    description: 'Understand how gradients tell us which numbers matter most for the result.',
    icon: Undo2,
    color: 'orange',
    path: '/learn/gradients',
  },
  {
    id: 'neuron',
    title: 'A Neuron',
    subtitle: 'Weighted sum + activation',
    description: 'Build your first neuron and see how it transforms inputs into outputs.',
    icon: Cpu,
    color: 'cyan',
    path: '/learn/neuron',
  },
  {
    id: 'network',
    title: 'Networks',
    subtitle: 'Neurons working together',
    description: 'Stack neurons into layers and see how complex patterns emerge.',
    icon: Layers,
    color: 'emerald',
    path: '/learn/network',
  },
  {
    id: 'training',
    title: 'Training',
    subtitle: 'Learning from mistakes',
    description: 'Watch a network learn by adjusting its weights to minimize errors.',
    icon: TrendingUp,
    color: 'rose',
    path: '/learn/training',
  },
]

const colorClasses = {
  flow: 'from-flow-500 to-flow-600',
  violet: 'from-accent-violet to-purple-600',
  orange: 'from-grad-500 to-grad-600',
  cyan: 'from-accent-cyan to-cyan-600',
  emerald: 'from-accent-emerald to-emerald-600',
  rose: 'from-accent-rose to-rose-600',
}

export function LearnPage() {
  const { completedModules, interactivityLevel } = useStore()

  const isModuleLocked = (index: number) => {
    if (interactivityLevel === 'sandbox') return false
    if (interactivityLevel === 'explorer') return false
    // In guided mode, must complete previous modules
    if (index === 0) return false
    return !completedModules.includes(modules[index - 1].id)
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-white mb-4">Learning Journey</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Master neural networks step by step. Each module builds on the previous, 
          taking you from basic values to training complete networks.
        </p>
      </motion.div>

      {/* Progress indicator */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center gap-2">
          {modules.map((module, index) => (
            <div key={module.id} className="flex items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${completedModules.includes(module.id)
                  ? 'bg-accent-emerald text-void-950'
                  : 'bg-void-700 text-gray-400'
                }
              `}>
                {completedModules.includes(module.id) ? (
                  <Check className="w-4 h-4" />
                ) : (
                  index + 1
                )}
              </div>
              {index < modules.length - 1 && (
                <div className={`w-8 h-0.5 ${
                  completedModules.includes(module.id) ? 'bg-accent-emerald' : 'bg-void-700'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Module Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module, index) => {
          const isCompleted = completedModules.includes(module.id)
          const isLocked = isModuleLocked(index)
          
          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {isLocked ? (
                <div className="glass-card opacity-50 cursor-not-allowed">
                  <ModuleContent module={module} isCompleted={isCompleted} isLocked={isLocked} />
                </div>
              ) : (
                <Link
                  to={module.path}
                  className="glass-card block group hover:border-white/20 transition-all duration-300"
                >
                  <ModuleContent module={module} isCompleted={isCompleted} isLocked={isLocked} />
                </Link>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

function ModuleContent({ 
  module, 
  isCompleted, 
  isLocked 
}: { 
  module: typeof modules[0]
  isCompleted: boolean
  isLocked: boolean
}) {
  return (
    <>
      <div className="flex items-start justify-between mb-4">
        <div className={`
          w-12 h-12 rounded-xl flex items-center justify-center
          bg-gradient-to-br ${colorClasses[module.color as keyof typeof colorClasses]}
        `}>
          <module.icon className="w-6 h-6 text-white" />
        </div>
        {isCompleted && (
          <div className="w-8 h-8 rounded-full bg-accent-emerald/20 flex items-center justify-center">
            <Check className="w-4 h-4 text-accent-emerald" />
          </div>
        )}
        {isLocked && (
          <div className="w-8 h-8 rounded-full bg-void-700 flex items-center justify-center">
            <Lock className="w-4 h-4 text-gray-500" />
          </div>
        )}
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-flow-400 transition-colors">
        {module.title}
      </h3>
      <p className="text-sm text-flow-400 mb-3">{module.subtitle}</p>
      <p className="text-gray-400 text-sm mb-4">{module.description}</p>
      
      {!isLocked && (
        <div className="flex items-center gap-2 text-sm text-gray-500 group-hover:text-flow-400 transition-colors">
          <span>{isCompleted ? 'Review' : 'Start'} module</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      )}
    </>
  )
}

