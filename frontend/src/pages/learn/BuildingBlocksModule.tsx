import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, HelpCircle } from 'lucide-react'
import { ModuleShell, StepContent } from '../../components/learn'

export function BuildingBlocksModule() {
  const [step, setStep] = useState(0)
  const [inputs] = useState([2, 3])
  const [weights, setWeights] = useState([0.5, 0.5])
  const [bias, setBias] = useState(0)
  
  // Pulsing animation phase for biological neuron (0=dendrites, 1=cell body, 2=axon)
  const [pulsePhase, setPulsePhase] = useState(0)
  
  useEffect(() => {
    if (step !== 1) return // Only animate on step 1
    
    const interval = setInterval(() => {
      setPulsePhase(prev => (prev + 1) % 3)
    }, 1000) // 1 second per phase
    
    return () => clearInterval(interval)
  }, [step])

  const computation = useMemo(() => {
    const weightedSum = inputs[0] * weights[0] + inputs[1] * weights[1] + bias
    const output = Math.max(0, weightedSum) // ReLU
    return { weightedSum, output }
  }, [inputs, weights, bias])

  return (
    <ModuleShell
      title="Building Blocks"
      subtitle="The parts of a neural network"
      moduleId="building-blocks"
      totalSteps={10}
      currentStep={step}
      onStepChange={setStep}
      progressColor="cyan"
      nextPath="/learn/making-predictions"
      nextLabel="Continue to Making Predictions"
    >
      {/* Vocabulary reminder - shown above content */}
      <div className="mb-6 p-3 rounded-lg bg-void-800/30 border border-white/5 flex items-center gap-3 -mt-2">
        <HelpCircle className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-500">
          Remember: A neural network is a <span className="text-flow-400">pattern-learning machine</span> that improves by adjusting its weights
        </span>
      </div>

      <StepContent step={0} currentStep={step}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          What you'll learn
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed text-lg">
          Before we see how a neural network makes predictions, let's understand what it's made of:
        </p>
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-void-800/30">
            <div className="w-6 h-6 rounded-full bg-accent-cyan/30 flex items-center justify-center text-accent-cyan text-sm">✓</div>
            <span className="text-gray-300">What a <strong className="text-accent-cyan">neuron</strong> is — the basic building block</span>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-void-800/30">
            <div className="w-6 h-6 rounded-full bg-accent-cyan/30 flex items-center justify-center text-accent-cyan text-sm">✓</div>
            <span className="text-gray-300">What <strong className="text-accent-violet">weights</strong> and <strong className="text-gray-400">bias</strong> are — the learnable parts</span>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-void-800/30">
            <div className="w-6 h-6 rounded-full bg-accent-cyan/30 flex items-center justify-center text-accent-cyan text-sm">✓</div>
            <span className="text-gray-300">What a <strong className="text-accent-emerald">layer</strong> is — neurons working together</span>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-void-800/30">
            <div className="w-6 h-6 rounded-full bg-accent-cyan/30 flex items-center justify-center text-accent-cyan text-sm">✓</div>
            <span className="text-gray-300">What an <strong className="text-flow-400">MLP</strong> is — the complete network</span>
          </div>
        </div>
        <div className="bg-void-800 rounded-xl p-6 border-l-4 border-accent-cyan">
          <p className="text-gray-300">
            <strong className="text-white">Think of it like a factory.</strong> We're going to tour 
            the factory floor first — see the machines and how they're connected — before watching 
            products roll through.
          </p>
        </div>
      </StepContent>

      <StepContent step={1} currentStep={step}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          Why "neuron"?
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          The name comes from your brain. Your brain contains about <strong className="text-white">86 billion neurons</strong> — 
          tiny cells that process information and talk to each other.
        </p>

        {/* Biological neuron simplified with pulsing animation */}
        <div className="flex items-center justify-center my-8">
          <svg viewBox="0 0 400 160" className="w-full max-w-lg">
            {/* Glow filters for each part */}
            <defs>
              <filter id="glowIndigo" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glowCyan" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glowOrange" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Dendrites (inputs) */}
            <motion.g
              animate={{ 
                opacity: pulsePhase === 0 ? 1 : 0.4,
                scale: pulsePhase === 0 ? 1.02 : 1
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{ filter: pulsePhase === 0 ? 'url(#glowIndigo)' : 'none' }}
            >
              <path d="M 30 40 Q 60 50 80 60" stroke="#6366f1" strokeWidth="3" fill="none" />
              <path d="M 20 80 Q 50 80 80 70" stroke="#6366f1" strokeWidth="3" fill="none" />
              <path d="M 30 120 Q 60 110 80 90" stroke="#6366f1" strokeWidth="3" fill="none" />
              {/* Animated signal dots */}
              {pulsePhase === 0 && (
                <>
                  <motion.circle
                    cx="40" cy="48"
                    r="4"
                    fill="#818cf8"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: [0, 1, 1, 0], x: [0, 30] }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                  <motion.circle
                    cx="30" cy="80"
                    r="4"
                    fill="#818cf8"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: [0, 1, 1, 0], x: [0, 40] }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                  />
                  <motion.circle
                    cx="40" cy="112"
                    r="4"
                    fill="#818cf8"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: [0, 1, 1, 0], x: [0, 30] }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  />
                </>
              )}
              <text x="25" y="145" fill="#818cf8" className="text-xs">dendrites</text>
              <text x="25" y="157" fill="#6366f1" opacity="0.6" className="text-[10px]">(receive signals)</text>
            </motion.g>

            {/* Cell body */}
            <motion.g
              animate={{ 
                opacity: pulsePhase === 1 ? 1 : 0.4,
                scale: pulsePhase === 1 ? 1.05 : 1
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{ 
                filter: pulsePhase === 1 ? 'url(#glowCyan)' : 'none',
                transformOrigin: '120px 80px'
              }}
            >
              <ellipse cx="120" cy="80" rx="45" ry="35" className="fill-accent-cyan/20 stroke-accent-cyan" strokeWidth="3" />
              {/* Processing animation inside cell */}
              {pulsePhase === 1 && (
                <motion.circle
                  cx="120" cy="80"
                  r="15"
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="2"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: [0.5, 1.5], opacity: [0.8, 0] }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              )}
              <text x="120" y="75" textAnchor="middle" className="fill-accent-cyan/80 text-xs">cell body</text>
              <text x="120" y="90" textAnchor="middle" className="fill-accent-cyan/50 text-[10px]">(processes)</text>
            </motion.g>

            {/* Axon (output) */}
            <motion.g
              animate={{ 
                opacity: pulsePhase === 2 ? 1 : 0.4,
                scale: pulsePhase === 2 ? 1.02 : 1
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{ filter: pulsePhase === 2 ? 'url(#glowOrange)' : 'none' }}
            >
              <line x1="165" y1="80" x2="320" y2="80" stroke="#f97316" strokeWidth="4" />
              {/* Animated signal traveling down axon */}
              {pulsePhase === 2 && (
                <motion.circle
                  cy="80"
                  r="6"
                  fill="#fb923c"
                  initial={{ cx: 170, opacity: 0 }}
                  animate={{ cx: [170, 340], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              )}
              <circle cx="340" cy="80" r="12" fill="#f9731630" stroke="#f97316" strokeWidth="2" />
              <circle cx="365" cy="65" r="8" fill="#f9731630" stroke="#f97316" strokeWidth="2" />
              <circle cx="365" cy="95" r="8" fill="#f9731630" stroke="#f97316" strokeWidth="2" />
              <text x="280" y="110" textAnchor="middle" fill="#fb923c" className="text-xs">axon</text>
              <text x="280" y="122" fill="#f97316" opacity="0.6" className="text-[10px]">(sends signal out)</text>
            </motion.g>
          </svg>
        </div>

        {/* Cards with synchronized pulsing */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <motion.div 
            className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-center"
            animate={{ 
              backgroundColor: pulsePhase === 0 ? 'rgba(99, 102, 241, 0.25)' : 'rgba(99, 102, 241, 0.1)',
              borderColor: pulsePhase === 0 ? 'rgba(99, 102, 241, 0.6)' : 'rgba(99, 102, 241, 0.3)',
              scale: pulsePhase === 0 ? 1.02 : 1
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="text-indigo-400 font-medium mb-1">Dendrites</div>
            <div className="text-xs text-indigo-400/60 mb-2">receive signals</div>
            <div className="text-sm text-gray-400">Information flows in from other neurons</div>
          </motion.div>
          <motion.div 
            className="p-4 rounded-xl bg-accent-cyan/10 border border-accent-cyan/30 text-center"
            animate={{ 
              backgroundColor: pulsePhase === 1 ? 'rgba(34, 211, 238, 0.25)' : 'rgba(34, 211, 238, 0.1)',
              borderColor: pulsePhase === 1 ? 'rgba(34, 211, 238, 0.6)' : 'rgba(34, 211, 238, 0.3)',
              scale: pulsePhase === 1 ? 1.02 : 1
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="text-accent-cyan font-medium mb-1">Cell Body</div>
            <div className="text-xs text-accent-cyan/60 mb-2">processes</div>
            <div className="text-sm text-gray-400">Combines and transforms all the signals</div>
          </motion.div>
          <motion.div 
            className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30 text-center"
            animate={{ 
              backgroundColor: pulsePhase === 2 ? 'rgba(249, 115, 22, 0.25)' : 'rgba(249, 115, 22, 0.1)',
              borderColor: pulsePhase === 2 ? 'rgba(249, 115, 22, 0.6)' : 'rgba(249, 115, 22, 0.3)',
              scale: pulsePhase === 2 ? 1.02 : 1
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="text-orange-400 font-medium mb-1">Axon</div>
            <div className="text-xs text-orange-400/60 mb-2">sends signal out</div>
            <div className="text-sm text-gray-400">Passes the result to other neurons</div>
          </motion.div>
        </div>

        <div className="bg-void-800 rounded-xl p-6 border-l-4 border-accent-cyan">
          <p className="text-gray-300">
            <strong className="text-white">The artificial neuron is a simplified math version of this.</strong> Scientists 
            were inspired by how brains learn, so they created a mathematical model that works similarly — 
            receive, process, send.
          </p>
        </div>
      </StepContent>

      <StepContent step={2} currentStep={step}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          Meet the artificial neuron
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Here's what an artificial neuron looks like. It has the same basic idea: receive → process → send.
        </p>

        {/* Visual neuron diagram with labeled parts */}
        <div className="flex items-center justify-center my-8">
          <svg viewBox="0 0 420 220" className="w-full max-w-lg">
            {/* Input nodes */}
            <g>
              <motion.circle 
                cx="60" cy="70" r="28" 
                className="fill-flow-600/30 stroke-flow-500" 
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
              />
              <text x="60" y="65" textAnchor="middle" className="fill-gray-400 text-xs">input</text>
              <text x="60" y="80" textAnchor="middle" className="fill-white text-sm font-mono">x₁</text>
            </g>
            <g>
              <motion.circle 
                cx="60" cy="150" r="28" 
                className="fill-flow-600/30 stroke-flow-500" 
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              />
              <text x="60" y="145" textAnchor="middle" className="fill-gray-400 text-xs">input</text>
              <text x="60" y="160" textAnchor="middle" className="fill-white text-sm font-mono">x₂</text>
            </g>

            {/* Connection lines (weights) */}
            <motion.line 
              x1="88" y1="70" x2="175" y2="100" 
              stroke="#8b5cf6" strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            />
            <motion.line 
              x1="88" y1="150" x2="175" y2="120" 
              stroke="#8b5cf6" strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            />

            {/* Weight labels */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <rect x="105" y="62" width="50" height="22" rx="4" className="fill-accent-violet/30 stroke-accent-violet/50" strokeWidth="1" />
              <text x="130" y="77" textAnchor="middle" className="fill-accent-violet text-xs font-medium">weight</text>
              <rect x="105" y="136" width="50" height="22" rx="4" className="fill-accent-violet/30 stroke-accent-violet/50" strokeWidth="1" />
              <text x="130" y="151" textAnchor="middle" className="fill-accent-violet text-xs font-medium">weight</text>
            </motion.g>

            {/* Neuron body */}
            <motion.circle 
              cx="210" cy="110" r="40" 
              className="fill-accent-cyan/20 stroke-accent-cyan" 
              strokeWidth="3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6 }}
            />
            <motion.text 
              x="210" y="100" 
              textAnchor="middle" 
              className="fill-gray-400 text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              combine
            </motion.text>
            <motion.text 
              x="210" y="118" 
              textAnchor="middle" 
              className="fill-white text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              + bias
            </motion.text>

            {/* Output arrow */}
            <motion.line 
              x1="250" y1="110" x2="310" y2="110" 
              stroke="#f97316" strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.8, duration: 0.3 }}
            />
            <motion.polygon 
              points="310,104 322,110 310,116" 
              className="fill-grad-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            />

            {/* Output node */}
            <motion.circle 
              cx="355" cy="110" r="32" 
              className="fill-grad-600/30 stroke-grad-500" 
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.1 }}
            />
            <motion.text 
              x="355" y="105" 
              textAnchor="middle" 
              className="fill-gray-400 text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              output
            </motion.text>
            <motion.text 
              x="355" y="122" 
              textAnchor="middle" 
              className="fill-white text-sm font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              y
            </motion.text>

            {/* Labels below */}
            <motion.g
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              <text x="60" y="205" textAnchor="middle" className="fill-flow-400 text-[10px]">Information</text>
              <text x="60" y="216" textAnchor="middle" className="fill-flow-400 text-[10px]">coming in</text>
              <text x="130" y="205" textAnchor="middle" className="fill-accent-violet text-[10px]">How much</text>
              <text x="130" y="216" textAnchor="middle" className="fill-accent-violet text-[10px]">each matters</text>
              <text x="210" y="205" textAnchor="middle" className="fill-accent-cyan text-[10px]">Process &</text>
              <text x="210" y="216" textAnchor="middle" className="fill-accent-cyan text-[10px]">combine</text>
              <text x="355" y="205" textAnchor="middle" className="fill-grad-400 text-[10px]">Result</text>
              <text x="355" y="216" textAnchor="middle" className="fill-grad-400 text-[10px]">sent out</text>
            </motion.g>
          </svg>
        </div>

        <p className="text-gray-300 leading-relaxed">
          That's the whole thing! Information flows from left to right. Now let's understand what 
          each part does — and why it matters for learning.
        </p>
      </StepContent>

      <StepContent step={3} currentStep={step}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          The parts of a neuron
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Let's use our toddler learning "dog" example to understand each part:
        </p>

        <div className="space-y-4 mb-6">
          <motion.div 
            className="p-5 rounded-xl bg-flow-600/10 border border-flow-500/30"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-flow-600/30 flex items-center justify-center">
                <span className="text-flow-400 font-bold">x</span>
              </div>
              <div className="font-semibold text-flow-400 text-lg">Inputs</div>
            </div>
            <p className="text-gray-300 mb-2">
              <strong className="text-white">What it is:</strong> Information coming into the neuron
            </p>
            <p className="text-gray-400 text-sm">
              <strong className="text-gray-300">Toddler example:</strong> The features they're seeing — 
              "has four legs," "is fluffy," "has a tail," "barks"
            </p>
          </motion.div>

          <motion.div 
            className="p-5 rounded-xl bg-accent-violet/10 border border-accent-violet/30"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-accent-violet/30 flex items-center justify-center">
                <span className="text-accent-violet font-bold">w</span>
              </div>
              <div className="font-semibold text-accent-violet text-lg">Weights</div>
            </div>
            <p className="text-gray-300 mb-2">
              <strong className="text-white">What it is:</strong> How important each input is
            </p>
            <p className="text-gray-400 text-sm">
              <strong className="text-gray-300">Toddler example:</strong> Over time, they learn that "barks" 
              is very important for identifying dogs (high weight), while "has four legs" is less helpful 
              since cats have four legs too (lower weight)
            </p>
          </motion.div>

          <motion.div 
            className="p-5 rounded-xl bg-gray-500/10 border border-gray-500/30"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gray-500/30 flex items-center justify-center">
                <span className="text-gray-400 font-bold">b</span>
              </div>
              <div className="font-semibold text-gray-400 text-lg">Bias</div>
            </div>
            <p className="text-gray-300 mb-2">
              <strong className="text-white">What it is:</strong> A starting point or default tendency
            </p>
            <p className="text-gray-400 text-sm">
              <strong className="text-gray-300">Toddler example:</strong> If they've seen more dogs than cats, 
              they might be slightly more likely to guess "dog" by default — that's the bias
            </p>
          </motion.div>

          <motion.div 
            className="p-5 rounded-xl bg-grad-600/10 border border-grad-500/30"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-grad-600/30 flex items-center justify-center">
                <span className="text-grad-400 font-bold">y</span>
              </div>
              <div className="font-semibold text-grad-400 text-lg">Output</div>
            </div>
            <p className="text-gray-300 mb-2">
              <strong className="text-white">What it is:</strong> The neuron's result after processing
            </p>
            <p className="text-gray-400 text-sm">
              <strong className="text-gray-300">Toddler example:</strong> Their conclusion — "I think this is a dog!" 
              (or a number representing how dog-like they think it is)
            </p>
          </motion.div>
        </div>
      </StepContent>

      <StepContent step={4} currentStep={step}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          The key insight: Weights are learned
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Here's the magic: <strong className="text-white">the weights start random, then improve through practice</strong>.
        </p>

        <div className="bg-void-800 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="text-2xl">👶</div>
            <div>
              <div className="font-medium text-white mb-1">Day 1: Random guesses</div>
              <p className="text-sm text-gray-400">
                At first, the toddler pays equal attention to everything — fur color, leg count, sound. 
                All weights are roughly equal.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 mb-4">
            <div className="text-2xl">🔄</div>
            <div>
              <div className="font-medium text-white mb-1">Learning: Adjust based on mistakes</div>
              <p className="text-sm text-gray-400">
                When they call a cat a "dog" and get corrected, they learn to pay less attention 
                to "four legs" and more to "barking" — the weights adjust.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="text-2xl">🎓</div>
            <div>
              <div className="font-medium text-white mb-1">After practice: Tuned weights</div>
              <p className="text-sm text-gray-400">
                Eventually, they've learned which features matter most. The weights now reflect 
                real patterns in the world.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-accent-cyan/10 border border-accent-cyan/30 rounded-xl p-4">
          <p className="text-gray-300">
            <strong className="text-white">This is exactly how neural networks learn.</strong> They 
            start with random weights, make predictions, see how wrong they were, and adjust 
            their weights to do better next time.
          </p>
        </div>
      </StepContent>

      <StepContent step={5} currentStep={step}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          The math (it's just multiply and add!)
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Now that you understand what each part does, here's the simple calculation a neuron performs:
        </p>

        {/* Visual neuron with math annotations */}
        <div className="flex items-center justify-center my-8">
          <svg viewBox="0 0 500 240" className="w-full max-w-xl">
            {/* Input 1 */}
            <motion.g
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <circle cx="50" cy="70" r="30" className="fill-flow-600/30 stroke-flow-500" strokeWidth="2" />
              <text x="50" y="65" textAnchor="middle" className="fill-gray-400 text-xs">input₁</text>
              <text x="50" y="82" textAnchor="middle" className="fill-flow-400 text-lg font-mono font-bold">2</text>
            </motion.g>

            {/* Input 2 */}
            <motion.g
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <circle cx="50" cy="170" r="30" className="fill-flow-600/30 stroke-flow-500" strokeWidth="2" />
              <text x="50" y="165" textAnchor="middle" className="fill-gray-400 text-xs">input₂</text>
              <text x="50" y="182" textAnchor="middle" className="fill-flow-400 text-lg font-mono font-bold">3</text>
            </motion.g>

            {/* Connection line 1 with weight */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <line x1="80" y1="70" x2="200" y2="105" stroke="#8b5cf6" strokeWidth="3" />
              <rect x="115" y="60" width="50" height="26" rx="6" className="fill-accent-violet/40 stroke-accent-violet" strokeWidth="1" />
              <text x="140" y="71" textAnchor="middle" className="fill-gray-400 text-[10px]">×weight</text>
              <text x="140" y="82" textAnchor="middle" className="fill-accent-violet text-sm font-mono font-bold">×0.5</text>
            </motion.g>

            {/* Connection line 2 with weight */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <line x1="80" y1="170" x2="200" y2="135" stroke="#8b5cf6" strokeWidth="3" />
              <rect x="115" y="154" width="50" height="26" rx="6" className="fill-accent-violet/40 stroke-accent-violet" strokeWidth="1" />
              <text x="140" y="165" textAnchor="middle" className="fill-gray-400 text-[10px]">×weight</text>
              <text x="140" y="176" textAnchor="middle" className="fill-accent-violet text-sm font-mono font-bold">×0.5</text>
            </motion.g>

            {/* Multiplication results flowing in */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <text x="180" y="95" textAnchor="middle" className="fill-gray-500 text-xs">= 1.0</text>
              <text x="180" y="160" textAnchor="middle" className="fill-gray-500 text-xs">= 1.5</text>
            </motion.g>

            {/* Neuron body (sum + bias) */}
            <motion.g
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
              style={{ transformOrigin: '250px 120px' }}
            >
              <circle cx="250" cy="120" r="50" className="fill-accent-cyan/20 stroke-accent-cyan" strokeWidth="3" />
              <text x="250" y="100" textAnchor="middle" className="fill-gray-400 text-xs">sum + bias</text>
              <text x="250" y="120" textAnchor="middle" className="fill-white text-sm">1.0 + 1.5 + 0</text>
              <text x="250" y="142" textAnchor="middle" className="fill-accent-cyan text-lg font-mono font-bold">= 2.5</text>
            </motion.g>

            {/* Bias annotation */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <line x1="250" y1="175" x2="250" y2="200" stroke="#6b7280" strokeWidth="2" strokeDasharray="4" />
              <rect x="215" y="200" width="70" height="24" rx="6" className="fill-gray-600/30 stroke-gray-500" strokeWidth="1" />
              <text x="250" y="216" textAnchor="middle" className="fill-gray-400 text-xs font-mono">bias = 0</text>
            </motion.g>

            {/* Output arrow */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <line x1="300" y1="120" x2="380" y2="120" stroke="#f97316" strokeWidth="4" />
              <polygon points="380,112 400,120 380,128" className="fill-grad-500" />
            </motion.g>

            {/* Output */}
            <motion.g
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <circle cx="440" cy="120" r="35" className="fill-grad-600/30 stroke-grad-500" strokeWidth="2" />
              <text x="440" y="112" textAnchor="middle" className="fill-gray-400 text-xs">output</text>
              <text x="440" y="134" textAnchor="middle" className="fill-grad-400 text-xl font-mono font-bold">2.5</text>
            </motion.g>
          </svg>
        </div>

        {/* Step-by-step breakdown */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-void-800/50">
            <div className="w-7 h-7 rounded-full bg-flow-600/30 flex items-center justify-center text-flow-400 font-medium text-sm shrink-0">1</div>
            <div className="text-sm">
              <span className="text-gray-400">Multiply each input by its weight:</span>
              <span className="font-mono ml-2"><span className="text-flow-400">2</span> × <span className="text-accent-violet">0.5</span> = 1.0</span>
              <span className="mx-2 text-gray-600">and</span>
              <span className="font-mono"><span className="text-flow-400">3</span> × <span className="text-accent-violet">0.5</span> = 1.5</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-void-800/50">
            <div className="w-7 h-7 rounded-full bg-accent-emerald/30 flex items-center justify-center text-accent-emerald font-medium text-sm shrink-0">2</div>
            <div className="text-sm">
              <span className="text-gray-400">Add them together:</span>
              <span className="font-mono ml-2 text-white">1.0 + 1.5 = 2.5</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-void-800/50">
            <div className="w-7 h-7 rounded-full bg-gray-500/30 flex items-center justify-center text-gray-400 font-medium text-sm shrink-0">3</div>
            <div className="text-sm">
              <span className="text-gray-400">Add the bias:</span>
              <span className="font-mono ml-2 text-white">2.5 + <span className="text-gray-500">0</span> = <span className="text-grad-400">2.5</span></span>
            </div>
          </div>
        </div>

        <div className="bg-flow-600/10 border border-flow-500/30 rounded-xl p-4">
          <p className="text-gray-300">
            <strong className="text-white">That's it!</strong> Multiply and add — you learned this in elementary school. 
            The power of neural networks comes from having <em>millions</em> of these simple calculations working together.
          </p>
        </div>
      </StepContent>

      <StepContent step={6} currentStep={step}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          Try it yourself
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Adjust the <span className="text-accent-violet">weights</span> and <span className="text-gray-400">bias</span> to see 
          how they change the neuron's output. The inputs are fixed at <span className="text-flow-400">2</span> and <span className="text-flow-400">3</span>.
        </p>

        {/* Neuron visualization */}
        <div className="flex items-center justify-center gap-6 my-8">
          {/* Inputs */}
          <div className="flex flex-col gap-4">
            {inputs.map((x, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl bg-flow-600/20 border-2 border-flow-500/50 
                             flex flex-col items-center justify-center">
                  <div className="text-xs text-gray-500">input {i + 1}</div>
                  <div className="font-mono text-white">{x}</div>
                </div>
                <div className="font-mono text-sm text-accent-violet">×{weights[i].toFixed(1)}</div>
              </div>
            ))}
          </div>

          {/* Sum */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-accent-cyan/20 border-2 border-accent-cyan 
                         flex items-center justify-center text-xl text-gray-300">
              Σ
            </div>
            <div className="mt-2 text-sm text-gray-500">+{bias.toFixed(1)}</div>
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
            <div className="text-2xl font-mono text-white">{computation.output.toFixed(1)}</div>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Weight 1</label>
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
            <label className="text-sm text-gray-400 mb-2 block">Weight 2</label>
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
            <label className="text-sm text-gray-400 mb-2 block">Bias</label>
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

        <div className="mt-6 p-4 rounded-xl bg-flow-600/10 border border-flow-500/30">
          <p className="text-sm text-gray-300">
            💡 <strong>Try this:</strong> Make weight 1 negative. Now increasing input 1 actually 
            <em>decreases</em> the output. Weights can flip the direction of influence!
          </p>
        </div>
      </StepContent>

      <StepContent step={7} currentStep={step}>
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

      <StepContent step={8} currentStep={step}>
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
      </StepContent>

      <StepContent step={9} currentStep={step}>
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
              The basic unit. Takes inputs, multiplies by weights, adds them up, outputs a number.
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
