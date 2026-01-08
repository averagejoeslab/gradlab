import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { useStore } from '../../store/useStore'

export function OperationsModule() {
  const { markModuleComplete } = useStore()
  const [a, setA] = useState(3)
  const [b, setB] = useState(4)
  const [op, setOp] = useState<'+' | '*'>('+')
  const [step, setStep] = useState(0)

  const totalSteps = 3

  const result = useMemo(() => {
    return op === '+' ? a + b : a * b
  }, [a, b, op])

  const handleComplete = () => {
    markModuleComplete('operations')
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
          <h1 className="text-3xl font-bold text-white">Operations</h1>
          <p className="text-gray-400">Numbers combine</p>
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
            <h2 className="text-2xl font-semibold text-white mb-4">
              Values can combine
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Numbers on their own aren't very useful. The power comes from <strong className="text-accent-violet">combining</strong> them.
              In micrograd, Values can be added, multiplied, subtracted, divided, and more.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              When we combine Values, we create a <strong className="text-flow-400">computation graph</strong> — 
              a record of how values flow and transform. This graph is essential for learning.
            </p>

            <div className="flex items-center justify-center gap-4 my-8">
              {/* Visual: a + b = c */}
              <div className="w-20 h-20 rounded-xl bg-flow-600/20 border-2 border-flow-500/50 
                           flex flex-col items-center justify-center">
                <div className="text-xs text-gray-500">a</div>
                <div className="text-2xl font-mono text-white">3</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-void-800 border-2 border-gray-600 
                           flex items-center justify-center text-xl text-gray-300">
                +
              </div>
              <div className="w-20 h-20 rounded-xl bg-flow-600/20 border-2 border-flow-500/50 
                           flex flex-col items-center justify-center">
                <div className="text-xs text-gray-500">b</div>
                <div className="text-2xl font-mono text-white">4</div>
              </div>
              <div className="text-2xl text-gray-500">=</div>
              <div className="w-20 h-20 rounded-xl bg-grad-600/20 border-2 border-grad-500/50 
                           flex flex-col items-center justify-center">
                <div className="text-xs text-gray-500">c</div>
                <div className="text-2xl font-mono text-white">7</div>
              </div>
            </div>

            <div className="bg-void-800 rounded-xl p-6 font-mono text-sm">
              <div><span className="text-accent-violet">const</span> a = <span className="text-accent-cyan">new</span> <span className="text-flow-400">Value</span>(<span className="text-grad-400">3</span>)</div>
              <div><span className="text-accent-violet">const</span> b = <span className="text-accent-cyan">new</span> <span className="text-flow-400">Value</span>(<span className="text-grad-400">4</span>)</div>
              <div className="mt-2"><span className="text-accent-violet">const</span> c = a.<span className="text-flow-400">add</span>(b) <span className="text-gray-500">// c.data = 7</span></div>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Interactive operations
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Experiment with different values and operations. Watch how the result changes!
            </p>

            <div className="flex items-center justify-center gap-4 my-8">
              {/* Value A */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-xl bg-flow-600/20 border-2 border-flow-500/50 
                             flex flex-col items-center justify-center mb-2">
                  <div className="text-xs text-gray-500">a</div>
                  <div className="text-3xl font-mono text-white">{a}</div>
                </div>
                <input
                  type="range"
                  min="-5"
                  max="10"
                  value={a}
                  onChange={(e) => setA(parseInt(e.target.value))}
                  className="w-24 accent-flow-500"
                />
              </div>

              {/* Operation */}
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => setOp('+')}
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl
                    ${op === '+' 
                      ? 'bg-accent-violet/20 border-accent-violet text-white' 
                      : 'bg-void-800 border-gray-600 text-gray-400 hover:border-gray-400'
                    }`}
                >
                  +
                </button>
                <button
                  onClick={() => setOp('*')}
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl
                    ${op === '*' 
                      ? 'bg-accent-violet/20 border-accent-violet text-white' 
                      : 'bg-void-800 border-gray-600 text-gray-400 hover:border-gray-400'
                    }`}
                >
                  ×
                </button>
              </div>

              {/* Value B */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-xl bg-flow-600/20 border-2 border-flow-500/50 
                             flex flex-col items-center justify-center mb-2">
                  <div className="text-xs text-gray-500">b</div>
                  <div className="text-3xl font-mono text-white">{b}</div>
                </div>
                <input
                  type="range"
                  min="-5"
                  max="10"
                  value={b}
                  onChange={(e) => setB(parseInt(e.target.value))}
                  className="w-24 accent-flow-500"
                />
              </div>

              <div className="text-3xl text-gray-500">=</div>

              {/* Result */}
              <motion.div
                key={result}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="w-24 h-24 rounded-xl bg-grad-600/20 border-2 border-grad-500/50 
                         flex flex-col items-center justify-center"
              >
                <div className="text-xs text-gray-500">result</div>
                <div className="text-3xl font-mono text-white">{result}</div>
              </motion.div>
            </div>

            <div className="bg-void-800 rounded-xl p-6 font-mono text-sm">
              <div><span className="text-accent-violet">const</span> a = <span className="text-accent-cyan">new</span> <span className="text-flow-400">Value</span>(<span className="text-grad-400">{a}</span>)</div>
              <div><span className="text-accent-violet">const</span> b = <span className="text-accent-cyan">new</span> <span className="text-flow-400">Value</span>(<span className="text-grad-400">{b}</span>)</div>
              <div className="mt-2">
                <span className="text-accent-violet">const</span> result = a.<span className="text-flow-400">{op === '+' ? 'add' : 'mul'}</span>(b) 
                <span className="text-gray-500"> // result.data = {result}</span>
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
              Building computation graphs
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              When you chain operations together, you build a <strong className="text-flow-400">computation graph</strong>.
              Each value remembers which values and operations created it.
            </p>

            <div className="flex items-center justify-center my-8">
              <svg viewBox="0 0 400 150" className="w-full max-w-lg">
                {/* Edges */}
                <line x1="60" y1="50" x2="140" y2="75" stroke="#3b82f6" strokeWidth="2" />
                <line x1="60" y1="100" x2="140" y2="75" stroke="#3b82f6" strokeWidth="2" />
                <line x1="180" y1="75" x2="220" y2="75" stroke="#3b82f6" strokeWidth="2" />
                <line x1="260" y1="75" x2="340" y2="75" stroke="#3b82f6" strokeWidth="2" />
                <line x1="60" y1="125" x2="300" y2="95" stroke="#3b82f6" strokeWidth="2" />

                {/* Input nodes */}
                <g>
                  <circle cx="40" cy="50" r="25" className="fill-flow-600/30 stroke-flow-500" strokeWidth="2" />
                  <text x="40" y="45" textAnchor="middle" className="fill-gray-400 text-xs">x</text>
                  <text x="40" y="58" textAnchor="middle" className="fill-white text-sm font-mono">2</text>
                </g>
                <g>
                  <circle cx="40" cy="100" r="25" className="fill-flow-600/30 stroke-flow-500" strokeWidth="2" />
                  <text x="40" y="95" textAnchor="middle" className="fill-gray-400 text-xs">y</text>
                  <text x="40" y="108" textAnchor="middle" className="fill-white text-sm font-mono">3</text>
                </g>
                <g>
                  <circle cx="40" cy="125" r="20" className="fill-flow-600/30 stroke-flow-500" strokeWidth="2" />
                  <text x="40" y="130" textAnchor="middle" className="fill-white text-sm font-mono">1</text>
                </g>

                {/* Operations */}
                <g>
                  <circle cx="160" cy="75" r="18" className="fill-void-800 stroke-gray-500" strokeWidth="2" />
                  <text x="160" y="80" textAnchor="middle" className="fill-gray-300 text-lg">×</text>
                </g>
                <g>
                  <circle cx="300" cy="75" r="18" className="fill-void-800 stroke-gray-500" strokeWidth="2" />
                  <text x="300" y="80" textAnchor="middle" className="fill-gray-300 text-lg">+</text>
                </g>

                {/* Intermediate */}
                <g>
                  <circle cx="240" cy="75" r="22" className="fill-accent-violet/30 stroke-accent-violet" strokeWidth="2" />
                  <text x="240" y="80" textAnchor="middle" className="fill-white text-sm font-mono">6</text>
                </g>

                {/* Output */}
                <g>
                  <circle cx="360" cy="75" r="25" className="fill-grad-600/30 stroke-grad-500" strokeWidth="2" />
                  <text x="360" y="70" textAnchor="middle" className="fill-gray-400 text-xs">out</text>
                  <text x="360" y="83" textAnchor="middle" className="fill-white text-sm font-mono">7</text>
                </g>
              </svg>
            </div>

            <div className="bg-void-800 rounded-xl p-6 font-mono text-sm">
              <div><span className="text-gray-500">// out = x * y + 1</span></div>
              <div><span className="text-accent-violet">const</span> x = <span className="text-accent-cyan">new</span> <span className="text-flow-400">Value</span>(<span className="text-grad-400">2</span>)</div>
              <div><span className="text-accent-violet">const</span> y = <span className="text-accent-cyan">new</span> <span className="text-flow-400">Value</span>(<span className="text-grad-400">3</span>)</div>
              <div><span className="text-accent-violet">const</span> out = x.<span className="text-flow-400">mul</span>(y).<span className="text-flow-400">add</span>(<span className="text-accent-cyan">new</span> <span className="text-flow-400">Value</span>(<span className="text-grad-400">1</span>))</div>
              <div className="mt-2 text-gray-500">// out.data = 7</div>
            </div>

            <div className="mt-6 bg-accent-emerald/10 border border-accent-emerald/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-accent-emerald mt-0.5" />
                <div>
                  <div className="font-medium text-white">Key Takeaway</div>
                  <p className="text-sm text-gray-400 mt-1">
                    Operations create new Values and build a graph. This graph records 
                    the <em>history</em> of computations — which is essential for computing gradients.
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
            to="/learn/gradients"
            onClick={handleComplete}
            className="btn-primary flex items-center gap-2"
          >
            Continue to Gradients
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  )
}

