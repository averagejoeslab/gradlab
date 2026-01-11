import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, HelpCircle } from 'lucide-react'
import { ModuleShell, StepContent } from '../../components/learn'

export function MeasuringMistakesModule() {
  const [step, setStep] = useState(0)
  const [prediction, setPrediction] = useState(0.7)
  const target = 1.0

  const loss = Math.pow(prediction - target, 2)

  return (
    <ModuleShell
      title="Measuring Mistakes"
      subtitle="How we know when we're wrong"
      moduleId="measuring-mistakes"
      totalSteps={6}
      currentStep={step}
      onStepChange={setStep}
      progressColor="rose"
      nextPath="/learn/finding-what-to-fix"
      nextLabel="Continue to Finding What to Fix"
    >
      {/* Vocabulary reminder */}
      <div className="mb-6 p-3 rounded-lg bg-void-800/30 border border-white/5 flex items-center gap-3 -mt-2">
        <HelpCircle className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-500">
          Remember: The <span className="text-flow-400">forward pass</span> gives us a prediction. 
          Now we need to know if it's right or wrong.
        </span>
      </div>

      <StepContent step={0} currentStep={step}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          What you'll learn
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed text-lg">
          A network made a prediction. But how do we know if it's good or bad? 
          In this module, you'll discover:
        </p>
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-void-800/30">
            <div className="w-6 h-6 rounded-full bg-accent-rose/30 flex items-center justify-center text-accent-rose text-sm">✓</div>
            <span className="text-gray-300">How to measure "how wrong" a prediction is</span>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-void-800/30">
            <div className="w-6 h-6 rounded-full bg-accent-rose/30 flex items-center justify-center text-accent-rose text-sm">✓</div>
            <span className="text-gray-300">What a loss function is (it's just a simple formula)</span>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-void-800/30">
            <div className="w-6 h-6 rounded-full bg-accent-rose/30 flex items-center justify-center text-accent-rose text-sm">✓</div>
            <span className="text-gray-300">Why the goal of training is to minimize this number</span>
          </div>
        </div>
        <div className="bg-void-800 rounded-xl p-6 border-l-4 border-accent-rose">
          <p className="text-gray-300">
            <strong className="text-white">Think of it like grading a test.</strong> The loss function 
            is the grading system that tells the network how well (or poorly) it did.
          </p>
        </div>
      </StepContent>

      <StepContent step={1} currentStep={step}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          The problem: We need a score
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Remember the toddler learning what a dog is? When they said "dog" and pointed at a cat, 
          you corrected them. You were the feedback mechanism.
        </p>
        <p className="text-gray-300 mb-6 leading-relaxed">
          For neural networks, we need a <strong className="text-white">number</strong> that tells us how wrong the prediction is.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-accent-emerald/10 border border-accent-emerald/30">
            <div className="text-2xl mb-2">✓</div>
            <div className="font-medium text-white mb-1">Perfect prediction</div>
            <div className="text-sm text-gray-400">
              Network says "dog" when it's actually a dog
            </div>
            <div className="text-accent-emerald mt-2 font-mono">Score = 0 (no error)</div>
          </div>
          <div className="p-4 rounded-xl bg-accent-rose/10 border border-accent-rose/30">
            <div className="text-2xl mb-2">✗</div>
            <div className="font-medium text-white mb-1">Wrong prediction</div>
            <div className="text-sm text-gray-400">
              Network says "cat" when it's actually a dog
            </div>
            <div className="text-accent-rose mt-2 font-mono">Score = big number (error!)</div>
          </div>
        </div>

        <p className="text-gray-300 leading-relaxed">
          This score is called the <strong className="text-accent-rose">loss</strong>. 
          Lower is better — zero means perfect!
        </p>
      </StepContent>

      <StepContent step={2} currentStep={step}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          The simplest loss: Squared error
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Here's a simple way to measure error. Just take the difference between 
          what the network predicted and the correct answer, then square it:
        </p>

        <div className="bg-void-800 rounded-xl p-6 mb-6">
          <div className="text-center">
            <div className="text-gray-400 mb-3">The formula:</div>
            <div className="text-lg text-white mb-4">
              <span className="text-accent-rose">Loss</span> = 
              (<span className="text-grad-400">prediction</span> − <span className="text-accent-emerald">correct answer</span>)²
            </div>
            <div className="text-sm text-gray-500">
              "Squared" means multiply the difference by itself
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="p-4 rounded-xl bg-void-800/50">
            <div className="font-medium text-white mb-1">Why subtract?</div>
            <div className="text-sm text-gray-400">
              If prediction = correct answer, the difference is 0 (no error!)
            </div>
          </div>
          <div className="p-4 rounded-xl bg-void-800/50">
            <div className="font-medium text-white mb-1">Why square it?</div>
            <div className="text-sm text-gray-400">
              Two reasons: it makes all errors positive, and it punishes big mistakes more than small ones
            </div>
          </div>
        </div>

        <div className="bg-void-800 rounded-xl p-4 text-sm">
          <div className="text-gray-400 mb-2">Example:</div>
          <div className="text-gray-300">
            If we predicted <span className="text-grad-400">0.8</span> but the answer was <span className="text-accent-emerald">1.0</span>:
            <br />
            Loss = (0.8 − 1.0)² = (−0.2)² = <span className="text-accent-rose">0.04</span>
          </div>
        </div>
      </StepContent>

      <StepContent step={3} currentStep={step}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          Try it yourself
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          The correct answer is <span className="text-accent-emerald font-mono">1.0</span>. 
          Adjust the prediction to see how the loss changes.
        </p>

        <div className="flex items-center justify-center gap-8 my-8">
          {/* Prediction */}
          <div className="text-center">
            <div className="w-24 h-24 rounded-xl bg-grad-600/20 border-2 border-grad-500/50 
                         flex flex-col items-center justify-center mb-2">
              <div className="text-xs text-gray-500">prediction</div>
              <div className="text-2xl font-mono text-white">{prediction.toFixed(2)}</div>
            </div>
            <input
              type="range"
              min="0"
              max="2"
              step="0.05"
              value={prediction}
              onChange={(e) => setPrediction(parseFloat(e.target.value))}
              className="w-24 accent-grad-500"
            />
          </div>

          <div className="text-2xl text-gray-500">−</div>

          {/* Target */}
          <div className="text-center">
            <div className="w-24 h-24 rounded-xl bg-accent-emerald/20 border-2 border-accent-emerald/50 
                         flex flex-col items-center justify-center">
              <div className="text-xs text-gray-500">correct</div>
              <div className="text-2xl font-mono text-white">{target.toFixed(2)}</div>
            </div>
            <div className="text-xs text-gray-500 mt-2">(fixed)</div>
          </div>

          <div className="text-2xl text-gray-500">=</div>

          {/* Loss */}
          <motion.div
            key={loss}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className={`w-24 h-24 rounded-xl border-2 flex flex-col items-center justify-center
              ${loss < 0.01 ? 'bg-accent-emerald/20 border-accent-emerald/50' : 
                loss < 0.1 ? 'bg-grad-600/20 border-grad-500/50' : 
                'bg-accent-rose/20 border-accent-rose/50'}`}
          >
            <div className="text-xs text-gray-500">loss</div>
            <div className="text-2xl font-mono text-white">{loss.toFixed(3)}</div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="p-3 rounded-lg bg-accent-emerald/10 text-center">
            <div className="text-accent-emerald font-medium">Loss ≈ 0</div>
            <div className="text-xs text-gray-400">Perfect!</div>
          </div>
          <div className="p-3 rounded-lg bg-grad-600/10 text-center">
            <div className="text-grad-400 font-medium">Loss &lt; 0.1</div>
            <div className="text-xs text-gray-400">Getting closer</div>
          </div>
          <div className="p-3 rounded-lg bg-accent-rose/10 text-center">
            <div className="text-accent-rose font-medium">Loss &gt; 0.1</div>
            <div className="text-xs text-gray-400">Needs work</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-accent-rose/10 border border-accent-rose/30">
          <p className="text-sm text-gray-300">
            💡 <strong>Notice:</strong> As you get closer to 1.0, the loss drops toward zero. 
            The goal of training is to find weights that minimize this loss!
          </p>
        </div>
      </StepContent>

      <StepContent step={4} currentStep={step}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          Training = minimizing loss
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Here's the big picture: <strong className="text-white">training a neural network is simply 
          finding the weights that make the loss as small as possible</strong>.
        </p>

        <div className="flex items-center justify-center my-8">
          <svg viewBox="0 0 300 140" className="w-full max-w-md">
            {/* Loss landscape - smooth valley shape using cubic bezier */}
            <path
              d="M 20 25 C 50 25, 70 25, 90 50 C 120 90, 130 100, 150 100 C 170 100, 180 90, 210 50 C 230 25, 250 25, 280 25"
              fill="none"
              stroke="#374151"
              strokeWidth="3"
            />
            
            {/* Starting point - on the left slope */}
            <circle cx="50" cy="25" r="8" className="fill-accent-rose" />
            <text x="50" y="15" textAnchor="middle" className="fill-accent-rose text-xs">starting point</text>
            <text x="95" y="35" textAnchor="start" className="fill-gray-500 text-[10px]">(high loss)</text>
            
            {/* Minimum marker - at the bottom of the valley */}
            <circle cx="150" cy="100" r="6" className="fill-accent-emerald" />
            <text x="150" y="120" textAnchor="middle" className="fill-accent-emerald text-xs">goal: minimum loss</text>

            {/* Arrow showing descent */}
            <defs>
              <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
              </marker>
            </defs>
            <path d="M 60 30 C 80 50, 110 80, 140 95" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="5,5" fill="none" markerEnd="url(#arrowhead2)" />
          </svg>
        </div>

        <div className="space-y-3 mb-6">
          <div className="p-4 rounded-xl bg-void-800/50">
            <div className="font-medium text-white mb-1">High loss = bad predictions</div>
            <div className="text-sm text-gray-400">
              The network's weights are wrong, so it's making mistakes
            </div>
          </div>
          <div className="p-4 rounded-xl bg-void-800/50">
            <div className="font-medium text-white mb-1">Low loss = good predictions</div>
            <div className="text-sm text-gray-400">
              We found weights that give accurate answers
            </div>
          </div>
          <div className="p-4 rounded-xl bg-accent-emerald/10 border border-accent-emerald/30">
            <div className="font-medium text-white mb-1">Training = rolling downhill</div>
            <div className="text-sm text-gray-400">
              We adjust weights step by step to get to the bottom (lowest loss)
            </div>
          </div>
        </div>
      </StepContent>

      <StepContent step={5} currentStep={step}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          But which weights do we change?
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Here's the challenge: a neural network has <strong className="text-white">many weights</strong> — 
          sometimes millions! When the loss is high, which ones should we adjust?
        </p>

        <div className="bg-void-800 rounded-xl p-6 mb-6">
          <div className="text-center">
            <div className="text-4xl mb-4">🤔</div>
            <p className="text-gray-300">
              "I have 1,000 weights I could change...<br/>
              <span className="text-accent-rose">Which ones actually caused the mistake?</span>"
            </p>
          </div>
        </div>

        <p className="text-gray-300 mb-6 leading-relaxed">
          This is exactly what we'll learn in the next module. 
          There's a clever technique that tells us exactly which weights to adjust 
          and by how much.
        </p>

        <div className="bg-accent-emerald/10 border border-accent-emerald/30 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-accent-emerald mt-0.5" />
            <div>
              <div className="font-medium text-white">Key Takeaway</div>
              <p className="text-sm text-gray-400 mt-1">
                The <span className="text-accent-rose">loss</span> measures how wrong our predictions are. 
                Training means adjusting weights to minimize this number. 
                But to know <em>which</em> weights to change, we need something more...
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-void-800/50 border border-white/5">
          <div className="text-sm text-gray-500 mb-2">New vocabulary:</div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <div className="text-accent-rose font-medium">Loss</div>
              <div className="text-xs text-gray-400">A number measuring how wrong the predictions are</div>
            </div>
            <div>
              <div className="text-accent-rose font-medium">Loss Function</div>
              <div className="text-xs text-gray-400">The formula we use to calculate the loss</div>
            </div>
            <div>
              <div className="text-accent-emerald font-medium">Target</div>
              <div className="text-xs text-gray-400">The correct answer we're trying to match</div>
            </div>
            <div>
              <div className="text-white font-medium">Minimize</div>
              <div className="text-xs text-gray-400">Make as small as possible</div>
            </div>
          </div>
        </div>
      </StepContent>
    </ModuleShell>
  )
}
