import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HelpCircle, Check } from 'lucide-react'
import { ModuleShell, StepContent, useCurrentStep } from '../../../components/learn'

/**
 * Biological neuron animation component.
 * Uses context to get current step, ensuring animation state is always 
 * in sync with the step displayed by StepContent.
 */
function BiologicalNeuronAnimation() {
  const currentStep = useCurrentStep()
  const [pulsePhase, setPulsePhase] = useState(0)
  
  useEffect(() => {
    if (currentStep !== 1) return // Only animate on step 1
    
    const interval = setInterval(() => {
      setPulsePhase(prev => (prev + 1) % 3)
    }, 1000) // 1 second per phase
    
    return () => clearInterval(interval)
  }, [currentStep])

  return (
    <BiologicalNeuronSVG pulsePhase={pulsePhase} />
  )
}

/**
 * SVG component for the biological neuron diagram with pulsing animation
 */
function BiologicalNeuronSVG({ pulsePhase }: { pulsePhase: number }) {
  return (
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
  )
}

/**
 * Animated info cards that pulse in sync with the neuron diagram
 */
function BiologicalNeuronCards() {
  const currentStep = useCurrentStep()
  const [pulsePhase, setPulsePhase] = useState(0)
  
  useEffect(() => {
    if (currentStep !== 1) return
    
    const interval = setInterval(() => {
      setPulsePhase(prev => (prev + 1) % 3)
    }, 1000)
    
    return () => clearInterval(interval)
  }, [currentStep])
  
  return (
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
  )
}

export function WhatIsNeuronModule() {
  return (
    <ModuleShell
      courseId="foundations"
      title="What is a Neuron?"
      subtitle="The basic building block of neural networks"
      moduleId="what-is-neuron"
      totalSteps={5}
      progressColor="cyan"
    >
      {/* Vocabulary reminder - shown above content */}
      <div className="mb-6 p-3 rounded-lg bg-void-800/30 border border-white/5 flex items-center gap-3 -mt-2">
        <HelpCircle className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-500">
          Remember: A neural network is a <span className="text-flow-400">pattern-learning machine</span> that improves by adjusting its weights
        </span>
      </div>

      <StepContent step={0}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          What you'll learn
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed text-lg">
          In the Introduction, you learned that neural networks are pattern-learning machines. 
          Now let's look inside and see what they're made of — starting with the <strong className="text-accent-cyan">neuron</strong>.
        </p>
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-void-800/30">
            <div className="w-6 h-6 rounded-full bg-accent-cyan/30 flex items-center justify-center text-accent-cyan text-sm">✓</div>
            <span className="text-gray-300">Why it's called a "neuron" (the brain connection)</span>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-void-800/30">
            <div className="w-6 h-6 rounded-full bg-accent-cyan/30 flex items-center justify-center text-accent-cyan text-sm">✓</div>
            <span className="text-gray-300">What an artificial neuron looks like</span>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-void-800/30">
            <div className="w-6 h-6 rounded-full bg-accent-cyan/30 flex items-center justify-center text-accent-cyan text-sm">✓</div>
            <span className="text-gray-300">The parts: <strong className="text-flow-400">inputs</strong>, <strong className="text-accent-violet">weights</strong>, <strong className="text-gray-400">bias</strong>, and <strong className="text-grad-400">output</strong></span>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-void-800/30">
            <div className="w-6 h-6 rounded-full bg-accent-cyan/30 flex items-center justify-center text-accent-cyan text-sm">✓</div>
            <span className="text-gray-300">The key insight: <strong className="text-accent-violet">weights are learned</strong></span>
          </div>
        </div>
        <div className="bg-void-800 rounded-xl p-6 border-l-4 border-accent-cyan">
          <p className="text-gray-300">
            <strong className="text-white">By the end of this module,</strong> you'll understand the 
            fundamental unit that makes neural networks work — like understanding that LEGO bricks 
            are what make up LEGO creations.
          </p>
        </div>
      </StepContent>

      <StepContent step={1}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          Why "neuron"?
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          The name comes from your brain. Your brain contains about <strong className="text-white">86 billion neurons</strong> — 
          tiny cells that process information and talk to each other.
        </p>

        {/* Biological neuron with pulsing animation - uses context for step sync */}
        <div className="flex items-center justify-center my-8">
          <BiologicalNeuronAnimation />
        </div>

        {/* Cards with synchronized pulsing - uses context for step sync */}
        <BiologicalNeuronCards />

        <div className="bg-void-800 rounded-xl p-6 border-l-4 border-accent-cyan">
          <p className="text-gray-300">
            <strong className="text-white">The artificial neuron is a simplified math version of this.</strong> Scientists 
            were inspired by how brains learn, so they created a mathematical model that works similarly — 
            receive, process, send.
          </p>
        </div>
      </StepContent>

      <StepContent step={2}>
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

      <StepContent step={3}>
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

      <StepContent step={4}>
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

        <div className="bg-accent-cyan/10 border border-accent-cyan/30 rounded-xl p-4 mb-6">
          <p className="text-gray-300">
            <strong className="text-white">This is exactly how neural networks learn.</strong> They 
            start with random weights, make predictions, see how wrong they were, and adjust 
            their weights to do better next time.
          </p>
        </div>

        <div className="bg-accent-emerald/10 border border-accent-emerald/30 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-accent-emerald mt-0.5" />
            <div>
              <div className="font-medium text-white">Now you understand what a neuron is!</div>
              <p className="text-sm text-gray-400 mt-1">
                Next, we'll look at the actual math — don't worry, it's just multiply and add.
              </p>
            </div>
          </div>
        </div>
      </StepContent>
    </ModuleShell>
  )
}

