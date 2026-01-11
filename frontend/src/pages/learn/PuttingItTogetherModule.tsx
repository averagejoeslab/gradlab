import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Sparkles, RefreshCw } from 'lucide-react'
import { useStore } from '../../store/useStore'

export function PuttingItTogetherModule() {
  const { markModuleComplete } = useStore()
  const [step, setStep] = useState(0)

  const totalSteps = 5

  const handleComplete = () => {
    markModuleComplete('putting-it-together')
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
          <h1 className="text-3xl font-bold text-white">Putting It Together</h1>
          <p className="text-gray-400">The complete training loop</p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {[...Array(totalSteps)].map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= step ? 'bg-accent-violet' : 'bg-void-700'
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
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent-violet/20 flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-accent-violet" />
              </div>
              <h2 className="text-2xl font-semibold text-white">
                The training loop
              </h2>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              You've learned all the pieces! Now let's see how they work together.
              Training happens in a loop — the same steps, repeated over and over:
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-flow-600/10 border border-flow-500/30">
                <div className="w-8 h-8 rounded-full bg-flow-600/30 flex items-center justify-center text-flow-400 font-medium shrink-0">1</div>
                <div>
                  <div className="font-medium text-white">Make a prediction</div>
                  <div className="text-sm text-gray-400">Feed data through the network (forward pass)</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-accent-rose/10 border border-accent-rose/30">
                <div className="w-8 h-8 rounded-full bg-accent-rose/30 flex items-center justify-center text-accent-rose font-medium shrink-0">2</div>
                <div>
                  <div className="font-medium text-white">Measure the mistake</div>
                  <div className="text-sm text-gray-400">Calculate the loss — how wrong were we?</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-grad-600/10 border border-grad-500/30">
                <div className="w-8 h-8 rounded-full bg-grad-600/30 flex items-center justify-center text-grad-400 font-medium shrink-0">3</div>
                <div>
                  <div className="font-medium text-white">Find what to fix</div>
                  <div className="text-sm text-gray-400">Run backpropagation to get gradients</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-accent-emerald/10 border border-accent-emerald/30">
                <div className="w-8 h-8 rounded-full bg-accent-emerald/30 flex items-center justify-center text-accent-emerald font-medium shrink-0">4</div>
                <div>
                  <div className="font-medium text-white">Make adjustments</div>
                  <div className="text-sm text-gray-400">Update weights using gradient descent</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-accent-violet/10 border border-accent-violet/30">
                <div className="w-8 h-8 rounded-full bg-accent-violet/30 flex items-center justify-center text-accent-violet font-medium shrink-0">5</div>
                <div>
                  <div className="font-medium text-white">Repeat!</div>
                  <div className="text-sm text-gray-400">Go back to step 1 with more examples</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-6">
              Each cycle makes it better
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Each time through the loop, the network improves a little bit:
            </p>

            <div className="flex items-center justify-center my-8">
              <svg viewBox="0 0 300 140" className="w-full max-w-md">
                {/* Loss curve going down */}
                <path
                  d="M 30 30 Q 100 100 150 80 Q 200 60 270 110"
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="3"
                />
                
                {/* Labels */}
                <text x="150" y="135" textAnchor="middle" className="fill-gray-500 text-xs">training steps</text>
                <text x="15" y="70" className="fill-gray-500 text-xs">loss</text>
                
                {/* Progress dots */}
                {[
                  { x: 30, y: 30 },
                  { x: 80, y: 70 },
                  { x: 130, y: 85 },
                  { x: 180, y: 75 },
                  { x: 230, y: 95 },
                  { x: 270, y: 110 },
                ].map((point, i) => (
                  <motion.circle
                    key={i}
                    cx={point.x}
                    cy={point.y}
                    r="4"
                    className="fill-accent-rose"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.2 }}
                  />
                ))}

                {/* High/Low labels */}
                <text x="30" y="20" textAnchor="middle" className="fill-accent-rose text-xs">high</text>
                <text x="270" y="125" textAnchor="middle" className="fill-accent-emerald text-xs">low</text>
              </svg>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-accent-rose/10 border border-accent-rose/30">
                <div className="font-medium text-accent-rose mb-1">At the start</div>
                <div className="text-sm text-gray-400">
                  Random weights → bad predictions → high loss
                </div>
              </div>
              <div className="p-4 rounded-xl bg-accent-emerald/10 border border-accent-emerald/30">
                <div className="font-medium text-accent-emerald mb-1">After training</div>
                <div className="text-sm text-gray-400">
                  Tuned weights → good predictions → low loss
                </div>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed">
              <strong className="text-white">The loss goes down over time.</strong> Each step 
              adjusts the weights to make slightly better predictions.
            </p>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-6">
              Epochs: Full passes through data
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Training data often has many examples (maybe thousands of dog photos!). 
              One complete pass through all your training data is called an <strong className="text-white">epoch</strong>.
            </p>

            <div className="bg-void-800 rounded-xl p-6 mb-6">
              <div className="text-center">
                <div className="text-gray-400 mb-2">If you have 1,000 training examples:</div>
                <div className="text-lg text-white">
                  1 epoch = showing the network all 1,000 examples
                </div>
              </div>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Networks typically train for many epochs — sometimes hundreds or thousands!
            </p>

            <div className="space-y-3 mb-6">
              <div className="p-3 rounded-lg bg-void-800/50">
                <span className="text-flow-400">Epoch 1:</span>
                <span className="text-gray-400 ml-2">First time through all examples</span>
              </div>
              <div className="p-3 rounded-lg bg-void-800/50">
                <span className="text-accent-violet">Epoch 10:</span>
                <span className="text-gray-400 ml-2">Seen each example 10 times</span>
              </div>
              <div className="p-3 rounded-lg bg-void-800/50">
                <span className="text-accent-emerald">Epoch 100:</span>
                <span className="text-gray-400 ml-2">Each example seen 100 times — network is getting good!</span>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed">
              Like studying for a test, seeing examples multiple times helps the network 
              learn the patterns better.
            </p>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-6">
              The complete picture
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Let's zoom out and see the whole system:
            </p>

            <div className="flex items-center justify-center my-8">
              <svg viewBox="0 0 400 250" className="w-full max-w-lg">
                {/* Training data */}
                <g>
                  <rect x="20" y="100" width="60" height="50" rx="8" className="fill-flow-600/30 stroke-flow-500" strokeWidth="2" />
                  <text x="50" y="120" textAnchor="middle" className="fill-gray-400 text-xs">training</text>
                  <text x="50" y="135" textAnchor="middle" className="fill-white text-xs">data</text>
                </g>

                {/* Arrow to network */}
                <path d="M 80 125 L 110 125" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow)" />

                {/* Neural network */}
                <g>
                  <rect x="110" y="80" width="100" height="90" rx="12" className="fill-accent-violet/20 stroke-accent-violet" strokeWidth="2" />
                  <text x="160" y="115" textAnchor="middle" className="fill-white text-sm">Neural</text>
                  <text x="160" y="135" textAnchor="middle" className="fill-white text-sm">Network</text>
                  <text x="160" y="160" textAnchor="middle" className="fill-accent-violet text-xs">(weights)</text>
                </g>

                {/* Arrow to prediction */}
                <path d="M 210 125 L 240 125" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow)" />

                {/* Prediction */}
                <g>
                  <circle cx="275" cy="125" r="30" className="fill-grad-600/30 stroke-grad-500" strokeWidth="2" />
                  <text x="275" y="120" textAnchor="middle" className="fill-gray-400 text-xs">prediction</text>
                  <text x="275" y="135" textAnchor="middle" className="fill-white text-sm">?</text>
                </g>

                {/* Arrow to loss */}
                <path d="M 305 125 L 335 125" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow)" />

                {/* Loss */}
                <g>
                  <circle cx="365" cy="125" r="25" className="fill-accent-rose/30 stroke-accent-rose" strokeWidth="2" />
                  <text x="365" y="130" textAnchor="middle" className="fill-white text-sm">loss</text>
                </g>

                {/* Backprop arrow (curves back) */}
                <path d="M 365 155 Q 365 200 275 200 Q 160 200 160 175" fill="none" stroke="#f97316" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow-orange)" />
                <text x="260" y="220" textAnchor="middle" className="fill-grad-400 text-xs">backpropagation</text>
                <text x="260" y="235" textAnchor="middle" className="fill-gray-500 text-xs">(gradients flow back)</text>

                {/* Weight update indicator */}
                <g>
                  <circle cx="160" cy="55" r="15" className="fill-accent-emerald/30 stroke-accent-emerald" strokeWidth="2" />
                  <text x="160" y="60" textAnchor="middle" className="fill-white text-xs">update</text>
                </g>
                <path d="M 160 70 L 160 80" stroke="#34d399" strokeWidth="2" markerEnd="url(#arrow-green)" />

                {/* Arrows */}
                <defs>
                  <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                  </marker>
                  <marker id="arrow-orange" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#f97316" />
                  </marker>
                  <marker id="arrow-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#34d399" />
                  </marker>
                </defs>
              </svg>
            </div>

            <div className="text-center text-gray-400 text-sm">
              Data flows forward → Loss is computed → Gradients flow backward → Weights are updated → Repeat!
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              🎉 You made it!
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Congratulations! You now understand how neural networks learn:
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {[
                { title: 'Introduction', desc: 'What is a neural network' },
                { title: 'Making Predictions', desc: 'Forward pass through neurons' },
                { title: 'Measuring Mistakes', desc: 'The loss function' },
                { title: 'Finding What to Fix', desc: 'Gradients & backpropagation' },
                { title: 'Making Adjustments', desc: 'Gradient descent' },
                { title: 'Training Loop', desc: 'Repeat until good!' },
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
                    <span className="font-medium text-white text-sm">{item.title}</span>
                  </div>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-flow-600/20 via-accent-violet/20 to-grad-600/20 
                          border border-white/10 rounded-xl p-6 text-center mb-6">
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

            <div className="bg-accent-emerald/10 border border-accent-emerald/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-accent-emerald mt-0.5" />
                <div>
                  <div className="font-medium text-white">What you've learned</div>
                  <p className="text-sm text-gray-400 mt-1">
                    The same principles that power ChatGPT, image generators, and self-driving cars.
                    Those networks are bigger, but the core ideas are exactly what you learned here.
                    <strong className="text-white"> You now have the intuition!</strong>
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

