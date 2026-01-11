import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  Sparkles, 
  Boxes, 
  GraduationCap,
  Zap,
  Eye,
  Brain
} from 'lucide-react'

const features = [
  {
    icon: Eye,
    title: 'Visual Learning',
    description: 'See data flow forward and gradients flow backward in real-time'
  },
  {
    icon: Zap,
    title: 'Interactive',
    description: 'Drag, drop, and adjust — build intuition through play'
  },
  {
    icon: Brain,
    title: 'No Code Required',
    description: 'Understand neural networks without writing a single line of code'
  }
]

export function HomePage() {
  return (
    <div className="min-h-[calc(100vh-8rem)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-flow-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-violet/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                          bg-flow-600/10 border border-flow-500/20 mb-8">
              <Sparkles className="w-4 h-4 text-flow-400" />
              <span className="text-sm text-flow-300">Learn neural networks visually</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Understand </span>
              <span className="bg-gradient-to-r from-flow-400 to-accent-violet bg-clip-text text-transparent">
                Neural Networks
              </span>
              <br />
              <span className="text-white">by Building Them</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              An interactive playground where you can build, visualize, and train 
              neural networks — no coding required. Watch gradients flow and 
              develop real intuition.
            </p>

            {/* CTAs */}
            <div className="flex items-center justify-center gap-4">
              <Link to="/courses" className="btn-primary flex items-center gap-2 text-lg">
                <GraduationCap className="w-5 h-5" />
                Start Learning
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/playground" className="btn-secondary flex items-center gap-2 text-lg">
                <Boxes className="w-5 h-5" />
                Open Playground
              </Link>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20"
          >
            <div className="glass-card max-w-4xl mx-auto overflow-hidden">
              <div className="aspect-video bg-void-900 rounded-lg flex items-center justify-center">
                {/* Animated network preview */}
                <NetworkPreview />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card group hover:border-flow-500/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-flow-600/10 flex items-center justify-center mb-4
                              group-hover:bg-flow-600/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-flow-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Animated network preview component
function NetworkPreview() {
  return (
    <svg viewBox="0 0 400 200" className="w-full max-w-md">
      {/* Connections */}
      <motion.g stroke="currentColor" strokeWidth="2" fill="none" className="text-void-600">
        {/* Input to hidden */}
        <line x1="80" y1="60" x2="160" y2="40" />
        <line x1="80" y1="60" x2="160" y2="100" />
        <line x1="80" y1="60" x2="160" y2="160" />
        <line x1="80" y1="140" x2="160" y2="40" />
        <line x1="80" y1="140" x2="160" y2="100" />
        <line x1="80" y1="140" x2="160" y2="160" />
        {/* Hidden to output */}
        <line x1="160" y1="40" x2="240" y2="70" />
        <line x1="160" y1="40" x2="240" y2="130" />
        <line x1="160" y1="100" x2="240" y2="70" />
        <line x1="160" y1="100" x2="240" y2="130" />
        <line x1="160" y1="160" x2="240" y2="70" />
        <line x1="160" y1="160" x2="240" y2="130" />
        {/* Output to final */}
        <line x1="240" y1="70" x2="320" y2="100" />
        <line x1="240" y1="130" x2="320" y2="100" />
      </motion.g>

      {/* Nodes */}
      <g>
        {/* Input layer */}
        <motion.circle
          cx="80" cy="60" r="16"
          className="fill-flow-600"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0 }}
        />
        <motion.circle
          cx="80" cy="140" r="16"
          className="fill-flow-600"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
        />
        
        {/* Hidden layer */}
        <motion.circle
          cx="160" cy="40" r="14"
          className="fill-accent-violet"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
        />
        <motion.circle
          cx="160" cy="100" r="14"
          className="fill-accent-violet"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
        <motion.circle
          cx="160" cy="160" r="14"
          className="fill-accent-violet"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
        />
        
        {/* Output hidden */}
        <motion.circle
          cx="240" cy="70" r="14"
          className="fill-accent-cyan"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
        />
        <motion.circle
          cx="240" cy="130" r="14"
          className="fill-accent-cyan"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
        />
        
        {/* Output */}
        <motion.circle
          cx="320" cy="100" r="16"
          className="fill-grad-500"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
      </g>

      {/* Labels */}
      <g className="fill-gray-500 text-xs font-mono">
        <text x="80" y="185" textAnchor="middle">input</text>
        <text x="160" y="185" textAnchor="middle">hidden</text>
        <text x="240" y="185" textAnchor="middle">hidden</text>
        <text x="320" y="185" textAnchor="middle">output</text>
      </g>
    </svg>
  )
}

