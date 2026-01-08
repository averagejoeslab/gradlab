import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { useStore } from '../../store/useStore'

export function NeuronModule() {
  const { markModuleComplete } = useStore()
  const [step, setStep] = useState(0)
  const [inputs] = useState([1.0, 2.0])
  const [weights, setWeights] = useState([0.5, -0.5])
  const [bias, setBias] = useState(0.5)

  const totalSteps = 3

  const computation = useMemo(() => {
    const weightedSum = inputs.reduce((sum, x, i) => sum + x * weights[i], bias)
    const output = Math.max(0, weightedSum) // ReLU
    return { weightedSum, output }
  }, [inputs, weights, bias])

  const handleComplete = () => {
    markModuleComplete('neuron')
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
          <h1 className="text-3xl font-bold text-white">A Neuron</h1>
          <p className="text-gray-400">Weighted sum + activation</p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {[...Array(totalSteps)].map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= step ? 'bg-accent-cyan' : 'bg-void-700'
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
              What is a neuron?
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              A <strong className="text-accent-cyan">neuron</strong> is the basic building block of neural networks.
              Inspired by biological neurons, it takes multiple inputs, processes them, and produces a single output.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              A neuron does three things:
            </p>
            <ol className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-flow-600/30 text-flow-400 flex items-center justify-center text-sm font-medium">1</span>
                <span className="text-gray-300"><strong className="text-white">Weighs</strong> each input (multiplies by a weight)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-accent-violet/30 text-accent-violet flex items-center justify-center text-sm font-medium">2</span>
                <span className="text-gray-300"><strong className="text-white">Sums</strong> all weighted inputs plus a bias</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-accent-emerald/30 text-accent-emerald flex items-center justify-center text-sm font-medium">3</span>
                <span className="text-gray-300"><strong className="text-white">Activates</strong> using a function (like ReLU)</span>
              </li>
            </ol>

            <div className="bg-void-800 rounded-xl p-6 font-mono text-center">
              <span className="text-accent-emerald">output</span>
              <span className="text-gray-500"> = </span>
              <span className="text-accent-emerald">ReLU</span>
              <span className="text-gray-500">(</span>
              <span className="text-accent-violet">Σ</span>
              <span className="text-gray-500">(</span>
              <span className="text-flow-400">w</span>
              <span className="text-gray-500"> × </span>
              <span className="text-flow-400">x</span>
              <span className="text-gray-500">) + </span>
              <span className="text-gray-400">b</span>
              <span className="text-gray-500">)</span>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Build your own neuron
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Adjust the weights and bias to see how they affect the output.
              The inputs are fixed at <span className="text-flow-400 font-mono">x₁=1.0</span> and <span className="text-flow-400 font-mono">x₂=2.0</span>.
            </p>

            {/* Neuron visualization */}
            <div className="flex items-center justify-center gap-8 my-8">
              {/* Inputs */}
              <div className="flex flex-col gap-4">
                {inputs.map((x, i) => (
                  <div 
                    key={i}
                    className="w-16 h-16 rounded-xl bg-flow-600/20 border-2 border-flow-500/50 
                             flex flex-col items-center justify-center"
                  >
                    <div className="text-xs text-gray-500">x{i + 1}</div>
                    <div className="font-mono text-white">{x}</div>
                  </div>
                ))}
              </div>

              {/* Weights */}
              <div className="flex flex-col gap-2">
                {weights.map((w, i) => (
                  <div key={i} className="text-center">
                    <div className="font-mono text-sm text-accent-violet">×{w.toFixed(1)}</div>
                  </div>
                ))}
              </div>

              {/* Sum node */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-void-800 border-2 border-gray-500 
                             flex items-center justify-center text-xl text-gray-300">
                  Σ
                </div>
                <div className="mt-2 text-sm text-gray-500">+{bias.toFixed(1)}</div>
                <div className="mt-1 font-mono text-sm text-gray-400">
                  = {computation.weightedSum.toFixed(2)}
                </div>
              </div>

              {/* ReLU */}
              <div className="flex flex-col items-center">
                <div className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center
                  ${computation.weightedSum > 0 
                    ? 'bg-accent-emerald/20 border-accent-emerald' 
                    : 'bg-void-800 border-gray-600'
                  }`}
                >
                  <span className="text-lg">ReLU</span>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  {computation.weightedSum > 0 ? 'passes' : 'blocked'}
                </div>
              </div>

              {/* Output */}
              <motion.div
                key={computation.output}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 rounded-xl bg-grad-600/20 border-2 border-grad-500/50 
                         flex flex-col items-center justify-center"
              >
                <div className="text-xs text-gray-500">output</div>
                <div className="text-2xl font-mono text-white">{computation.output.toFixed(2)}</div>
              </motion.div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Weight 1 (w₁)</label>
                <input
                  type="range"
                  min="-2"
                  max="2"
                  step="0.1"
                  value={weights[0]}
                  onChange={(e) => setWeights([parseFloat(e.target.value), weights[1]])}
                  className="w-full accent-accent-violet"
                />
                <div className="text-center font-mono text-accent-violet">{weights[0].toFixed(1)}</div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Weight 2 (w₂)</label>
                <input
                  type="range"
                  min="-2"
                  max="2"
                  step="0.1"
                  value={weights[1]}
                  onChange={(e) => setWeights([weights[0], parseFloat(e.target.value)])}
                  className="w-full accent-accent-violet"
                />
                <div className="text-center font-mono text-accent-violet">{weights[1].toFixed(1)}</div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Bias (b)</label>
                <input
                  type="range"
                  min="-2"
                  max="2"
                  step="0.1"
                  value={bias}
                  onChange={(e) => setBias(parseFloat(e.target.value))}
                  className="w-full accent-gray-400"
                />
                <div className="text-center font-mono text-gray-400">{bias.toFixed(1)}</div>
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
              Why ReLU?
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              The <strong className="text-accent-emerald">ReLU</strong> (Rectified Linear Unit) activation function is simple:
              if the input is positive, pass it through; if negative, output zero.
            </p>

            <div className="bg-void-800 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-center gap-12">
                <div className="text-center">
                  <div className="font-mono text-2xl text-accent-emerald mb-2">ReLU(x)</div>
                  <div className="text-gray-400">= max(0, x)</div>
                </div>
                <svg viewBox="0 0 100 60" className="w-32 h-20">
                  <line x1="10" y1="50" x2="90" y2="50" stroke="#374151" strokeWidth="1" />
                  <line x1="50" y1="10" x2="50" y2="55" stroke="#374151" strokeWidth="1" />
                  <polyline
                    points="10,50 50,50 90,10"
                    fill="none"
                    stroke="#34d399"
                    strokeWidth="2"
                  />
                  <text x="95" y="53" className="fill-gray-500 text-xs">x</text>
                  <text x="52" y="8" className="fill-gray-500 text-xs">y</text>
                </svg>
              </div>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              <strong className="text-white">Why is this important?</strong> Without activation functions, 
              stacking multiple neurons would just give you another linear function. 
              ReLU adds <em>non-linearity</em>, allowing neural networks to learn complex patterns.
            </p>

            <div className="bg-void-800 rounded-xl p-6 font-mono text-sm">
              <div className="text-gray-500">// In micrograd, ReLU is built-in</div>
              <div className="mt-2">
                <span className="text-accent-violet">const</span> x = <span className="text-accent-cyan">new</span> <span className="text-flow-400">Value</span>(<span className="text-grad-400">-5</span>)
              </div>
              <div>
                <span className="text-accent-violet">const</span> y = x.<span className="text-accent-emerald">relu</span>()
              </div>
              <div className="mt-2 text-gray-500">// y.data = 0 (negative input → zero output)</div>
            </div>

            <div className="mt-6 bg-accent-emerald/10 border border-accent-emerald/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-accent-emerald mt-0.5" />
                <div>
                  <div className="font-medium text-white">Key Takeaway</div>
                  <p className="text-sm text-gray-400 mt-1">
                    A neuron = weighted sum + bias + activation. The weights and bias 
                    are the learnable parameters that change during training.
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
            to="/learn/network"
            onClick={handleComplete}
            className="btn-primary flex items-center gap-2"
          >
            Continue to Networks
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  )
}

