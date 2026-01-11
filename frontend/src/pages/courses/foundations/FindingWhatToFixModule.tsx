import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Check, HelpCircle, Play } from 'lucide-react'
import { ModuleShell, StepContent } from '../../../components/learn'

export function FindingWhatToFixModule() {
  const [step, setStep] = useState(0)
  const [a, setA] = useState(2)
  const [b, setB] = useState(3)
  const [showWiggle, setShowWiggle] = useState(false)
  const [showGradients, setShowGradients] = useState(false)

  const result = a * b

  const wiggleDemo = useMemo(() => {
    const original = a * b
    const wiggled = (a + 0.1) * b
    const change = wiggled - original
    return { original, wiggled, change: change.toFixed(2) }
  }, [a, b])

  return (
    <ModuleShell
      courseId="foundations"
      title="Finding What to Fix"
      subtitle="Tracing back to find the problem"
      moduleId="finding-what-to-fix"
      totalSteps={7}
      currentStep={step}
      onStepChange={setStep}
      progressColor="orange"
    >
      {/* Vocabulary reminder */}
      <div className="mb-6 p-3 rounded-lg bg-void-800/30 border border-white/5 flex items-center gap-3 -mt-2">
        <HelpCircle className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-500">
          Remember: The <span className="text-accent-rose">loss</span> tells us how wrong we are. 
          Now we need to find <em>which weights</em> to change.
        </span>
      </div>

      <StepContent step={0} currentStep={step}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          What you'll learn
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed text-lg">
          We know our prediction is wrong. But the network has many weights. 
          Which ones caused the mistake? In this module, you'll discover:
        </p>
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-void-800/30">
            <div className="w-6 h-6 rounded-full bg-grad-600/30 flex items-center justify-center text-grad-400 text-sm">✓</div>
            <span className="text-gray-300">How to measure which weights matter most</span>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-void-800/30">
            <div className="w-6 h-6 rounded-full bg-grad-600/30 flex items-center justify-center text-grad-400 text-sm">✓</div>
            <span className="text-gray-300">What a gradient is (it's simpler than it sounds!)</span>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-void-800/30">
            <div className="w-6 h-6 rounded-full bg-grad-600/30 flex items-center justify-center text-grad-400 text-sm">✓</div>
            <span className="text-gray-300">How backpropagation traces errors backward</span>
          </div>
        </div>
        <div className="bg-void-800 rounded-xl p-6 border-l-4 border-grad-500">
          <p className="text-gray-300">
            <strong className="text-white">This is the clever part.</strong> Gradients are 
            the key insight that makes neural networks learnable.
          </p>
        </div>
      </StepContent>

      <StepContent step={1} currentStep={step}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          The question: Which weights matter?
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Imagine you have a network with 1,000 weights. The prediction is wrong. 
          You could try changing each weight randomly, but that would take forever!
        </p>
        <p className="text-gray-300 mb-6 leading-relaxed">
          What we need is a way to ask: <strong className="text-white">"If I change this weight a tiny bit, 
          how much does the loss change?"</strong>
        </p>

        <div className="bg-void-800 rounded-xl p-6 mb-6">
          <div className="text-center">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-gray-300">
              Some weights have a <span className="text-accent-emerald">big effect</span> on the output.<br/>
              Others have almost <span className="text-gray-500">no effect</span>.<br/>
              <strong className="text-white">We want to find the important ones.</strong>
            </p>
          </div>
        </div>
      </StepContent>

      <StepContent step={2} currentStep={step}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          Let's wiggle a number
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Start with a simple example: <span className="text-flow-400">a</span> × <span className="text-flow-400">b</span> = result
        </p>
        <p className="text-gray-300 mb-6 leading-relaxed">
          What happens if we change <span className="text-flow-400">a</span> just a tiny bit?
        </p>

        <div className="flex items-center justify-center gap-6 my-8">
          {/* Value A */}
          <div className="flex flex-col items-center">
            <div className={`w-24 h-24 rounded-xl border-2 flex flex-col items-center justify-center
              ${showWiggle ? 'bg-flow-600/30 border-flow-500' : 'bg-flow-600/20 border-flow-500/50'}`}
            >
              <div className="text-xs text-gray-500">a</div>
              <div className="text-2xl font-mono text-white">
                {showWiggle ? (a + 0.1).toFixed(1) : a}
              </div>
              {showWiggle && (
                <div className="text-xs text-flow-400">+0.1</div>
              )}
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={a}
              onChange={(e) => { setA(parseInt(e.target.value)); setShowWiggle(false); }}
              className="w-24 mt-2 accent-flow-500"
            />
          </div>

          <div className="text-2xl text-gray-500">×</div>

          {/* Value B */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-xl bg-flow-600/20 border-2 border-flow-500/50 
                         flex flex-col items-center justify-center">
              <div className="text-xs text-gray-500">b</div>
              <div className="text-2xl font-mono text-white">{b}</div>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={b}
              onChange={(e) => { setB(parseInt(e.target.value)); setShowWiggle(false); }}
              className="w-24 mt-2 accent-flow-500"
            />
          </div>

          <div className="text-2xl text-gray-500">=</div>

          {/* Result */}
          <div className={`w-24 h-24 rounded-xl border-2 flex flex-col items-center justify-center
            ${showWiggle ? 'bg-grad-600/30 border-grad-500' : 'bg-grad-600/20 border-grad-500/50'}`}
          >
            <div className="text-xs text-gray-500">result</div>
            <div className="text-2xl font-mono text-white">
              {showWiggle ? wiggleDemo.wiggled.toFixed(1) : wiggleDemo.original}
            </div>
            {showWiggle && (
              <div className="text-xs text-grad-400">+{wiggleDemo.change}</div>
            )}
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <button
            onClick={() => setShowWiggle(!showWiggle)}
            className="btn-primary flex items-center gap-2"
          >
            {showWiggle ? 'Reset' : `Wiggle 'a' by +0.1`}
          </button>
        </div>

        {showWiggle && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-grad-600/10 border border-grad-500/30 rounded-xl p-4"
          >
            <p className="text-gray-300">
              <strong className="text-white">Look!</strong> When we changed <span className="text-flow-400">a</span> by 0.1, 
              the result changed by <span className="text-grad-400">{wiggleDemo.change}</span>.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              The result changed by about <strong className="text-white">{b}×</strong> what we changed <span className="text-flow-400">a</span> by. 
              That's not a coincidence!
            </p>
          </motion.div>
        )}
      </StepContent>

      <StepContent step={3} currentStep={step}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          Some numbers matter more
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          When we wiggle <span className="text-flow-400">a</span>, 
          the result changes by an amount that depends on <span className="text-flow-400">b</span>.
        </p>
        <p className="text-gray-300 mb-6 leading-relaxed">
          And when we wiggle <span className="text-flow-400">b</span>, 
          the result changes by an amount that depends on <span className="text-flow-400">a</span>.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-void-800/50 border-l-4 border-flow-500">
            <div className="font-medium text-white mb-2">Wiggle a by 0.1:</div>
            <div className="text-gray-300">
              Result changes by <span className="text-grad-400">~{(b * 0.1).toFixed(2)}</span>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              (0.1 × b = 0.1 × {b})
            </div>
          </div>
          <div className="p-4 rounded-xl bg-void-800/50 border-l-4 border-flow-500">
            <div className="font-medium text-white mb-2">Wiggle b by 0.1:</div>
            <div className="text-gray-300">
              Result changes by <span className="text-grad-400">~{(a * 0.1).toFixed(2)}</span>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              (0.1 × a = 0.1 × {a})
            </div>
          </div>
        </div>

        <div className="bg-void-800 rounded-xl p-6">
          <p className="text-gray-300 mb-4">
            <strong className="text-white">The pattern:</strong> How much the result changes 
            depends on the <em>other</em> numbers in the equation.
          </p>
          <p className="text-gray-400 text-sm">
            When <span className="text-flow-400">b</span> is large, changing <span className="text-flow-400">a</span> has a bigger effect.
            When <span className="text-flow-400">a</span> is large, changing <span className="text-flow-400">b</span> has a bigger effect.
          </p>
        </div>
      </StepContent>

      <StepContent step={4} currentStep={step}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          The gradient: Sensitivity score
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          This "sensitivity" — <em>how much the output changes when we change an input</em> — 
          has a name: the <strong className="text-grad-400">gradient</strong>.
        </p>

        <div className="bg-grad-600/10 border border-grad-500/30 rounded-xl p-6 mb-6">
          <div className="text-center">
            <div className="text-lg text-gray-300 mb-2">
              The <span className="text-grad-400 font-semibold">gradient</span> of a weight tells you:
            </div>
            <div className="text-xl text-white font-medium">
              "If I nudge this weight a tiny bit,<br/>
              how much does the loss change?"
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-void-800/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="text-flow-400 font-mono">a = {a}</div>
            </div>
            <div className="text-gray-300">
              Gradient: <span className="text-grad-400 font-mono">{b}</span>
            </div>
            <div className="text-sm text-gray-500">
              Changing a by 1 changes result by ~{b}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-void-800/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="text-flow-400 font-mono">b = {b}</div>
            </div>
            <div className="text-gray-300">
              Gradient: <span className="text-grad-400 font-mono">{a}</span>
            </div>
            <div className="text-sm text-gray-500">
              Changing b by 1 changes result by ~{a}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-void-800/50">
            <span className="text-accent-emerald">Big gradient</span>
            <span className="text-gray-400"> = this weight has a big effect on the output</span>
          </div>
          <div className="p-3 rounded-lg bg-void-800/50">
            <span className="text-gray-500">Small gradient</span>
            <span className="text-gray-400"> = this weight barely affects the output</span>
          </div>
        </div>
      </StepContent>

      <StepContent step={5} currentStep={step}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          Backpropagation: Following the trail
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          In a real neural network, we don't calculate gradients by hand. 
          We use a technique called <strong className="text-flow-400">backpropagation</strong>.
        </p>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Remember how data flows <em>forward</em> through the network to make predictions? 
          Backpropagation works <strong className="text-white">backward</strong> — 
          from the loss, tracing back to find which weights caused the error.
        </p>

        <div className="flex items-center justify-center gap-4 my-8">
          {/* Value A */}
          <div className={`w-28 h-28 rounded-xl border-2 flex flex-col items-center justify-center
            ${showGradients ? 'bg-flow-600/20 border-flow-500/50' : 'bg-flow-600/10 border-flow-500/30'}`}
          >
            <div className="text-xs text-gray-500">a</div>
            <div className="text-2xl font-mono text-white">{a}</div>
            {showGradients && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 pt-2 border-t border-white/10 w-full text-center"
              >
                <div className="text-xs text-gray-500">gradient</div>
                <div className="text-sm font-mono text-grad-400">{b}</div>
              </motion.div>
            )}
          </div>

          <div className="text-xl text-gray-500">×</div>

          <div className={`w-28 h-28 rounded-xl border-2 flex flex-col items-center justify-center
            ${showGradients ? 'bg-flow-600/20 border-flow-500/50' : 'bg-flow-600/10 border-flow-500/30'}`}
          >
            <div className="text-xs text-gray-500">b</div>
            <div className="text-2xl font-mono text-white">{b}</div>
            {showGradients && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 pt-2 border-t border-white/10 w-full text-center"
              >
                <div className="text-xs text-gray-500">gradient</div>
                <div className="text-sm font-mono text-grad-400">{a}</div>
              </motion.div>
            )}
          </div>

          <div className="text-xl text-gray-500">=</div>

          <div className={`w-28 h-28 rounded-xl border-2 flex flex-col items-center justify-center
            ${showGradients ? 'bg-grad-600/20 border-grad-500/50' : 'bg-grad-600/10 border-grad-500/30'}`}
          >
            <div className="text-xs text-gray-500">result</div>
            <div className="text-2xl font-mono text-white">{result}</div>
            {showGradients && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 pt-2 border-t border-white/10 w-full text-center"
              >
                <div className="text-xs text-gray-500">gradient</div>
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
            Run Backpropagation
          </button>
        </div>

        {showGradients && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-void-800 rounded-xl p-4 text-sm"
          >
            <p className="text-gray-300 mb-2">
              <strong className="text-grad-400">Backpropagation found:</strong>
            </p>
            <ul className="space-y-1 text-gray-400">
              <li>• <span className="text-flow-400">a</span>'s gradient is <span className="text-grad-400">{b}</span> — changing a affects the result by {b}×</li>
              <li>• <span className="text-flow-400">b</span>'s gradient is <span className="text-grad-400">{a}</span> — changing b affects the result by {a}×</li>
            </ul>
          </motion.div>
        )}
      </StepContent>

      <StepContent step={6} currentStep={step}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          Now we know what to fix!
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Gradients answer all our questions about which weights to change:
        </p>

        <div className="space-y-4 mb-6">
          <div className="p-4 rounded-xl bg-void-800/50 border-l-4 border-grad-500">
            <div className="font-medium text-white mb-1">Which weights matter?</div>
            <div className="text-sm text-gray-400">
              Look at the gradient size — large gradient = big effect on loss
            </div>
          </div>
          <div className="p-4 rounded-xl bg-void-800/50 border-l-4 border-grad-500">
            <div className="font-medium text-white mb-1">Which direction to change?</div>
            <div className="text-sm text-gray-400">
              Positive gradient = increasing the weight increases the loss (so decrease it!)
            </div>
          </div>
          <div className="p-4 rounded-xl bg-void-800/50 border-l-4 border-grad-500">
            <div className="font-medium text-white mb-1">How much to change?</div>
            <div className="text-sm text-gray-400">
              The gradient magnitude tells us how sensitive the loss is
            </div>
          </div>
        </div>

        <div className="bg-accent-emerald/10 border border-accent-emerald/30 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-accent-emerald mt-0.5" />
            <div>
              <div className="font-medium text-white">Key Takeaway</div>
              <p className="text-sm text-gray-400 mt-1">
                The <span className="text-grad-400">gradient</span> tells us how sensitive the loss is to each weight.
                <span className="text-flow-400"> Backpropagation</span> calculates all gradients automatically by 
                working backward from the loss. Now we know exactly which weights to adjust!
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-void-800/50 border border-white/5">
          <div className="text-sm text-gray-500 mb-2">New vocabulary:</div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <div className="text-grad-400 font-medium">Gradient</div>
              <div className="text-xs text-gray-400">
                How much the loss changes when you change a weight
              </div>
            </div>
            <div>
              <div className="text-flow-400 font-medium">Backpropagation</div>
              <div className="text-xs text-gray-400">
                Working backward to calculate all gradients at once
              </div>
            </div>
          </div>
        </div>
      </StepContent>
    </ModuleShell>
  )
}

