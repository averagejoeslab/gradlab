import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, BookOpen, Sparkles, ArrowLeft } from 'lucide-react'

export function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-lg"
      >
        {/* 404 Number */}
        <div className="mb-8">
          <span className="text-8xl font-bold bg-gradient-to-r from-flow-400 via-accent-violet to-grad-400 bg-clip-text text-transparent">
            404
          </span>
        </div>

        {/* Message */}
        <h1 className="text-3xl font-bold text-white mb-4">
          Page not found
        </h1>
        <p className="text-gray-400 mb-8 leading-relaxed">
          Looks like this neuron didn't fire correctly. The page you're looking for 
          doesn't exist or has been moved.
        </p>

        {/* Suggestions */}
        <div className="grid gap-3 mb-8">
          <Link
            to="/"
            className="flex items-center gap-3 p-4 rounded-xl bg-void-800/50 border border-white/5 
                     hover:border-flow-500/30 hover:bg-flow-600/10 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-flow-600/20 flex items-center justify-center">
              <Home className="w-5 h-5 text-flow-400" />
            </div>
            <div className="text-left">
              <div className="font-medium text-white group-hover:text-flow-400 transition-colors">
                Go Home
              </div>
              <div className="text-sm text-gray-500">Back to the main page</div>
            </div>
          </Link>

          <Link
            to="/learn"
            className="flex items-center gap-3 p-4 rounded-xl bg-void-800/50 border border-white/5 
                     hover:border-accent-violet/30 hover:bg-accent-violet/10 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-accent-violet/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-accent-violet" />
            </div>
            <div className="text-left">
              <div className="font-medium text-white group-hover:text-accent-violet transition-colors">
                Learn
              </div>
              <div className="text-sm text-gray-500">Explore neural network concepts</div>
            </div>
          </Link>

          <Link
            to="/playground"
            className="flex items-center gap-3 p-4 rounded-xl bg-void-800/50 border border-white/5 
                     hover:border-grad-500/30 hover:bg-grad-600/10 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-grad-600/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-grad-400" />
            </div>
            <div className="text-left">
              <div className="font-medium text-white group-hover:text-grad-400 transition-colors">
                Playground
              </div>
              <div className="text-sm text-gray-500">Build and train networks</div>
            </div>
          </Link>
        </div>

        {/* Back button */}
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Go back
        </button>
      </motion.div>
    </div>
  )
}

