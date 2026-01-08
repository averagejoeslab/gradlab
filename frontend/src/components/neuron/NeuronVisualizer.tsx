import { useState, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Play, RotateCcw, Shuffle } from 'lucide-react'
import { Value } from '../../core/engine'

interface NeuronState {
  weights: number[]
  bias: number
  inputs: number[]
}

export function NeuronVisualizer() {
  const [state, setState] = useState<NeuronState>({
    weights: [0.5, -0.3, 0.8],
    bias: 0.1,
    inputs: [1.0, 2.0, -1.0],
  })
  const [showGradients, setShowGradients] = useState(false)
  const [gradients, setGradients] = useState<{
    weights: number[]
    bias: number
    inputs: number[]
  } | null>(null)

  // Compute the neuron output
  const computation = useMemo(() => {
    const weightedSum = state.inputs.reduce(
      (sum, x, i) => sum + x * state.weights[i],
      state.bias
    )
    const preActivation = weightedSum
    const output = Math.max(0, preActivation) // ReLU
    return { weightedSum, preActivation, output }
  }, [state])

  // Run forward and backward
  const runBackward = useCallback(() => {
    // Build computation with Value objects
    const inputs = state.inputs.map(x => new Value(x))
    const weights = state.weights.map(w => new Value(w))
    const bias = new Value(state.bias)

    // Compute weighted sum
    let sum = bias
    for (let i = 0; i < inputs.length; i++) {
      sum = sum.add(inputs[i].mul(weights[i]))
    }

    // Apply ReLU
    const output = sum.relu()

    // Backward pass
    output.backward()

    // Extract gradients
    setGradients({
      weights: weights.map(w => w.grad),
      bias: bias.grad,
      inputs: inputs.map(x => x.grad),
    })
    setShowGradients(true)
  }, [state])

  // Reset gradients
  const reset = () => {
    setShowGradients(false)
    setGradients(null)
  }

  // Randomize values
  const randomize = () => {
    setState({
      weights: [0, 0, 0].map(() => Math.round((Math.random() * 2 - 1) * 100) / 100),
      bias: Math.round((Math.random() * 2 - 1) * 100) / 100,
      inputs: [0, 0, 0].map(() => Math.round((Math.random() * 4 - 2) * 100) / 100),
    })
    reset()
  }

  // Update a single value
  const updateWeight = (index: number, value: number) => {
    setState(s => ({
      ...s,
      weights: s.weights.map((w, i) => i === index ? value : w)
    }))
    reset()
  }

  const updateInput = (index: number, value: number) => {
    setState(s => ({
      ...s,
      inputs: s.inputs.map((x, i) => i === index ? value : x)
    }))
    reset()
  }

  const updateBias = (value: number) => {
    setState(s => ({ ...s, bias: value }))
    reset()
  }

  return (
    <div className="h-full flex">
      {/* Main visualization */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="relative">
          {/* SVG Neuron Diagram */}
          <svg viewBox="0 0 600 400" className="w-full max-w-3xl">
            {/* Connections from inputs to sum */}
            {state.inputs.map((_, i) => {
              const y = 100 + i * 100
              const gradient = showGradients && gradients ? gradients.weights[i] : 0
              const strokeColor = showGradients
                ? gradient > 0 ? '#f97316' : gradient < 0 ? '#22d3ee' : '#374151'
                : '#3b82f6'
              const strokeWidth = showGradients ? 2 + Math.abs(gradient) * 3 : 2

              return (
                <motion.line
                  key={`conn-${i}`}
                  x1="120"
                  y1={y}
                  x2="280"
                  y2="200"
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                />
              )
            })}

            {/* Bias connection */}
            <motion.line
              x1="200"
              y1="350"
              x2="280"
              y2="220"
              stroke={showGradients ? '#f97316' : '#3b82f6'}
              strokeWidth={2}
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />

            {/* Sum to ReLU */}
            <motion.line
              x1="320"
              y1="200"
              x2="400"
              y2="200"
              stroke={showGradients ? '#f97316' : '#3b82f6'}
              strokeWidth={2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            />

            {/* ReLU to output */}
            <motion.line
              x1="440"
              y1="200"
              x2="520"
              y2="200"
              stroke={showGradients ? '#f97316' : '#3b82f6'}
              strokeWidth={2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />

            {/* Input nodes */}
            {state.inputs.map((x, i) => {
              const y = 100 + i * 100
              return (
                <g key={`input-${i}`}>
                  <motion.circle
                    cx="80"
                    cy={y}
                    r="30"
                    className="fill-flow-600/20 stroke-flow-500"
                    strokeWidth={2}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                  />
                  <text x="80" y={y - 40} textAnchor="middle" className="fill-gray-500 text-xs">
                    x{i + 1}
                  </text>
                  <text x="80" y={y + 5} textAnchor="middle" className="fill-white text-lg font-mono">
                    {x.toFixed(1)}
                  </text>
                  {showGradients && gradients && (
                    <text x="80" y={y + 22} textAnchor="middle" className="fill-grad-400 text-xs font-mono">
                      ∇{gradients.inputs[i].toFixed(2)}
                    </text>
                  )}
                </g>
              )
            })}

            {/* Weight labels */}
            {state.weights.map((w, i) => {
              const y = 130 + i * 60
              return (
                <g key={`weight-${i}`}>
                  <text x="180" y={y} textAnchor="middle" className="fill-accent-violet text-sm font-mono">
                    w{i + 1}={w.toFixed(1)}
                  </text>
                  {showGradients && gradients && (
                    <text x="180" y={y + 14} textAnchor="middle" className="fill-grad-400 text-xs font-mono">
                      ∇{gradients.weights[i].toFixed(2)}
                    </text>
                  )}
                </g>
              )
            })}

            {/* Bias node */}
            <g>
              <motion.circle
                cx="200"
                cy="350"
                r="25"
                className="fill-void-700 stroke-gray-500"
                strokeWidth={2}
                strokeDasharray="5,5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              />
              <text x="200" y="320" textAnchor="middle" className="fill-gray-500 text-xs">
                bias
              </text>
              <text x="200" y="355" textAnchor="middle" className="fill-white text-sm font-mono">
                {state.bias.toFixed(1)}
              </text>
            </g>

            {/* Sum node */}
            <g>
              <motion.circle
                cx="300"
                cy="200"
                r="30"
                className="fill-void-700 stroke-gray-400"
                strokeWidth={2}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              />
              <text x="300" y="160" textAnchor="middle" className="fill-gray-500 text-xs">
                sum
              </text>
              <text x="300" y="205" textAnchor="middle" className="fill-white text-lg font-mono">
                Σ
              </text>
              <text x="300" y="250" textAnchor="middle" className="fill-gray-400 text-sm font-mono">
                {computation.weightedSum.toFixed(2)}
              </text>
            </g>

            {/* ReLU node */}
            <g>
              <motion.rect
                x="400"
                y="170"
                width="40"
                height="60"
                rx="8"
                className={`stroke-2 ${
                  computation.preActivation > 0 
                    ? 'fill-accent-emerald/20 stroke-accent-emerald' 
                    : 'fill-void-700 stroke-gray-500'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 }}
              />
              <text x="420" y="145" textAnchor="middle" className="fill-gray-500 text-xs">
                ReLU
              </text>
              <text x="420" y="205" textAnchor="middle" className="fill-white text-lg font-mono">
                R
              </text>
            </g>

            {/* Output node */}
            <g>
              <motion.circle
                cx="550"
                cy="200"
                r="35"
                className="fill-grad-600/20 stroke-grad-500"
                strokeWidth={2}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              />
              <text x="550" y="155" textAnchor="middle" className="fill-gray-500 text-xs">
                output
              </text>
              <text x="550" y="208" textAnchor="middle" className="fill-white text-2xl font-mono">
                {computation.output.toFixed(2)}
              </text>
            </g>
          </svg>
        </div>
      </div>

      {/* Controls sidebar */}
      <div className="w-80 border-l border-white/5 p-6 overflow-y-auto">
        <h3 className="text-lg font-semibold text-white mb-6">Neuron Controls</h3>

        {/* Inputs */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-400 mb-3">Inputs</h4>
          {state.inputs.map((x, i) => (
            <div key={i} className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm text-gray-300">x{i + 1}</label>
                <span className="font-mono text-sm text-flow-400">{x.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-3"
                max="3"
                step="0.1"
                value={x}
                onChange={(e) => updateInput(i, parseFloat(e.target.value))}
                className="w-full accent-flow-500"
              />
            </div>
          ))}
        </div>

        {/* Weights */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-400 mb-3">Weights</h4>
          {state.weights.map((w, i) => (
            <div key={i} className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm text-gray-300">w{i + 1}</label>
                <span className="font-mono text-sm text-accent-violet">{w.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-2"
                max="2"
                step="0.1"
                value={w}
                onChange={(e) => updateWeight(i, parseFloat(e.target.value))}
                className="w-full accent-accent-violet"
              />
            </div>
          ))}
        </div>

        {/* Bias */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-400 mb-3">Bias</h4>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm text-gray-300">b</label>
            <span className="font-mono text-sm text-gray-400">{state.bias.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="-2"
            max="2"
            step="0.1"
            value={state.bias}
            onChange={(e) => updateBias(parseFloat(e.target.value))}
            className="w-full accent-gray-500"
          />
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={runBackward}
            className="w-full btn-primary flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4" />
            Run Backward
          </button>
          <div className="flex gap-2">
            <button
              onClick={reset}
              className="flex-1 btn-secondary flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            <button
              onClick={randomize}
              className="flex-1 btn-secondary flex items-center justify-center gap-2"
            >
              <Shuffle className="w-4 h-4" />
              Random
            </button>
          </div>
        </div>

        {/* Explanation */}
        <div className="mt-6 p-4 rounded-xl bg-void-800/50 border border-white/5">
          <h4 className="text-sm font-medium text-white mb-2">How it works</h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            A neuron computes: <code className="text-flow-400">ReLU(Σ(wi × xi) + b)</code>
            <br /><br />
            Adjust the sliders to see how inputs, weights, and bias affect the output. 
            Click "Run Backward" to see gradients — how much each value affects the result.
          </p>
        </div>
      </div>
    </div>
  )
}

