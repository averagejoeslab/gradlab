import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react'
import { useStore } from '../../store/useStore'

export function TrainingModule() {
  const { markModuleComplete } = useStore()
  const [step, setStep] = useState(0)

  const totalSteps = 4

  const handleComplete = () => {
    markModuleComplete('training')
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
          <h1 className="text-3xl font-bold text-white">Training</h1>
          <p className="text-gray-400">Learning from mistakes</p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {[...Array(totalSteps)].map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= step ? 'bg-accent-rose' : 'bg-void-700'
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
              The loss function
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              How do we measure if our network is doing a good job?
              We use a <strong className="text-accent-rose">loss function</strong> — a number that tells us how wrong our predictions are.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              The goal of training is simple: <em>make the loss as small as possible</em>.
            </p>

            <div className="bg-void-800 rounded-xl p-6 mb-6">
              <div className="text-center mb-6">
                <div className="text-sm text-gray-500 mb-2">Mean Squared Error (MSE)</div>
                <div className="font-mono text-xl">
                  <span className="text-accent-rose">loss</span>
                  <span className="text-gray-500"> = </span>
                  <span className="text-gray-400">average(</span>
                  <span className="text-white">(prediction - target)</span>
                  <span className="text-gray-500">²</span>
                  <span className="text-gray-400">)</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-xl bg-grad-600/20 border-2 border-grad-500/50 
                               flex items-center justify-center mb-2">
                    <span className="font-mono text-white">0.8</span>
                  </div>
                  <div className="text-xs text-gray-500">prediction</div>
                </div>
                <div className="text-2xl text-gray-500">vs</div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-xl bg-accent-emerald/20 border-2 border-accent-emerald/50 
                               flex items-center justify-center mb-2">
                    <span className="font-mono text-white">1.0</span>
                  </div>
                  <div className="text-xs text-gray-500">target</div>
                </div>
                <div className="text-2xl text-gray-500">=</div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-xl bg-accent-rose/20 border-2 border-accent-rose/50 
                               flex items-center justify-center mb-2">
                    <span className="font-mono text-white">0.04</span>
                  </div>
                  <div className="text-xs text-gray-500">loss</div>
                </div>
              </div>
            </div>

            <p className="text-gray-400 text-sm">
              When prediction = target, loss = 0. The bigger the difference, the bigger the loss.
            </p>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Gradient descent
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Remember gradients? They tell us how to change each weight to reduce the loss.
              <strong className="text-grad-400"> Gradient descent</strong> is the algorithm that uses this information to improve the network.
            </p>

            <div className="bg-void-800 rounded-xl p-6 mb-6">
              <div className="text-center font-mono">
                <span className="text-flow-400">weight</span>
                <span className="text-gray-500"> = </span>
                <span className="text-flow-400">weight</span>
                <span className="text-gray-500"> - </span>
                <span className="text-accent-violet">learning_rate</span>
                <span className="text-gray-500"> × </span>
                <span className="text-grad-400">gradient</span>
              </div>
            </div>

            <div className="flex items-center justify-center my-8">
              <svg viewBox="0 0 300 150" className="w-full max-w-md">
                {/* Loss landscape */}
                <path
                  d="M 20 100 Q 80 120 150 50 Q 220 20 280 80"
                  fill="none"
                  stroke="#374151"
                  strokeWidth="3"
                />
                
                {/* Ball positions */}
                <motion.g
                  initial={{ x: 0 }}
                  animate={{ x: [0, 40, 80, 110] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                >
                  <circle cx="40" cy="110" r="8" className="fill-accent-rose" />
                </motion.g>
                
                {/* Labels */}
                <text x="150" y="140" textAnchor="middle" className="fill-gray-500 text-xs">weights</text>
                <text x="15" y="60" className="fill-gray-500 text-xs">loss</text>
                
                {/* Minimum marker */}
                <line x1="200" y1="30" x2="200" y2="45" stroke="#34d399" strokeWidth="2" strokeDasharray="3,3" />
                <text x="200" y="55" textAnchor="middle" className="fill-accent-emerald text-xs">minimum</text>
              </svg>
            </div>

            <p className="text-gray-300 leading-relaxed">
              Think of it like a ball rolling downhill. The gradient points "downhill" 
              toward lower loss. We take small steps in that direction until we reach a minimum.
            </p>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              The training loop
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Training happens in a loop. Each iteration through the data is called an <strong className="text-white">epoch</strong>.
            </p>

            <div className="space-y-4 mb-6">
              {[
                { step: 1, title: 'Forward pass', desc: 'Feed data through network, get predictions', color: 'flow' },
                { step: 2, title: 'Compute loss', desc: 'Measure how wrong the predictions are', color: 'rose' },
                { step: 3, title: 'Backward pass', desc: 'Calculate gradients for all weights', color: 'grad' },
                { step: 4, title: 'Update weights', desc: 'Adjust weights to reduce loss', color: 'emerald' },
                { step: 5, title: 'Repeat', desc: 'Go back to step 1 with new data', color: 'violet' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${item.color === 'flow' ? 'bg-flow-600/30 text-flow-400' :
                      item.color === 'rose' ? 'bg-accent-rose/30 text-accent-rose' :
                      item.color === 'grad' ? 'bg-grad-600/30 text-grad-400' :
                      item.color === 'emerald' ? 'bg-accent-emerald/30 text-accent-emerald' :
                      'bg-accent-violet/30 text-accent-violet'
                    }`}
                  >
                    {item.step}
                  </div>
                  <div>
                    <div className="font-medium text-white">{item.title}</div>
                    <div className="text-sm text-gray-500">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-void-800 rounded-xl p-6 font-mono text-sm">
              <div><span className="text-accent-violet">for</span> epoch <span className="text-accent-violet">in</span> range(<span className="text-grad-400">100</span>):</div>
              <div className="ml-4 text-flow-400">prediction = model.call(inputs)</div>
              <div className="ml-4 text-accent-rose">loss = compute_loss(prediction, target)</div>
              <div className="ml-4 text-grad-400">loss.backward()</div>
              <div className="ml-4 text-accent-emerald">update_weights(model, learning_rate)</div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              🎉 Congratulations!
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              You've learned the fundamentals of neural networks:
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { title: 'Values', desc: 'Numbers with gradients' },
                { title: 'Operations', desc: 'Building computation graphs' },
                { title: 'Gradients', desc: 'Measuring sensitivity' },
                { title: 'Neurons', desc: 'Weighted sums + activations' },
                { title: 'Networks', desc: 'Layers of neurons' },
                { title: 'Training', desc: 'Learning from data' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-xl bg-void-800/50 border border-white/5"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Check className="w-4 h-4 text-accent-emerald" />
                    <span className="font-medium text-white">{item.title}</span>
                  </div>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-flow-600/20 via-accent-violet/20 to-grad-600/20 
                          border border-white/10 rounded-xl p-6 text-center">
              <Sparkles className="w-12 h-12 text-flow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Ready to experiment?</h3>
              <p className="text-gray-400 mb-4">
                Head to the Playground to build your own networks and watch them learn!
              </p>
              <Link
                to="/playground"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Open Playground
              </Link>
            </div>

            <div className="mt-6 bg-accent-emerald/10 border border-accent-emerald/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-accent-emerald mt-0.5" />
                <div>
                  <div className="font-medium text-white">You now understand</div>
                  <p className="text-sm text-gray-400 mt-1">
                    The same principles that power ChatGPT, image generators, and self-driving cars.
                    These networks are just bigger versions of what you've learned here!
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
            to="/learn"
            onClick={handleComplete}
            className="btn-primary flex items-center gap-2"
          >
            Complete Journey
            <Check className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  )
}

