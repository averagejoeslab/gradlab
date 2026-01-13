import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, HelpCircle, Play } from 'lucide-react'
import { ModuleShell, StepContent } from '../../../components/learn'

export function MakingPredictionsModule() {
  const [showFlow, setShowFlow] = useState(false)
  const [flowStep, setFlowStep] = useState(0)

  const startFlow = () => {
    setShowFlow(true)
    setFlowStep(0)
    const interval = setInterval(() => {
      setFlowStep(prev => {
        if (prev >= 4) {
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, 800)
  }

  return (
    <ModuleShell
      courseId="foundations"
      title="Making Predictions"
      subtitle="How inputs become outputs"
      moduleId="making-predictions"
      totalSteps={6}
      progressColor="flow"
    >
      {/* Vocabulary reminder */}
      <div className="mb-6 p-3 rounded-lg bg-void-800/30 border border-white/5 flex items-center gap-3 -mt-2">
        <HelpCircle className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-500">
          Remember: <span className="text-accent-cyan">Neurons</span> multiply inputs by <span className="text-accent-violet">weights</span> and add them up.
          <span className="text-accent-emerald"> Layers</span> group neurons together.
        </span>
      </div>

      <StepContent step={0}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          What you'll learn
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed text-lg">
          In Building Blocks, you learned about <span className="text-accent-cyan">neurons</span>, <span className="text-accent-violet">weights</span>, <span className="text-accent-emerald">layers</span>, and <span className="text-flow-400">MLPs</span>. 
          Now let's watch data actually flow through these parts!
        </p>
        <p className="text-gray-300 mb-6 leading-relaxed">
          In this module, you'll discover:
        </p>
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-void-800/30">
            <div className="w-6 h-6 rounded-full bg-flow-600/30 flex items-center justify-center text-flow-400 text-sm">✓</div>
            <span className="text-gray-300">How data flows through a neural network</span>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-void-800/30">
            <div className="w-6 h-6 rounded-full bg-flow-600/30 flex items-center justify-center text-flow-400 text-sm">✓</div>
            <span className="text-gray-300">What the <strong className="text-flow-400">forward pass</strong> is</span>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-void-800/30">
            <div className="w-6 h-6 rounded-full bg-flow-600/30 flex items-center justify-center text-flow-400 text-sm">✓</div>
            <span className="text-gray-300">How a network produces a prediction</span>
          </div>
        </div>
        <div className="bg-void-800 rounded-xl p-6 border-l-4 border-flow-500">
          <p className="text-gray-300">
            <strong className="text-white">Think of it like an assembly line.</strong> Raw materials enter one end, 
            get transformed at each station, and a finished product comes out the other end.
          </p>
        </div>
      </StepContent>

      <StepContent step={1}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          Data flows forward
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          When a neural network makes a prediction, data flows from left to right through the network:
        </p>

        <div className="flex items-center justify-center my-8">
          <svg viewBox="0 0 440 100" className="w-full max-w-lg">
            {/* Flow arrow */}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
              </marker>
            </defs>
            
            {/* Boxes */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              <rect x="20" y="30" width="70" height="40" rx="8" className="fill-flow-600/30 stroke-flow-500" strokeWidth="2" />
              <text x="55" y="55" textAnchor="middle" className="fill-white text-sm">Input</text>
            </motion.g>

            <motion.line 
              x1="90" y1="50" x2="125" y2="50" 
              stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3 }}
            />

            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <rect x="130" y="30" width="70" height="40" rx="8" className="fill-accent-violet/30 stroke-accent-violet" strokeWidth="2" />
              <text x="165" y="55" textAnchor="middle" className="fill-white text-sm">Layer 1</text>
            </motion.g>

            <motion.line 
              x1="200" y1="50" x2="235" y2="50" 
              stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6 }}
            />

            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
              <rect x="240" y="30" width="70" height="40" rx="8" className="fill-accent-cyan/30 stroke-accent-cyan" strokeWidth="2" />
              <text x="275" y="55" textAnchor="middle" className="fill-white text-sm">Layer 2</text>
            </motion.g>

            <motion.line 
              x1="310" y1="50" x2="345" y2="50" 
              stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9 }}
            />

            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
              <rect x="350" y="30" width="70" height="40" rx="8" className="fill-grad-600/30 stroke-grad-500" strokeWidth="2" />
              <text x="385" y="55" textAnchor="middle" className="fill-white text-sm">Output</text>
            </motion.g>

            {/* Label */}
            <text x="220" y="90" textAnchor="middle" className="fill-flow-400 text-xs">forward pass →</text>
          </svg>
        </div>

        <p className="text-gray-300 leading-relaxed">
          This left-to-right flow is called the <strong className="text-flow-400">forward pass</strong>. 
          Each layer transforms the data, passing its output to the next layer, until we get the final prediction.
        </p>
      </StepContent>

      <StepContent step={2}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          What happens at each layer?
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          At each layer, every neuron does the same job you learned in "How Neurons Compute":
        </p>

        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-flow-600/10 border border-flow-500/30">
            <div className="w-8 h-8 rounded-full bg-flow-600/30 flex items-center justify-center text-flow-400 font-medium shrink-0">1</div>
            <div>
              <div className="font-medium text-white">Receive numbers</div>
              <div className="text-sm text-gray-400">Each neuron gets the outputs from the previous layer (or the raw input)</div>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-xl bg-accent-violet/10 border border-accent-violet/30">
            <div className="w-8 h-8 rounded-full bg-accent-violet/30 flex items-center justify-center text-accent-violet font-medium shrink-0">2</div>
            <div>
              <div className="font-medium text-white">Multiply by weights</div>
              <div className="text-sm text-gray-400">Each input gets multiplied by its weight</div>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-xl bg-accent-emerald/10 border border-accent-emerald/30">
            <div className="w-8 h-8 rounded-full bg-accent-emerald/30 flex items-center justify-center text-accent-emerald font-medium shrink-0">3</div>
            <div>
              <div className="font-medium text-white">Add them up</div>
              <div className="text-sm text-gray-400">Sum all the weighted inputs (plus the bias)</div>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-xl bg-grad-600/10 border border-grad-500/30">
            <div className="w-8 h-8 rounded-full bg-grad-600/30 flex items-center justify-center text-grad-400 font-medium shrink-0">4</div>
            <div>
              <div className="font-medium text-white">Pass it on</div>
              <div className="text-sm text-gray-400">Send the result to the next layer</div>
            </div>
          </div>
        </div>

        <div className="bg-void-800 rounded-xl p-4 text-sm text-gray-400">
          <strong className="text-white">This happens simultaneously</strong> for all neurons in a layer — 
          they all process in parallel, then all pass their outputs forward together.
        </div>
      </StepContent>

      <StepContent step={3}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          Watch data flow through
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Let's watch a simple example. We have 2 inputs flowing through a small network:
        </p>

        <div className="flex items-center justify-center my-8">
          <svg viewBox="0 0 420 200" className="w-full max-w-lg">
            {/* Connections */}
            <g stroke="#374151" strokeWidth="1" opacity="0.4">
              {/* Input to layer 1 */}
              {[0, 1].map(i => 
                [0, 1].map(j => (
                  <line key={`i1-${i}-${j}`} x1="55" y1={70 + i * 60} x2="145" y2={70 + j * 60} />
                ))
              )}
              {/* Layer 1 to layer 2 */}
              {[0, 1].map(i => 
                [0, 1].map(j => (
                  <line key={`12-${i}-${j}`} x1="175" y1={70 + i * 60} x2="265" y2={70 + j * 60} />
                ))
              )}
              {/* Layer 2 to output */}
              {[0, 1].map(i => (
                <line key={`2o-${i}`} x1="295" y1={70 + i * 60} x2="365" y2="100" />
              ))}
            </g>

            {/* Input layer */}
            <g>
              <text x="40" y="35" textAnchor="middle" className="fill-flow-400 text-xs">input</text>
              {[0, 1].map(i => (
                <g key={i}>
                  <circle 
                    cx="40" cy={70 + i * 60} r="22" 
                    className={`stroke-flow-500 ${showFlow && flowStep >= 0 ? 'fill-flow-600/50' : 'fill-flow-600/20'}`}
                    strokeWidth="2"
                  />
                  <text x="40" y={75 + i * 60} textAnchor="middle" className="fill-white text-sm font-mono">
                    {i === 0 ? '2' : '3'}
                  </text>
                </g>
              ))}
            </g>

            {/* Flow indicators */}
            {showFlow && flowStep >= 1 && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {[0, 1].map(i => 
                  [0, 1].map(j => (
                    <circle 
                      key={`f1-${i}-${j}`} 
                      cx={100} cy={70 + (i + j) * 30} r="3" 
                      className="fill-flow-400"
                    />
                  ))
                )}
              </motion.g>
            )}

            {/* Layer 1 */}
            <g>
              <text x="160" y="35" textAnchor="middle" className="fill-accent-violet text-xs">layer 1</text>
              {[0, 1].map(i => (
                <g key={i}>
                  <circle 
                    cx="160" cy={70 + i * 60} r="20" 
                    className={`stroke-accent-violet ${showFlow && flowStep >= 2 ? 'fill-accent-violet/50' : 'fill-accent-violet/20'}`}
                    strokeWidth="2"
                  />
                  {showFlow && flowStep >= 2 && (
                    <text x="160" y={75 + i * 60} textAnchor="middle" className="fill-white text-xs font-mono">
                      {i === 0 ? '1.5' : '0.8'}
                    </text>
                  )}
                </g>
              ))}
            </g>

            {/* Layer 2 */}
            <g>
              <text x="280" y="35" textAnchor="middle" className="fill-accent-cyan text-xs">layer 2</text>
              {[0, 1].map(i => (
                <g key={i}>
                  <circle 
                    cx="280" cy={70 + i * 60} r="20" 
                    className={`stroke-accent-cyan ${showFlow && flowStep >= 3 ? 'fill-accent-cyan/50' : 'fill-accent-cyan/20'}`}
                    strokeWidth="2"
                  />
                  {showFlow && flowStep >= 3 && (
                    <text x="280" y={75 + i * 60} textAnchor="middle" className="fill-white text-xs font-mono">
                      {i === 0 ? '2.1' : '1.2'}
                    </text>
                  )}
                </g>
              ))}
            </g>

            {/* Output */}
            <g>
              <text x="385" y="65" textAnchor="middle" className="fill-grad-400 text-xs">output</text>
              <circle 
                cx="385" cy="100" r="24" 
                className={`stroke-grad-500 ${showFlow && flowStep >= 4 ? 'fill-grad-600/50' : 'fill-grad-600/20'}`}
                strokeWidth="2"
              />
              {showFlow && flowStep >= 4 && (
                <text x="385" y="105" textAnchor="middle" className="fill-white text-sm font-mono">0.73</text>
              )}
            </g>

            {/* Step labels */}
            {showFlow && (
              <g>
                {flowStep >= 0 && <text x="40" y="170" textAnchor="middle" className="fill-flow-400 text-xs">start</text>}
                {flowStep >= 2 && <text x="160" y="170" textAnchor="middle" className="fill-accent-violet text-xs">computed</text>}
                {flowStep >= 3 && <text x="280" y="170" textAnchor="middle" className="fill-accent-cyan text-xs">computed</text>}
                {flowStep >= 4 && <text x="385" y="170" textAnchor="middle" className="fill-grad-400 text-xs">prediction!</text>}
              </g>
            )}
          </svg>
        </div>

        <div className="flex justify-center mb-6">
          <button
            onClick={startFlow}
            disabled={showFlow && flowStep < 4}
            className="btn-primary flex items-center gap-2 disabled:opacity-50"
          >
            <Play className="w-4 h-4" />
            {showFlow ? (flowStep >= 4 ? 'Run Again' : 'Running...') : 'Run Forward Pass'}
          </button>
        </div>

        {showFlow && flowStep >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-grad-600/10 border border-grad-500/30 rounded-xl p-4"
          >
            <p className="text-gray-300">
              <strong className="text-white">Done!</strong> The inputs <span className="text-flow-400">2</span> and <span className="text-flow-400">3</span> flowed 
              through the network, getting transformed at each layer, and produced the prediction <span className="text-grad-400">0.73</span>.
            </p>
          </motion.div>
        )}
      </StepContent>

      <StepContent step={4}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          Each layer finds different patterns
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Here's something beautiful about deep networks: each layer learns to see different things.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Image Network Example */}
          <div className="space-y-3">
            <div className="text-sm text-gray-500 font-medium">For images (like face recognition):</div>
            <div className="p-3 rounded-lg bg-flow-600/10 border border-flow-500/30">
              <div className="text-xs text-flow-400 mb-1">Early layers</div>
              <div className="text-sm text-gray-300">Edges, colors, simple shapes</div>
            </div>
            <div className="p-3 rounded-lg bg-accent-violet/10 border border-accent-violet/30">
              <div className="text-xs text-accent-violet mb-1">Middle layers</div>
              <div className="text-sm text-gray-300">Eyes, noses, ears</div>
            </div>
            <div className="p-3 rounded-lg bg-grad-600/10 border border-grad-500/30">
              <div className="text-xs text-grad-400 mb-1">Final layers</div>
              <div className="text-sm text-gray-300">"This is a face" or "This is John"</div>
            </div>
          </div>

          {/* Text Network Example */}
          <div className="space-y-3">
            <div className="text-sm text-gray-500 font-medium">For text (like ChatGPT):</div>
            <div className="p-3 rounded-lg bg-flow-600/10 border border-flow-500/30">
              <div className="text-xs text-flow-400 mb-1">Early layers</div>
              <div className="text-sm text-gray-300">Word meanings, grammar</div>
            </div>
            <div className="p-3 rounded-lg bg-accent-violet/10 border border-accent-violet/30">
              <div className="text-xs text-accent-violet mb-1">Middle layers</div>
              <div className="text-sm text-gray-300">Sentence structure, context</div>
            </div>
            <div className="p-3 rounded-lg bg-grad-600/10 border border-grad-500/30">
              <div className="text-xs text-grad-400 mb-1">Final layers</div>
              <div className="text-sm text-gray-300">"The next word should be 'mat'"</div>
            </div>
          </div>
        </div>

        <div className="bg-void-800 rounded-xl p-4 text-sm text-gray-400">
          <strong className="text-white">The magic:</strong> Nobody tells the network what patterns to look for. 
          Through training, it discovers the useful patterns on its own!
        </div>
      </StepContent>

      <StepContent step={5}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          But what if the prediction is wrong?
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          We can make predictions now — great! But here's the thing: with random weights, 
          the predictions will be <strong className="text-accent-rose">terrible</strong>.
        </p>

        <div className="bg-void-800 rounded-xl p-6 mb-6">
          <div className="text-center">
            <div className="text-4xl mb-4">🤔</div>
            <p className="text-gray-300">
              We fed in a photo of a dog...<br/>
              The network says: <span className="text-accent-rose font-mono">"42% cat, 58% banana"</span>
            </p>
            <p className="text-gray-500 text-sm mt-2">Not great!</p>
          </div>
        </div>

        <p className="text-gray-300 mb-6 leading-relaxed">
          Remember our toddler who called a cat a "dog"? They could only improve because someone 
          <strong className="text-white"> told them they were wrong</strong>. Our network is in the same 
          position — it made a guess, but it needs feedback to learn.
        </p>

        <p className="text-gray-300 mb-6 leading-relaxed">
          To make good predictions, we need to <strong className="text-white">train</strong> the network — 
          adjust its weights so the outputs match what we want. But first: how do we even know 
          <em> how wrong</em> we were? We need to <strong className="text-accent-rose">measure the mistake</strong>. 
          That's what we'll learn next.
        </p>

        <div className="bg-accent-emerald/10 border border-accent-emerald/30 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-accent-emerald mt-0.5" />
            <div>
              <div className="font-medium text-white">Key Takeaway</div>
              <p className="text-sm text-gray-400 mt-1">
                The <span className="text-flow-400">forward pass</span> pushes data through the network to get a prediction. 
                Each layer transforms the data until we get an output. 
                But to get <em>good</em> predictions, we need to learn the right weights.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-void-800/50 border border-white/5">
          <div className="text-sm text-gray-500 mb-2">New vocabulary:</div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <div className="text-flow-400 font-medium">Forward Pass</div>
              <div className="text-xs text-gray-400">Data flowing through the network to produce a prediction</div>
            </div>
            <div>
              <div className="text-grad-400 font-medium">Prediction</div>
              <div className="text-xs text-gray-400">The output of the network — its "answer"</div>
            </div>
            <div>
              <div className="text-accent-cyan font-medium">Inference</div>
              <div className="text-xs text-gray-400">Another word for using a network to make predictions</div>
            </div>
          </div>
        </div>
      </StepContent>
    </ModuleShell>
  )
}

