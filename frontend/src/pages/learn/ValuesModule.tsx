import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { useStore } from '../../store/useStore'

// Always show hints for maximum helpfulness

export function ValuesModule() {
  const { markModuleComplete } = useStore()
  const [value, setValue] = useState(5)
  const [step, setStep] = useState(0)

  const totalSteps = 3

  const handleComplete = () => {
    markModuleComplete('values')
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link 
          to="/learn" 
          className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">Values</h1>
          <p className="text-gray-400">Everything is a number</p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {[...Array(totalSteps)].map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= step ? 'bg-flow-500' : 'bg-void-700'
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="glass-card mb-8">
        {step === 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Neural networks work with numbers
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              At the heart of every neural network is a simple idea: <strong className="text-flow-400">everything is a number</strong>.
              Images become grids of pixel values. Words become sequences of numbers. 
              Sounds become waveforms of amplitudes.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              In micrograd, we represent these numbers using something called a <code className="text-flow-400 bg-void-800 px-2 py-1 rounded">Value</code>.
              A Value is just a container for a number — but it has a superpower we'll discover later.
            </p>
            <div className="bg-void-800 rounded-xl p-6 font-mono text-sm">
              <div className="text-gray-500 mb-2">// Creating a Value in micrograd</div>
              <div>
                <span className="text-accent-violet">const</span>{' '}
                <span className="text-white">x</span>{' '}
                <span className="text-gray-500">=</span>{' '}
                <span className="text-accent-cyan">new</span>{' '}
                <span className="text-flow-400">Value</span>
                <span className="text-gray-500">(</span>
                <span className="text-grad-400">5.0</span>
                <span className="text-gray-500">)</span>
              </div>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Try it yourself
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Use the slider below to create a Value with different numbers. 
              Notice how the Value object stores and displays the number you choose.
            </p>

            <div className="flex items-center gap-8 mb-8">
              {/* Slider */}
              <div className="flex-1">
                <input
                  type="range"
                  min="-10"
                  max="10"
                  step="0.5"
                  value={value}
                  onChange={(e) => setValue(parseFloat(e.target.value))}
                  className="w-full accent-flow-500"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>-10</span>
                  <span>0</span>
                  <span>10</span>
                </div>
              </div>

              {/* Value display */}
              <motion.div
                key={value}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="w-32 h-32 rounded-2xl bg-gradient-to-br from-flow-600/20 to-flow-500/10 
                         border-2 border-flow-500/50 flex flex-col items-center justify-center"
              >
                <div className="text-xs text-gray-500 mb-1">Value</div>
                <div className="text-3xl font-mono text-white">{value}</div>
              </motion.div>
            </div>

            <div className="bg-void-800 rounded-xl p-6 font-mono text-sm">
              <div>
                <span className="text-accent-violet">const</span>{' '}
                <span className="text-white">x</span>{' '}
                <span className="text-gray-500">=</span>{' '}
                <span className="text-accent-cyan">new</span>{' '}
                <span className="text-flow-400">Value</span>
                <span className="text-gray-500">(</span>
                <span className="text-grad-400">{value}</span>
                <span className="text-gray-500">)</span>
              </div>
              <div className="mt-2">
                <span className="text-gray-500">// x.data = </span>
                <span className="text-white">{value}</span>
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Values have a secret: gradients
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Every Value in micrograd doesn't just store a number — it also tracks something called a <strong className="text-grad-400">gradient</strong>.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              The gradient tells us: <em>"If I change this value a tiny bit, how much does the final result change?"</em>
              This is the key insight that makes neural networks learn. We'll explore gradients more in the next module.
            </p>

            <div className="flex items-center gap-8 mb-8">
              <motion.div
                className="w-48 h-40 rounded-2xl bg-gradient-to-br from-flow-600/20 to-flow-500/10 
                         border-2 border-flow-500/50 flex flex-col items-center justify-center p-4"
              >
                <div className="text-xs text-gray-500 mb-2">Value</div>
                <div className="text-3xl font-mono text-white mb-3">{value}</div>
                <div className="w-full border-t border-white/10 pt-3">
                  <div className="text-xs text-gray-500">gradient</div>
                  <div className="text-lg font-mono text-grad-400">0.000</div>
                </div>
              </motion.div>

              <div className="flex-1 text-sm text-gray-400">
                <p className="mb-2">
                  <span className="text-flow-400 font-mono">data</span>: The actual number ({value})
                </p>
                <p>
                  <span className="text-grad-400 font-mono">grad</span>: How sensitive the output is to this value (starts at 0)
                </p>
              </div>
            </div>

            <div className="bg-accent-emerald/10 border border-accent-emerald/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-accent-emerald mt-0.5" />
                <div>
                  <div className="font-medium text-white">Key Takeaway</div>
                  <p className="text-sm text-gray-400 mt-1">
                    A Value stores both a number (<code className="text-flow-400">.data</code>) and its gradient (<code className="text-grad-400">.grad</code>).
                    The gradient is what enables neural networks to learn.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
          className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </button>

        {step < totalSteps - 1 ? (
          <button
            onClick={() => setStep(s => s + 1)}
            className="btn-primary flex items-center gap-2"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <Link
            to="/learn/operations"
            onClick={handleComplete}
            className="btn-primary flex items-center gap-2"
          >
            Continue to Operations
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Helpful hint */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 rounded-xl bg-flow-600/10 border border-flow-500/30"
        >
          <p className="text-sm text-flow-300">
            💡 <strong>Tip:</strong> Try dragging the slider to see how the Value changes. 
            Values can be positive, negative, or zero!
          </p>
        </motion.div>
      )}
    </div>
  )
}

