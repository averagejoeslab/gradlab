import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { useStore } from '../../store/useStore'

export function NetworkModule() {
  const { markModuleComplete } = useStore()
  const [step, setStep] = useState(0)

  const totalSteps = 3

  const handleComplete = () => {
    markModuleComplete('network')
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
          <h1 className="text-3xl font-bold text-white">Networks</h1>
          <p className="text-gray-400">Neurons working together</p>
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

      {/* Content */}
      <div className="glass-card mb-8">
        {step === 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Layers: Groups of neurons
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              A single neuron can only learn simple patterns. 
              To learn complex things, we group neurons into <strong className="text-accent-emerald">layers</strong>.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Each neuron in a layer receives the <em>same inputs</em> but has <em>different weights</em>, 
              so each learns to detect different features.
            </p>

            <div className="flex items-center justify-center my-8">
              <svg viewBox="0 0 300 200" className="w-full max-w-md">
                {/* Connections */}
                <g stroke="#374151" strokeWidth="1">
                  {[0, 1].map(i => 
                    [0, 1, 2].map(j => (
                      <line 
                        key={`${i}-${j}`}
                        x1="60" 
                        y1={60 + i * 80} 
                        x2="160" 
                        y2={40 + j * 60} 
                      />
                    ))
                  )}
                </g>

                {/* Input layer */}
                <g>
                  <text x="60" y="25" textAnchor="middle" className="fill-gray-500 text-xs">inputs</text>
                  <circle cx="60" cy="60" r="20" className="fill-flow-600/30 stroke-flow-500" strokeWidth="2" />
                  <text x="60" y="65" textAnchor="middle" className="fill-white text-sm font-mono">x₁</text>
                  <circle cx="60" cy="140" r="20" className="fill-flow-600/30 stroke-flow-500" strokeWidth="2" />
                  <text x="60" y="145" textAnchor="middle" className="fill-white text-sm font-mono">x₂</text>
                </g>

                {/* Layer */}
                <g>
                  <text x="160" y="15" textAnchor="middle" className="fill-gray-500 text-xs">layer</text>
                  {[0, 1, 2].map(i => (
                    <g key={i}>
                      <motion.circle 
                        cx="160" 
                        cy={40 + i * 60} 
                        r="20" 
                        className="fill-accent-violet/30 stroke-accent-violet" 
                        strokeWidth="2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      />
                      <text x="160" y={45 + i * 60} textAnchor="middle" className="fill-white text-sm font-mono">
                        n{i + 1}
                      </text>
                    </g>
                  ))}
                </g>

                {/* Bracket */}
                <path 
                  d="M 200 30 Q 220 100 200 170" 
                  fill="none" 
                  stroke="#6b7280" 
                  strokeWidth="1" 
                  strokeDasharray="4,4"
                />
                <text x="235" y="105" textAnchor="middle" className="fill-gray-400 text-xs">
                  3 neurons
                </text>
              </svg>
            </div>

            <div className="bg-void-800 rounded-xl p-6 font-mono text-sm">
              <div className="text-gray-500">// Create a layer with 3 neurons, each taking 2 inputs</div>
              <div className="mt-2">
                <span className="text-accent-violet">const</span> layer = <span className="text-accent-cyan">new</span> <span className="text-flow-400">Layer</span>(<span className="text-grad-400">2</span>, <span className="text-grad-400">3</span>)
              </div>
              <div className="mt-2 text-gray-500">// layer has 3 neurons × (2 weights + 1 bias) = 9 parameters</div>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              MLP: Multi-Layer Perceptron
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              By stacking multiple layers, we create a <strong className="text-accent-emerald">Multi-Layer Perceptron (MLP)</strong>.
              Each layer's outputs become the next layer's inputs.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              The more layers, the more complex patterns the network can learn — 
              that's why they're called "deep" neural networks!
            </p>

            <div className="flex items-center justify-center my-8">
              <svg viewBox="0 0 400 200" className="w-full max-w-lg">
                {/* Connections */}
                <g stroke="#374151" strokeWidth="1" opacity="0.5">
                  {/* Input to hidden1 */}
                  {[0, 1].map(i => 
                    [0, 1, 2, 3].map(j => (
                      <line key={`ih1-${i}-${j}`} x1="50" y1={70 + i * 60} x2="130" y2={35 + j * 45} />
                    ))
                  )}
                  {/* Hidden1 to hidden2 */}
                  {[0, 1, 2, 3].map(i => 
                    [0, 1, 2, 3].map(j => (
                      <line key={`h1h2-${i}-${j}`} x1="130" y1={35 + i * 45} x2="220" y2={35 + j * 45} />
                    ))
                  )}
                  {/* Hidden2 to output */}
                  {[0, 1, 2, 3].map(i => (
                    <line key={`h2o-${i}`} x1="220" y1={35 + i * 45} x2="300" y2="100" />
                  ))}
                </g>

                {/* Input layer */}
                <g>
                  <text x="50" y="20" textAnchor="middle" className="fill-gray-500 text-xs">input</text>
                  {[0, 1].map(i => (
                    <circle key={i} cx="50" cy={70 + i * 60} r="16" className="fill-flow-600/30 stroke-flow-500" strokeWidth="2" />
                  ))}
                </g>

                {/* Hidden layer 1 */}
                <g>
                  <text x="130" y="15" textAnchor="middle" className="fill-gray-500 text-xs">hidden</text>
                  {[0, 1, 2, 3].map(i => (
                    <motion.circle 
                      key={i} 
                      cx="130" 
                      cy={35 + i * 45} 
                      r="14" 
                      className="fill-accent-violet/30 stroke-accent-violet" 
                      strokeWidth="2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    />
                  ))}
                </g>

                {/* Hidden layer 2 */}
                <g>
                  <text x="220" y="15" textAnchor="middle" className="fill-gray-500 text-xs">hidden</text>
                  {[0, 1, 2, 3].map(i => (
                    <motion.circle 
                      key={i} 
                      cx="220" 
                      cy={35 + i * 45} 
                      r="14" 
                      className="fill-accent-cyan/30 stroke-accent-cyan" 
                      strokeWidth="2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                    />
                  ))}
                </g>

                {/* Output layer */}
                <g>
                  <text x="300" y="70" textAnchor="middle" className="fill-gray-500 text-xs">output</text>
                  <motion.circle 
                    cx="300" 
                    cy="100" 
                    r="18" 
                    className="fill-grad-600/30 stroke-grad-500" 
                    strokeWidth="2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 }}
                  />
                </g>

                {/* Architecture label */}
                <text x="175" y="195" textAnchor="middle" className="fill-gray-400 text-sm font-mono">
                  MLP(2, [4, 4, 1])
                </text>
              </svg>
            </div>

            <div className="bg-void-800 rounded-xl p-6 font-mono text-sm">
              <div className="text-gray-500">// Create an MLP: 2 inputs → 4 hidden → 4 hidden → 1 output</div>
              <div className="mt-2">
                <span className="text-accent-violet">const</span> model = <span className="text-accent-cyan">new</span> <span className="text-flow-400">MLP</span>(<span className="text-grad-400">2</span>, [<span className="text-grad-400">4</span>, <span className="text-grad-400">4</span>, <span className="text-grad-400">1</span>])
              </div>
              <div className="mt-2">
                <span className="text-gray-500">// Total parameters: </span>
                <span className="text-white">41</span>
                <span className="text-gray-500"> (weights + biases)</span>
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
              Forward pass: Data flows through
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              When you give inputs to a network, data flows forward through each layer — 
              this is called the <strong className="text-flow-400">forward pass</strong>.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Each layer transforms the data, extracting increasingly abstract features 
              until the final layer produces the prediction.
            </p>

            <div className="flex items-center justify-center gap-4 my-8">
              {[
                { label: 'Input', color: 'flow', examples: ['x, y coords', 'pixels', 'words'] },
                { label: 'Hidden', color: 'violet', examples: ['edges', 'shapes', 'concepts'] },
                { label: 'Hidden', color: 'cyan', examples: ['patterns', 'objects', 'meanings'] },
                { label: 'Output', color: 'grad', examples: ['class', 'score', 'prediction'] },
              ].map((layer, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="flex flex-col items-center"
                >
                  <div className={`w-20 h-24 rounded-xl bg-${
                    layer.color === 'flow' ? 'flow-600' :
                    layer.color === 'violet' ? 'accent-violet' :
                    layer.color === 'cyan' ? 'accent-cyan' : 'grad-600'
                  }/20 border-2 border-${
                    layer.color === 'flow' ? 'flow-500' :
                    layer.color === 'violet' ? 'accent-violet' :
                    layer.color === 'cyan' ? 'accent-cyan' : 'grad-500'
                  }/50 flex items-center justify-center mb-2`}
                  style={{
                    background: layer.color === 'flow' ? 'rgba(59, 130, 246, 0.2)' :
                              layer.color === 'violet' ? 'rgba(167, 139, 250, 0.2)' :
                              layer.color === 'cyan' ? 'rgba(34, 211, 238, 0.2)' : 'rgba(249, 115, 22, 0.2)',
                    borderColor: layer.color === 'flow' ? 'rgba(59, 130, 246, 0.5)' :
                                layer.color === 'violet' ? 'rgba(167, 139, 250, 0.5)' :
                                layer.color === 'cyan' ? 'rgba(34, 211, 238, 0.5)' : 'rgba(249, 115, 22, 0.5)'
                  }}>
                    <span className="text-white font-medium text-sm">{layer.label}</span>
                  </div>
                  <div className="text-xs text-gray-500 text-center">
                    {layer.examples[0]}
                  </div>
                  {i < 3 && (
                    <div className="absolute mt-12 ml-20 text-gray-600">→</div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="bg-void-800 rounded-xl p-6 font-mono text-sm">
              <div className="text-gray-500">// Forward pass</div>
              <div className="mt-2">
                <span className="text-accent-violet">const</span> inputs = [<span className="text-accent-cyan">new</span> <span className="text-flow-400">Value</span>(<span className="text-grad-400">1.0</span>), <span className="text-accent-cyan">new</span> <span className="text-flow-400">Value</span>(<span className="text-grad-400">2.0</span>)]
              </div>
              <div>
                <span className="text-accent-violet">const</span> output = model.<span className="text-flow-400">call</span>(inputs)
              </div>
              <div className="mt-2 text-gray-500">// output is a Value containing the prediction</div>
            </div>

            <div className="mt-6 bg-accent-emerald/10 border border-accent-emerald/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-accent-emerald mt-0.5" />
                <div>
                  <div className="font-medium text-white">Key Takeaway</div>
                  <p className="text-sm text-gray-400 mt-1">
                    Neural networks are just layers of neurons stacked together. 
                    Data flows forward (forward pass), predictions flow out, 
                    and gradients flow backward (backward pass) for learning.
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
            to="/learn/training"
            onClick={handleComplete}
            className="btn-primary flex items-center gap-2"
          >
            Continue to Training
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  )
}

