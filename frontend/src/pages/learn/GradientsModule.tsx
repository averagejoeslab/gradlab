import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Play } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { Value } from '../../core/engine'

export function GradientsModule() {
  const { markModuleComplete } = useStore()
  const [step, setStep] = useState(0)
  const [a, setA] = useState(2)
  const [b, setB] = useState(3)
  const [showGradients, setShowGradients] = useState(false)

  const totalSteps = 3

  const computation = useMemo(() => {
    const valA = new Value(a)
    const valB = new Value(b)
    const c = valA.mul(valB)
    c.backward()
    return {
      result: c.data,
      gradA: valA.grad,
      gradB: valB.grad,
    }
  }, [a, b])

  const handleComplete = () => {
    markModuleComplete('gradients')
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
          <h1 className="text-3xl font-bold text-white">Gradients</h1>
          <p className="text-gray-400">How sensitive is the output?</p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {[...Array(totalSteps)].map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= step ? 'bg-grad-500' : 'bg-void-700'
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
              What are gradients?
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              The <strong className="text-grad-400">gradient</strong> of a value tells us how much the output 
              would change if we nudged that value a tiny bit.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Think of it like asking: <em>"If I increase <span className="text-flow-400">a</span> by 0.001, 
              how much does the final result change?"</em>
            </p>

            <div className="bg-void-800 rounded-xl p-6 mb-6">
              <div className="text-center mb-4">
                <span className="text-gray-400">If </span>
                <span className="text-flow-400 font-mono">c = a × b</span>
                <span className="text-gray-400">, and </span>
                <span className="text-flow-400 font-mono">a = 2</span>
                <span className="text-gray-400">, </span>
                <span className="text-flow-400 font-mono">b = 3</span>
              </div>
              <div className="text-center text-gray-300">
                Then <span className="text-grad-400 font-mono">∂c/∂a = b = 3</span>
                <br />
                <span className="text-sm text-gray-500">(increasing a by 1 increases c by 3)</span>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed">
              This is the foundation of how neural networks learn. Gradients tell us 
              which numbers to adjust and by how much.
            </p>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Backpropagation: Computing gradients
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              micrograd uses <strong className="text-flow-400">backpropagation</strong> to compute gradients automatically.
              When you call <code className="text-flow-400 bg-void-800 px-2 py-1 rounded">.backward()</code>, 
              gradients flow backward through the computation graph.
            </p>

            <div className="flex items-center justify-center gap-4 my-8">
              {/* Value A */}
              <div className="flex flex-col items-center">
                <div className={`w-28 h-28 rounded-xl border-2 flex flex-col items-center justify-center
                  ${showGradients 
                    ? 'bg-flow-600/20 border-flow-500/50' 
                    : 'bg-flow-600/10 border-flow-500/30'
                  }`}
                >
                  <div className="text-xs text-gray-500">a</div>
                  <div className="text-2xl font-mono text-white">{a}</div>
                  {showGradients && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 pt-2 border-t border-white/10 w-full text-center"
                    >
                      <div className="text-xs text-gray-500">grad</div>
                      <div className="text-sm font-mono text-grad-400">{computation.gradA}</div>
                    </motion.div>
                  )}
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={a}
                  onChange={(e) => { setA(parseInt(e.target.value)); setShowGradients(false); }}
                  className="w-24 mt-2 accent-flow-500"
                />
              </div>

              {/* Operation */}
              <div className="w-12 h-12 rounded-full bg-void-800 border-2 border-gray-600 
                           flex items-center justify-center text-xl text-gray-300">
                ×
              </div>

              {/* Value B */}
              <div className="flex flex-col items-center">
                <div className={`w-28 h-28 rounded-xl border-2 flex flex-col items-center justify-center
                  ${showGradients 
                    ? 'bg-flow-600/20 border-flow-500/50' 
                    : 'bg-flow-600/10 border-flow-500/30'
                  }`}
                >
                  <div className="text-xs text-gray-500">b</div>
                  <div className="text-2xl font-mono text-white">{b}</div>
                  {showGradients && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 pt-2 border-t border-white/10 w-full text-center"
                    >
                      <div className="text-xs text-gray-500">grad</div>
                      <div className="text-sm font-mono text-grad-400">{computation.gradB}</div>
                    </motion.div>
                  )}
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={b}
                  onChange={(e) => { setB(parseInt(e.target.value)); setShowGradients(false); }}
                  className="w-24 mt-2 accent-flow-500"
                />
              </div>

              <div className="text-2xl text-gray-500">=</div>

              {/* Result */}
              <div className={`w-28 h-28 rounded-xl border-2 flex flex-col items-center justify-center
                ${showGradients 
                  ? 'bg-grad-600/20 border-grad-500/50 glow-orange' 
                  : 'bg-grad-600/10 border-grad-500/30'
                }`}
              >
                <div className="text-xs text-gray-500">c</div>
                <div className="text-2xl font-mono text-white">{computation.result}</div>
                {showGradients && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 pt-2 border-t border-white/10 w-full text-center"
                  >
                    <div className="text-xs text-gray-500">grad</div>
                    <div className="text-sm font-mono text-grad-400">1</div>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="flex justify-center mb-6">
              <button
                onClick={() => setShowGradients(true)}
                disabled={showGradients}
                className="btn-primary flex items-center gap-2 disabled:opacity-50"
              >
                <Play className="w-4 h-4" />
                Run .backward()
              </button>
            </div>

            {showGradients && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-void-800 rounded-xl p-4 text-sm text-gray-400"
              >
                <p>
                  <span className="text-grad-400">∂c/∂a = {computation.gradA}</span> — 
                  If we increase <span className="text-flow-400">a</span> by 1, 
                  <span className="text-white"> c</span> increases by <span className="text-grad-400">{computation.gradA}</span>
                </p>
                <p className="mt-2">
                  <span className="text-grad-400">∂c/∂b = {computation.gradB}</span> — 
                  If we increase <span className="text-flow-400">b</span> by 1, 
                  <span className="text-white"> c</span> increases by <span className="text-grad-400">{computation.gradB}</span>
                </p>
              </motion.div>
            )}
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Why gradients matter for learning
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Neural networks learn by minimizing a <strong className="text-accent-rose">loss</strong> — 
              a number that measures how wrong the predictions are.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Gradients tell us: <em>"To reduce the loss, should I increase or decrease each weight? And by how much?"</em>
            </p>

            <div className="bg-void-800 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <div className="text-3xl font-mono text-accent-rose mb-2">loss</div>
                  <div className="text-sm text-gray-500">We want this smaller</div>
                </div>
                <div className="text-4xl text-gray-600">←</div>
                <div className="text-center">
                  <div className="text-3xl font-mono text-grad-400">gradients</div>
                  <div className="text-sm text-gray-500">Tell us which way to go</div>
                </div>
              </div>
            </div>

            <div className="bg-void-800 rounded-xl p-6 font-mono text-sm">
              <div className="text-gray-500">// The learning algorithm</div>
              <div className="mt-2">
                <span className="text-accent-violet">for each</span> weight <span className="text-flow-400">w</span>:
              </div>
              <div className="ml-4">
                w.data <span className="text-gray-500">-=</span> learning_rate <span className="text-gray-500">*</span> w.<span className="text-grad-400">grad</span>
              </div>
            </div>

            <div className="mt-6 bg-accent-emerald/10 border border-accent-emerald/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-accent-emerald mt-0.5" />
                <div>
                  <div className="font-medium text-white">Key Takeaway</div>
                  <p className="text-sm text-gray-400 mt-1">
                    Gradients are the compass that guides learning. 
                    <code className="text-flow-400">.backward()</code> computes them automatically 
                    by flowing backward through the computation graph.
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
            to="/learn/neuron"
            onClick={handleComplete}
            className="btn-primary flex items-center gap-2"
          >
            Continue to Neurons
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  )
}

