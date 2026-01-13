import { motion } from 'framer-motion'
import { HelpCircle, Check } from 'lucide-react'
import { ModuleShell, StepContent } from '../../../components/learn'

export function BuildingNetworksModule() {
  return (
    <ModuleShell
      courseId="foundations"
      title="Building Networks"
      subtitle="Combining neurons into powerful systems"
      moduleId="building-networks"
      totalSteps={4}
      progressColor="emerald"
    >
      {/* Vocabulary reminder - shown above content */}
      <div className="mb-6 p-3 rounded-lg bg-void-800/30 border border-white/5 flex items-center gap-3 -mt-2">
        <HelpCircle className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-500">
          A <span className="text-accent-cyan">neuron</span> multiplies inputs by weights, adds bias, and applies ReLU
        </span>
      </div>

      <StepContent step={0}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          What you'll learn
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed text-lg">
          A single neuron can only learn simple patterns. To do anything useful — recognize faces, 
          understand language, play games — we need many neurons working together.
        </p>
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-void-800/30">
            <div className="w-6 h-6 rounded-full bg-accent-emerald/30 flex items-center justify-center text-accent-emerald text-sm">✓</div>
            <span className="text-gray-300">What a <strong className="text-accent-emerald">layer</strong> is — neurons working in parallel</span>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-void-800/30">
            <div className="w-6 h-6 rounded-full bg-accent-emerald/30 flex items-center justify-center text-accent-emerald text-sm">✓</div>
            <span className="text-gray-300">What an <strong className="text-flow-400">MLP</strong> is — layers stacked together</span>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-void-800/30">
            <div className="w-6 h-6 rounded-full bg-accent-emerald/30 flex items-center justify-center text-accent-emerald text-sm">✓</div>
            <span className="text-gray-300">How deep networks find complex patterns</span>
          </div>
        </div>
        <div className="bg-void-800 rounded-xl p-6 border-l-4 border-accent-emerald">
          <p className="text-gray-300">
            <strong className="text-white">By the end,</strong> you'll understand the complete architecture 
            of a neural network — from individual neurons to the full system.
          </p>
        </div>
      </StepContent>

      <StepContent step={1}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          Layers: Neurons working together
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          One neuron can only learn simple patterns. To recognize complex things — faces, words, music — 
          we need <strong className="text-white">many neurons working together</strong>.
        </p>
        <p className="text-gray-300 mb-6 leading-relaxed">
          We group neurons into <strong className="text-accent-emerald">layers</strong>:
        </p>

        <div className="flex items-center justify-center my-8">
          <svg viewBox="0 0 350 200" className="w-full max-w-md">
            {/* Connections from inputs to layer */}
            <g stroke="#374151" strokeWidth="1" opacity="0.5">
              {[0, 1].map(i => 
                [0, 1, 2].map(j => (
                  <line key={`${i}-${j}`} x1="60" y1={60 + i * 80} x2="175" y2={40 + j * 60} />
                ))
              )}
            </g>

            {/* Input nodes */}
            <g>
              <text x="60" y="25" textAnchor="middle" className="fill-flow-400 text-xs">inputs</text>
              <motion.circle 
                cx="60" cy="60" r="20" 
                className="fill-flow-600/30 stroke-flow-500" 
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
              />
              <text x="60" y="65" textAnchor="middle" className="fill-white text-sm font-mono">x₁</text>
              <motion.circle 
                cx="60" cy="140" r="20" 
                className="fill-flow-600/30 stroke-flow-500" 
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              />
              <text x="60" y="145" textAnchor="middle" className="fill-white text-sm font-mono">x₂</text>
            </g>

            {/* Layer of neurons */}
            <g>
              <text x="200" y="15" textAnchor="middle" className="fill-accent-emerald text-xs font-medium">layer (3 neurons)</text>
              {[0, 1, 2].map(i => (
                <motion.g key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <circle 
                    cx="200" 
                    cy={40 + i * 60} 
                    r="25" 
                    className="fill-accent-cyan/20 stroke-accent-cyan" 
                    strokeWidth="2"
                  />
                  <text x="200" y={45 + i * 60} textAnchor="middle" className="fill-white text-sm font-mono">n{i + 1}</text>
                </motion.g>
              ))}
            </g>

            {/* Bracket */}
            <motion.path 
              d="M 240 30 Q 270 100 240 170" 
              fill="none" 
              stroke="#6b7280" 
              strokeWidth="1" 
              strokeDasharray="4,4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.6 }}
            />
            <motion.text 
              x="295" y="105" 
              textAnchor="middle" 
              className="fill-gray-400 text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              same inputs,
            </motion.text>
            <motion.text 
              x="295" y="118" 
              textAnchor="middle" 
              className="fill-gray-400 text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              different weights
            </motion.text>
          </svg>
        </div>

        <div className="space-y-3 mb-6">
          <div className="p-4 rounded-xl bg-void-800/50">
            <div className="font-medium text-white mb-1">All neurons in a layer get the same inputs</div>
            <div className="text-sm text-gray-400">
              But each one has <em>different</em> weights — so each learns to detect something different
            </div>
          </div>
          <div className="p-4 rounded-xl bg-void-800/50">
            <div className="font-medium text-white mb-1">More neurons = more patterns</div>
            <div className="text-sm text-gray-400">
              One neuron might learn to detect edges, another colors, another shapes
            </div>
          </div>
        </div>
      </StepContent>

      <StepContent step={2}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          MLP: The complete network
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          When we stack multiple layers together, we create a complete neural network called an 
          <strong className="text-flow-400"> MLP</strong> (Multi-Layer Perceptron):
        </p>

        <div className="flex items-center justify-center my-8">
          <svg viewBox="0 0 420 200" className="w-full max-w-lg">
            {/* Connections */}
            <g stroke="#374151" strokeWidth="1" opacity="0.4">
              {/* Input to layer 1 */}
              {[0, 1].map(i => 
                [0, 1, 2].map(j => (
                  <line key={`i1-${i}-${j}`} x1="50" y1={65 + i * 70} x2="140" y2={45 + j * 55} />
                ))
              )}
              {/* Layer 1 to layer 2 */}
              {[0, 1, 2].map(i => 
                [0, 1, 2].map(j => (
                  <line key={`12-${i}-${j}`} x1="165" y1={45 + i * 55} x2="250" y2={45 + j * 55} />
                ))
              )}
              {/* Layer 2 to output */}
              {[0, 1, 2].map(i => (
                <line key={`2o-${i}`} x1="275" y1={45 + i * 55} x2="355" y2="100" />
              ))}
            </g>

            {/* Input layer */}
            <g>
              <text x="50" y="28" textAnchor="middle" className="fill-flow-400 text-xs">input</text>
              {[0, 1].map(i => (
                <motion.circle 
                  key={i}
                  cx="50" cy={65 + i * 70} r="18" 
                  className="fill-flow-600/30 stroke-flow-500" 
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                />
              ))}
            </g>

            {/* Layer 1 */}
            <g>
              <text x="152" y="20" textAnchor="middle" className="fill-accent-violet text-xs">layer 1</text>
              {[0, 1, 2].map(i => (
                <motion.circle 
                  key={i}
                  cx="152" cy={45 + i * 55} r="16" 
                  className="fill-accent-violet/30 stroke-accent-violet" 
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                />
              ))}
            </g>

            {/* Layer 2 */}
            <g>
              <text x="262" y="20" textAnchor="middle" className="fill-accent-cyan text-xs">layer 2</text>
              {[0, 1, 2].map(i => (
                <motion.circle 
                  key={i}
                  cx="262" cy={45 + i * 55} r="16" 
                  className="fill-accent-cyan/30 stroke-accent-cyan" 
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                />
              ))}
            </g>

            {/* Output */}
            <g>
              <text x="370" y="70" textAnchor="middle" className="fill-grad-400 text-xs">output</text>
              <motion.circle 
                cx="370" cy="100" r="22" 
                className="fill-grad-600/30 stroke-grad-500" 
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              />
            </g>

            {/* Architecture label */}
            <text x="210" y="190" textAnchor="middle" className="fill-gray-500 text-xs">2 inputs → 3 neurons → 3 neurons → 1 output</text>
          </svg>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-flow-600/10 border border-flow-500/30">
            <div className="w-6 h-6 rounded-full bg-flow-600/30 flex items-center justify-center text-flow-400 text-sm shrink-0">1</div>
            <div className="text-gray-300"><strong className="text-white">Input layer</strong> — Where data enters (your photo, sound, or numbers)</div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-accent-violet/10 border border-accent-violet/30">
            <div className="w-6 h-6 rounded-full bg-accent-violet/30 flex items-center justify-center text-accent-violet text-sm shrink-0">2</div>
            <div className="text-gray-300"><strong className="text-white">Hidden layers</strong> — Where patterns are found (each layer finds more complex patterns)</div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-grad-600/10 border border-grad-500/30">
            <div className="w-6 h-6 rounded-full bg-grad-600/30 flex items-center justify-center text-grad-400 text-sm shrink-0">3</div>
            <div className="text-gray-300"><strong className="text-white">Output layer</strong> — Where the prediction comes out</div>
          </div>
        </div>

        <div className="bg-void-800 rounded-xl p-4">
          <p className="text-gray-300">
            <strong className="text-white">Why multiple layers?</strong> Early layers might detect simple things 
            (edges, colors). Later layers combine those into complex concepts (eyes, noses, faces). 
            This hierarchy is what makes deep learning "deep."
          </p>
        </div>
      </StepContent>

      <StepContent step={3}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          Recap: The building blocks
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          You've now seen all the parts that make up a neural network:
        </p>

        <div className="space-y-4 mb-6">
          <div className="p-4 rounded-xl bg-accent-cyan/10 border border-accent-cyan/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-accent-cyan/30 flex items-center justify-center">
                <span className="text-accent-cyan text-lg">○</span>
              </div>
              <div className="font-medium text-accent-cyan">Neuron</div>
            </div>
            <p className="text-sm text-gray-400">
              The basic unit. Takes inputs, multiplies by weights, adds them up, applies an activation function (like ReLU), and outputs a number.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-accent-violet/10 border border-accent-violet/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-accent-violet/30 flex items-center justify-center">
                <span className="text-accent-violet text-lg">w</span>
              </div>
              <div className="font-medium text-accent-violet">Weights & Bias</div>
            </div>
            <p className="text-sm text-gray-400">
              The learnable numbers. Training adjusts these to make better predictions.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-accent-emerald/10 border border-accent-emerald/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-accent-emerald/30 flex items-center justify-center">
                <span className="text-accent-emerald text-lg">▤</span>
              </div>
              <div className="font-medium text-accent-emerald">Layer</div>
            </div>
            <p className="text-sm text-gray-400">
              A group of neurons that all receive the same inputs but have different weights.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-flow-600/10 border border-flow-500/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-flow-600/30 flex items-center justify-center">
                <span className="text-flow-400 text-lg">⊞</span>
              </div>
              <div className="font-medium text-flow-400">MLP (Multi-Layer Perceptron)</div>
            </div>
            <p className="text-sm text-gray-400">
              Multiple layers connected together. Input → Hidden layers → Output.
            </p>
          </div>
        </div>

        <div className="bg-accent-emerald/10 border border-accent-emerald/30 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-accent-emerald mt-0.5" />
            <div>
              <div className="font-medium text-white">Now you know what a neural network is made of!</div>
              <p className="text-sm text-gray-400 mt-1">
                Next, we'll see how data actually flows through these parts to make a prediction.
              </p>
            </div>
          </div>
        </div>
      </StepContent>
    </ModuleShell>
  )
}

