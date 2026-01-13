import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { HelpCircle, Check } from 'lucide-react'
import { ModuleShell, StepContent } from '../../../components/learn'

export function HowNeuronsComputeModule() {
  const [inputs, setInputs] = useState([0, 0])
  const [weights, setWeights] = useState([0, 0])
  const [bias, setBias] = useState(0)

  const computation = useMemo(() => {
    const weightedSum = inputs[0] * weights[0] + inputs[1] * weights[1] + bias
    const output = Math.max(0, weightedSum) // ReLU
    return { weightedSum, output }
  }, [inputs, weights, bias])

  return (
    <ModuleShell
      courseId="foundations"
      title="How Neurons Compute"
      subtitle="The simple math inside every neuron"
      moduleId="how-neurons-compute"
      totalSteps={4}
      progressColor="violet"
    >
      {/* Vocabulary reminder - shown above content */}
      <div className="mb-6 p-3 rounded-lg bg-void-800/30 border border-white/5 flex items-center gap-3 -mt-2">
        <HelpCircle className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-500">
          A neuron has <span className="text-flow-400">inputs</span>, <span className="text-accent-violet">weights</span>, <span className="text-gray-400">bias</span>, and produces an <span className="text-grad-400">output</span>
        </span>
      </div>

      <StepContent step={0}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          What you'll learn
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed text-lg">
          You now know the parts of a neuron. Let's see what it actually <em>does</em> with them.
        </p>
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-void-800/30">
            <div className="w-6 h-6 rounded-full bg-accent-violet/30 flex items-center justify-center text-accent-violet text-sm">✓</div>
            <span className="text-gray-300">The <strong className="text-white">neuron formula</strong> (multiply and add)</span>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-void-800/30">
            <div className="w-6 h-6 rounded-full bg-accent-violet/30 flex items-center justify-center text-accent-violet text-sm">✓</div>
            <span className="text-gray-300">What an <strong className="text-accent-emerald">activation function</strong> is (ReLU)</span>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-void-800/30">
            <div className="w-6 h-6 rounded-full bg-accent-violet/30 flex items-center justify-center text-accent-violet text-sm">✓</div>
            <span className="text-gray-300">Hands-on experimentation with a real neuron</span>
          </div>
        </div>
        <div className="bg-void-800 rounded-xl p-6 border-l-4 border-accent-violet">
          <p className="text-gray-300">
            <strong className="text-white">Good news:</strong> If you can multiply and add, 
            you already know enough math for this module!
          </p>
        </div>
      </StepContent>

      <StepContent step={1}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          The math (it's just multiply and add!)
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Here's the simple calculation a neuron performs:
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

        <div className="bg-flow-600/10 border border-flow-500/30 rounded-xl p-4 mb-6">
          <p className="text-gray-300">
            <strong className="text-white">That's it!</strong> Multiply and add — you learned this in elementary school. 
            The power of neural networks comes from having <em>millions</em> of these simple calculations working together.
          </p>
        </div>

        {/* Takeaway formula */}
        <div className="bg-void-900 rounded-xl p-6 border border-white/10">
          <div className="text-center">
            <div className="text-gray-500 text-sm mb-3 uppercase tracking-wide">The Neuron Formula</div>
            <div className="text-xl md:text-2xl text-white font-mono mb-4">
              <span className="text-grad-400">output</span> = 
              (<span className="text-flow-400">x₁</span> × <span className="text-accent-violet">w₁</span>) + 
              (<span className="text-flow-400">x₂</span> × <span className="text-accent-violet">w₂</span>) + 
              <span className="text-gray-400">b</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span><span className="text-flow-400 font-mono">x</span> <span className="text-gray-500">= inputs</span></span>
              <span><span className="text-accent-violet font-mono">w</span> <span className="text-gray-500">= weights</span></span>
              <span><span className="text-gray-400 font-mono">b</span> <span className="text-gray-500">= bias</span></span>
            </div>
          </div>
        </div>
      </StepContent>

      <StepContent step={2}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          Activation functions (ReLU)
        </h2>
        <p className="text-gray-300 mb-4 leading-relaxed">
          After computing the weighted sum, there's one more step. We apply an <strong className="text-accent-emerald">activation function</strong> — 
          a simple rule that decides the final output.
        </p>
        <p className="text-gray-300 mb-6 leading-relaxed">
          The most common one is called <strong className="text-accent-emerald">ReLU</strong> (Rectified Linear Unit). 
          It does one simple thing:
        </p>

        <div className="bg-accent-emerald/10 border border-accent-emerald/30 rounded-xl p-6 mb-6">
          <div className="text-center">
            <div className="text-lg text-white mb-2">
              If the result is <span className="text-accent-rose">negative</span> → output <span className="font-mono">0</span>
            </div>
            <div className="text-lg text-white">
              If the result is <span className="text-accent-emerald">positive</span> → keep it as is
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-void-800/50">
            <div className="text-gray-400 text-sm mb-1">Example 1:</div>
            <div className="text-white">
              Weighted sum = <span className="text-accent-emerald">2.5</span> → Output = <span className="text-accent-emerald font-mono">2.5</span>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-void-800/50">
            <div className="text-gray-400 text-sm mb-1">Example 2:</div>
            <div className="text-white">
              Weighted sum = <span className="text-accent-rose">-3.0</span> → Output = <span className="font-mono">0</span>
            </div>
          </div>
        </div>

        <div className="bg-void-800 rounded-xl p-4 mb-6">
          <p className="text-gray-300">
            <strong className="text-white">Why do this?</strong> Activation functions help neural networks learn 
            complex patterns. Without them, stacking layers wouldn't help — the network would just be doing 
            one big multiply-and-add. ReLU is popular because it's simple and works well.
          </p>
        </div>

        {/* Visual representation of ReLU */}
        <div className="flex items-center justify-center my-6">
          <svg viewBox="0 0 300 150" className="w-full max-w-sm">
            {/* Axes */}
            <line x1="30" y1="110" x2="270" y2="110" stroke="#374151" strokeWidth="2" />
            <line x1="150" y1="130" x2="150" y2="20" stroke="#374151" strokeWidth="2" />
            
            {/* Axis labels */}
            <text x="260" y="125" className="fill-gray-500 text-xs">input</text>
            <text x="155" y="30" className="fill-gray-500 text-xs">output</text>
            <text x="150" y="125" textAnchor="middle" className="fill-gray-600 text-xs">0</text>
            
            {/* ReLU line - negative part (at zero) */}
            <line x1="30" y1="110" x2="150" y2="110" stroke="#f43f5e" strokeWidth="3" />
            
            {/* ReLU line - positive part (identity) */}
            <line x1="150" y1="110" x2="270" y2="30" stroke="#10b981" strokeWidth="3" />
            
            {/* Labels */}
            <text x="80" y="100" className="fill-accent-rose text-xs">negative → 0</text>
            <text x="200" y="60" className="fill-accent-emerald text-xs">positive → same</text>
          </svg>
        </div>
      </StepContent>

      <StepContent step={3}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          Try it yourself
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Adjust the <span className="text-flow-400">inputs</span>, <span className="text-accent-violet">weights</span>, and <span className="text-gray-400">bias</span> to 
          see how they affect the neuron's <span className="text-grad-400">output</span>.
        </p>

        {/* Neuron visualization */}
        <div className="flex items-center justify-center gap-4 md:gap-6 my-8">
          {/* Inputs */}
          <div className="flex flex-col gap-4">
            {inputs.map((x, i) => (
              <div key={i} className="flex items-center gap-2 md:gap-3">
                <motion.div 
                  key={`input-${i}-${x}`}
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-flow-600/20 border-2 border-flow-500/50 
                             flex flex-col items-center justify-center"
                >
                  <div className="text-[10px] md:text-xs text-gray-500">input {i + 1}</div>
                  <div className="font-mono text-white text-sm md:text-base">{x.toFixed(1)}</div>
                </motion.div>
                <div className="font-mono text-xs md:text-sm text-accent-violet">×{weights[i].toFixed(1)}</div>
              </div>
            ))}
          </div>

          {/* Arrow */}
          <div className="text-gray-600">→</div>

          {/* Sum */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-accent-cyan/20 border-2 border-accent-cyan 
                         flex items-center justify-center text-lg md:text-xl text-gray-300">
              Σ
            </div>
            <div className="mt-1 text-xs md:text-sm text-gray-500">+{bias.toFixed(1)}</div>
          </div>

          {/* Arrow */}
          <div className="text-gray-600">→</div>

          {/* Output */}
          <motion.div
            key={computation.output}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-grad-600/20 border-2 border-grad-500/50 
                     flex flex-col items-center justify-center"
          >
            <div className="text-[10px] md:text-xs text-gray-500">output</div>
            <div className="text-xl md:text-2xl font-mono text-grad-400">{computation.output.toFixed(1)}</div>
          </motion.div>
        </div>

        {/* Live formula */}
        <div className="bg-void-800/50 rounded-lg p-3 mb-6 text-center">
          <span className="text-sm font-mono">
            (<span className="text-flow-400">{inputs[0].toFixed(1)}</span> × <span className="text-accent-violet">{weights[0].toFixed(1)}</span>) + 
            (<span className="text-flow-400">{inputs[1].toFixed(1)}</span> × <span className="text-accent-violet">{weights[1].toFixed(1)}</span>) + 
            <span className="text-gray-400">{bias.toFixed(1)}</span> = <span className="text-grad-400">{computation.output.toFixed(1)}</span>
          </span>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          {/* Inputs row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-flow-600/10 border border-flow-500/20">
              <label className="text-sm text-flow-400 mb-2 block font-medium">Input 1</label>
              <input
                type="range"
                min="-5"
                max="5"
                step="0.1"
                value={inputs[0]}
                onChange={(e) => setInputs([parseFloat(e.target.value), inputs[1]])}
                className="w-full accent-flow-500"
              />
              <div className="text-center font-mono text-flow-400 text-lg">{inputs[0].toFixed(1)}</div>
            </div>
            <div className="p-3 rounded-lg bg-flow-600/10 border border-flow-500/20">
              <label className="text-sm text-flow-400 mb-2 block font-medium">Input 2</label>
              <input
                type="range"
                min="-5"
                max="5"
                step="0.1"
                value={inputs[1]}
                onChange={(e) => setInputs([inputs[0], parseFloat(e.target.value)])}
                className="w-full accent-flow-500"
              />
              <div className="text-center font-mono text-flow-400 text-lg">{inputs[1].toFixed(1)}</div>
            </div>
          </div>

          {/* Weights row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-accent-violet/10 border border-accent-violet/20">
              <label className="text-sm text-accent-violet mb-2 block font-medium">Weight 1</label>
              <input
                type="range"
                min="-5"
                max="5"
                step="0.1"
                value={weights[0]}
                onChange={(e) => setWeights([parseFloat(e.target.value), weights[1]])}
                className="w-full accent-accent-violet"
              />
              <div className="text-center font-mono text-accent-violet text-lg">{weights[0].toFixed(1)}</div>
            </div>
            <div className="p-3 rounded-lg bg-accent-violet/10 border border-accent-violet/20">
              <label className="text-sm text-accent-violet mb-2 block font-medium">Weight 2</label>
              <input
                type="range"
                min="-5"
                max="5"
                step="0.1"
                value={weights[1]}
                onChange={(e) => setWeights([weights[0], parseFloat(e.target.value)])}
                className="w-full accent-accent-violet"
              />
              <div className="text-center font-mono text-accent-violet text-lg">{weights[1].toFixed(1)}</div>
            </div>
          </div>

          {/* Bias row */}
          <div className="p-3 rounded-lg bg-gray-600/10 border border-gray-500/20">
            <label className="text-sm text-gray-400 mb-2 block font-medium">Bias</label>
            <input
              type="range"
              min="-5"
              max="5"
              step="0.1"
              value={bias}
              onChange={(e) => setBias(parseFloat(e.target.value))}
              className="w-full accent-gray-400"
            />
            <div className="text-center font-mono text-gray-400 text-lg">{bias.toFixed(1)}</div>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-xl bg-accent-violet/10 border border-accent-violet/30">
          <p className="text-sm text-gray-300">
            💡 <strong className="text-white">Experiments to try:</strong>
          </p>
          <ul className="text-sm text-gray-400 mt-2 space-y-1">
            <li>• Set a weight to <span className="text-accent-violet font-mono">0</span> — that input gets ignored!</li>
            <li>• Make a weight <span className="text-accent-violet font-mono">negative</span> — higher inputs decrease the output</li>
            <li>• Use <span className="text-gray-300 font-mono">bias</span> to shift all outputs up or down</li>
            <li>• Get a <span className="text-accent-rose">negative</span> weighted sum — watch ReLU set the output to <span className="font-mono">0</span></li>
          </ul>
        </div>

        <div className="mt-6 bg-accent-emerald/10 border border-accent-emerald/30 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-accent-emerald mt-0.5" />
            <div>
              <div className="font-medium text-white">Now you understand how neurons compute!</div>
              <p className="text-sm text-gray-400 mt-1">
                Next, we'll see how to connect many neurons together into a full network.
              </p>
            </div>
          </div>
        </div>
      </StepContent>
    </ModuleShell>
  )
}

