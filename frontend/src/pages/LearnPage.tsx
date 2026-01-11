import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  BookOpen,
  Boxes,
  ArrowRight,
  Target,
  Search,
  Wrench,
  RefreshCw,
  Check
} from 'lucide-react'
import { useStore } from '../store/useStore'

const modules = [
  {
    id: 'introduction',
    title: 'Introduction',
    subtitle: 'What is a neural network?',
    description: 'Start here! Learn what neural networks are, what they do, and how they learn — using an analogy you already understand.',
    icon: BookOpen,
    color: 'white',
    path: '/learn/introduction',
  },
  {
    id: 'building-blocks',
    title: 'Building Blocks',
    subtitle: 'The parts of a network',
    description: 'Meet the neuron, understand weights and layers, and see how they combine into a complete network (MLP).',
    icon: Boxes,
    color: 'cyan',
    path: '/learn/building-blocks',
  },
  {
    id: 'making-predictions',
    title: 'Making Predictions',
    subtitle: 'How inputs become outputs',
    description: 'Watch data flow through the network in the forward pass to produce a prediction.',
    icon: ArrowRight,
    color: 'flow',
    path: '/learn/making-predictions',
  },
  {
    id: 'measuring-mistakes',
    title: 'Measuring Mistakes',
    subtitle: 'How we know when we\'re wrong',
    description: 'Learn how the loss function measures the gap between predictions and correct answers.',
    icon: Target,
    color: 'rose',
    path: '/learn/measuring-mistakes',
  },
  {
    id: 'finding-what-to-fix',
    title: 'Finding What to Fix',
    subtitle: 'Tracing back to find the problem',
    description: 'Understand gradients and backpropagation — how the network knows which weights to adjust.',
    icon: Search,
    color: 'orange',
    path: '/learn/finding-what-to-fix',
  },
  {
    id: 'making-adjustments',
    title: 'Making Adjustments',
    subtitle: 'Actually improving the network',
    description: 'See how gradient descent uses gradients to update weights and reduce the loss.',
    icon: Wrench,
    color: 'emerald',
    path: '/learn/making-adjustments',
  },
  {
    id: 'putting-it-together',
    title: 'Putting It Together',
    subtitle: 'The complete training loop',
    description: 'Bring it all together: the training loop that makes neural networks learn.',
    icon: RefreshCw,
    color: 'violet',
    path: '/learn/putting-it-together',
  },
]

const colorClasses = {
  white: 'from-gray-400 to-gray-500',
  flow: 'from-flow-500 to-flow-600',
  violet: 'from-accent-violet to-purple-600',
  orange: 'from-grad-500 to-grad-600',
  cyan: 'from-accent-cyan to-cyan-600',
  emerald: 'from-accent-emerald to-emerald-600',
  rose: 'from-accent-rose to-rose-600',
}

export function LearnPage() {
  const { completedModules } = useStore()

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
          Understand neural networks step by step — no coding or math background required. 
          Each module builds on the previous, giving you genuine intuition.
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
                <div className={`w-6 h-0.5 ${
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
          const isFirst = index === 0
          
          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={module.path}
                className={`glass-card block group hover:border-white/20 transition-all duration-300 ${
                  isFirst ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
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
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-flow-400 transition-colors">
                  {module.title}
                </h3>
                <p className="text-sm text-flow-400 mb-3">{module.subtitle}</p>
                <p className="text-gray-400 text-sm mb-4">{module.description}</p>
                
                <div className="flex items-center gap-2 text-sm text-gray-500 group-hover:text-flow-400 transition-colors">
                  <span>{isCompleted ? 'Review' : isFirst ? 'Start here' : 'Start'} module</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
