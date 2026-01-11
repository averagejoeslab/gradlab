import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, HelpCircle } from 'lucide-react'
import { useStore } from '../../store/useStore'

export function MakingAdjustmentsModule() {
  const { markModuleComplete } = useStore()
  const [step, setStep] = useState(0)
  const [weight, setWeight] = useState(2.0)
  const [learningRate, setLearningRate] = useState(0.1)
  const gradient = 0.5 // Pretend gradient

  const totalSteps = 6

  const newWeight = weight - learningRate * gradient

  const handleComplete = () => {
    markModuleComplete('making-adjustments')
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
          <h1 className="text-3xl font-bold text-white">Making Adjustments</h1>
          <p className="text-gray-400">Actually improving the network</p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {[...Array(totalSteps)].map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= step ? 'bg-accent-emerald' : 'bg-void-700'
            }`}
          />
        ))}
      </div>

      {/* Vocabulary reminder */}
      <div className="mb-6 p-3 rounded-lg bg-void-800/30 border border-white/5 flex items-center gap-3">
        <HelpCircle className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-500">
          Remember: <span className="text-grad-400">Gradients</span> tell us which weights to change and by how much.
        </span>
      </div>

      {/* Content */}
      <div className="glass-card mb-8">
        {step === 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-6">
              What you'll learn
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed text-lg">
              We know which weights to fix. Now it's time to actually fix them! 
              In this module, you'll discover:
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-void-800/30">
                <div className="w-6 h-6 rounded-full bg-accent-emerald/30 flex items-center justify-center text-accent-emerald text-sm">✓</div>
                <span className="text-gray-300">How to use gradients to update weights</span>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-void-800/30">
                <div className="w-6 h-6 rounded-full bg-accent-emerald/30 flex items-center justify-center text-accent-emerald text-sm">✓</div>
                <span className="text-gray-300">What gradient descent is (rolling downhill!)</span>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-void-800/30">
                <div className="w-6 h-6 rounded-full bg-accent-emerald/30 flex items-center justify-center text-accent-emerald text-sm">✓</div>
                <span className="text-gray-300">How the learning rate controls the step size</span>
              </div>
            </div>
            <div className="bg-void-800 rounded-xl p-6 border-l-4 border-accent-emerald">
              <p className="text-gray-300">
                <strong className="text-white">This is where learning happens.</strong> Every adjustment 
                makes the network a tiny bit better at its job.
              </p>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-6">
              The update rule
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Here's the key insight: the gradient tells us which direction makes the loss <em>increase</em>. 
              So we go the <strong className="text-white">opposite direction</strong> to make it decrease!
            </p>

            <div className="bg-void-800 rounded-xl p-6 mb-6">
              <div className="text-center">
                <div className="text-gray-400 mb-3">The update formula:</div>
                <div className="text-lg text-white mb-4">
                  new <span className="text-accent-violet">weight</span> = 
                  old <span className="text-accent-violet">weight</span> − 
                  (<span className="text-flow-400">learning rate</span> × <span className="text-grad-400">gradient</span>)
                </div>
                <div className="text-sm text-gray-500">
                  Subtract because we want to go <em>opposite</em> the gradient (downhill)
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-void-800/50">
                <div className="font-medium text-white mb-1">Positive gradient?</div>
                <div className="text-sm text-gray-400">
                  Weight is too high → subtract to make it smaller
                </div>
              </div>
              <div className="p-4 rounded-xl bg-void-800/50">
                <div className="font-medium text-white mb-1">Negative gradient?</div>
                <div className="text-sm text-gray-400">
                  Weight is too low → subtracting negative = add to make it bigger
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-6">
              Gradient descent: Rolling downhill
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Imagine the loss as a hilly landscape. High points are high loss (bad), 
              low points are low loss (good). We want to get to the bottom!
            </p>

            <div className="flex items-center justify-center my-8">
              <svg viewBox="0 0 300 140" className="w-full max-w-md">
                {/* Loss landscape */}
                <path
                  d="M 20 100 Q 80 120 150 50 Q 220 20 280 80"
                  fill="none"
                  stroke="#374151"
                  strokeWidth="3"
                />
                
                {/* Ball rolling animation */}
                <motion.g
                  initial={{ x: 0 }}
                  animate={{ x: [0, 40, 80, 110] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                >
                  <circle cx="40" cy="110" r="8" className="fill-accent-emerald" />
                </motion.g>
                
                {/* Labels */}
                <text x="150" y="135" textAnchor="middle" className="fill-gray-500 text-xs">weights</text>
                <text x="15" y="50" className="fill-gray-500 text-xs">loss</text>
                
                {/* Minimum marker */}
                <line x1="200" y1="30" x2="200" y2="45" stroke="#34d399" strokeWidth="2" strokeDasharray="3,3" />
                <text x="200" y="55" textAnchor="middle" className="fill-accent-emerald text-xs">minimum</text>

                {/* High point */}
                <text x="40" y="95" textAnchor="middle" className="fill-accent-rose text-xs">high loss</text>
              </svg>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              <strong className="text-grad-400">Gradient descent</strong> is like a ball rolling downhill:
            </p>

            <div className="space-y-3 mb-6">
              <div className="p-3 rounded-lg bg-void-800/50">
                <span className="text-gray-300">The <span className="text-grad-400">gradient</span> points uphill (toward higher loss)</span>
              </div>
              <div className="p-3 rounded-lg bg-void-800/50">
                <span className="text-gray-300">We go the <strong className="text-white">opposite direction</strong> (downhill)</span>
              </div>
              <div className="p-3 rounded-lg bg-void-800/50">
                <span className="text-gray-300">Each step takes us closer to the <span className="text-accent-emerald">minimum</span></span>
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-6">
              The learning rate: Step size
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              The <strong className="text-flow-400">learning rate</strong> controls how big each step is. 
              It's like choosing whether to walk or run down the hill.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-accent-rose/10 border border-accent-rose/30">
                <div className="font-medium text-accent-rose mb-2">Too big:</div>
                <div className="text-sm text-gray-400">
                  You might overshoot and miss the minimum — or even go uphill!
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Like running so fast you trip
                </div>
              </div>
              <div className="p-4 rounded-xl bg-grad-600/10 border border-grad-500/30">
                <div className="font-medium text-grad-400 mb-2">Too small:</div>
                <div className="text-sm text-gray-400">
                  Training takes forever because each step is tiny
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Like taking baby steps across a field
                </div>
              </div>
            </div>

            <div className="bg-accent-emerald/10 border border-accent-emerald/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-accent-emerald" />
                <div>
                  <span className="font-medium text-white">Just right:</span>
                  <span className="text-gray-300 text-sm ml-2">
                    Steady progress toward the minimum — not too slow, not too fast
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-6">
              Try it yourself
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Let's update a weight! The gradient is <span className="text-grad-400">0.5</span> 
              (meaning we should decrease this weight to reduce loss).
            </p>

            <div className="bg-void-800 rounded-xl p-6 mb-6">
              <div className="text-center mb-4">
                <div className="text-gray-400 mb-2">The formula in action:</div>
                <div className="text-lg text-white">
                  new weight = <span className="text-accent-violet">{weight.toFixed(2)}</span> − 
                  (<span className="text-flow-400">{learningRate.toFixed(2)}</span> × <span className="text-grad-400">{gradient}</span>) = 
                  <span className="text-accent-emerald"> {newWeight.toFixed(3)}</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  Current weight: <span className="text-accent-violet font-mono">{weight.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(parseFloat(e.target.value))}
                  className="w-full accent-accent-violet"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  Learning rate: <span className="text-flow-400 font-mono">{learningRate.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="0.01"
                  max="0.5"
                  step="0.01"
                  value={learningRate}
                  onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                  className="w-full accent-flow-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-center gap-8 mb-6">
              <div className="text-center">
                <div className="w-20 h-20 rounded-xl bg-accent-violet/20 border-2 border-accent-violet/50 
                             flex flex-col items-center justify-center">
                  <div className="text-xs text-gray-500">old</div>
                  <div className="text-xl font-mono text-white">{weight.toFixed(2)}</div>
                </div>
              </div>
              <div className="text-2xl text-gray-500">→</div>
              <motion.div
                key={newWeight}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-xl bg-accent-emerald/20 border-2 border-accent-emerald/50 
                             flex flex-col items-center justify-center">
                  <div className="text-xs text-gray-500">new</div>
                  <div className="text-xl font-mono text-white">{newWeight.toFixed(3)}</div>
                </div>
              </motion.div>
            </div>

            <div className="p-4 rounded-xl bg-flow-600/10 border border-flow-500/30">
              <p className="text-sm text-gray-300">
                💡 <strong>Try this:</strong> Increase the learning rate and see how much bigger 
                the change becomes. Then imagine doing this to thousands of weights at once!
              </p>
            </div>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-6">
              Every weight gets updated
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              In a real network, we apply this update to <strong className="text-white">every single weight</strong> at once:
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-void-800/50">
                <div className="w-8 h-8 rounded-full bg-grad-600/30 flex items-center justify-center text-grad-400 font-medium shrink-0">1</div>
                <div>
                  <div className="font-medium text-white">Calculate all gradients</div>
                  <div className="text-sm text-gray-400">Backpropagation gives us a gradient for every weight</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-void-800/50">
                <div className="w-8 h-8 rounded-full bg-accent-emerald/30 flex items-center justify-center text-accent-emerald font-medium shrink-0">2</div>
                <div>
                  <div className="font-medium text-white">Update all weights</div>
                  <div className="text-sm text-gray-400">Each weight moves opposite its gradient</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-void-800/50">
                <div className="w-8 h-8 rounded-full bg-flow-600/30 flex items-center justify-center text-flow-400 font-medium shrink-0">3</div>
                <div>
                  <div className="font-medium text-white">Loss decreases</div>
                  <div className="text-sm text-gray-400">After the update, predictions should be slightly better</div>
                </div>
              </div>
            </div>

            <div className="bg-accent-emerald/10 border border-accent-emerald/30 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-accent-emerald mt-0.5" />
                <div>
                  <div className="font-medium text-white">Key Takeaway</div>
                  <p className="text-sm text-gray-400 mt-1">
                    <span className="text-grad-400">Gradient descent</span> uses gradients to update every weight, 
                    nudging each one in the direction that reduces loss. 
                    The <span className="text-flow-400">learning rate</span> controls how big each step is.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-void-800/50 border border-white/5">
              <div className="text-sm text-gray-500 mb-2">New vocabulary:</div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-grad-400 font-medium">Gradient Descent</div>
                  <div className="text-xs text-gray-400">
                    Using gradients to step toward lower loss
                  </div>
                </div>
                <div>
                  <div className="text-flow-400 font-medium">Learning Rate</div>
                  <div className="text-xs text-gray-400">
                    How big of a step to take when updating
                  </div>
                </div>
                <div>
                  <div className="text-accent-emerald font-medium">Update</div>
                  <div className="text-xs text-gray-400">
                    Changing a weight based on its gradient
                  </div>
                </div>
                <div>
                  <div className="text-white font-medium">Step</div>
                  <div className="text-xs text-gray-400">
                    One round of weight updates
                  </div>
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
            to="/learn/putting-it-together"
            onClick={handleComplete}
            className="btn-primary flex items-center gap-2"
          >
            Continue to Putting It Together
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  )
}

