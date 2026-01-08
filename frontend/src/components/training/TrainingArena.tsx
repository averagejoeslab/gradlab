import { useState, useCallback, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw, StepForward } from 'lucide-react'
import { Value } from '../../core/engine'
import { MLP } from '../../core/nn'

// Generate moon dataset
function generateMoonData(n: number = 100): { points: [number, number][]; labels: number[] } {
  const points: [number, number][] = []
  const labels: number[] = []

  for (let i = 0; i < n; i++) {
    const isTop = i < n / 2
    const angle = (i / (n / 2)) * Math.PI + (isTop ? 0 : Math.PI)
    const radius = 1 + (Math.random() - 0.5) * 0.3

    let x = Math.cos(angle) * radius
    let y = Math.sin(angle) * radius

    if (!isTop) {
      x += 1
      y += 0.5
    }

    // Add noise
    x += (Math.random() - 0.5) * 0.2
    y += (Math.random() - 0.5) * 0.2

    points.push([x, y])
    labels.push(isTop ? 1 : 0)
  }

  return { points, labels }
}

export function TrainingArena() {
  const [data] = useState(() => generateMoonData(100))
  const [model, setModel] = useState(() => new MLP(2, [8, 8, 1]))
  const [loss, setLoss] = useState<number>(0)
  const [epoch, setEpoch] = useState(0)
  const [lossHistory, setLossHistory] = useState<number[]>([])
  const [isTraining, setIsTraining] = useState(false)
  const [learningRate, setLearningRate] = useState(0.05)
  const [decisionBoundary, setDecisionBoundary] = useState<number[][]>([])
  const animationRef = useRef<number>()

  // Compute decision boundary
  const computeDecisionBoundary = useCallback((model: MLP) => {
    const resolution = 30
    const boundary: number[][] = []

    for (let i = 0; i < resolution; i++) {
      const row: number[] = []
      for (let j = 0; j < resolution; j++) {
        const x = -2 + (j / resolution) * 5
        const y = -1.5 + (i / resolution) * 4

        const inputs = [new Value(x), new Value(y)]
        const output = model.call(inputs) as Value
        row.push(output.data)
      }
      boundary.push(row)
    }

    return boundary
  }, [])

  // Initialize
  useEffect(() => {
    setDecisionBoundary(computeDecisionBoundary(model))
  }, [model, computeDecisionBoundary])

  // Single training step
  const trainStep = useCallback(() => {
    // Forward pass
    let totalLoss = new Value(0)

    for (let i = 0; i < data.points.length; i++) {
      const [x, y] = data.points[i]
      const label = data.labels[i]

      const inputs = [new Value(x), new Value(y)]
      const output = model.call(inputs) as Value

      // MSE loss for this point
      const target = new Value(label)
      const diff = output.sub(target)
      const squaredError = diff.mul(diff)
      totalLoss = totalLoss.add(squaredError)
    }

    // Average loss
    const avgLoss = totalLoss.mul(1 / data.points.length)

    // Backward pass
    model.zeroGrad()
    avgLoss.backward()

    // Update weights
    for (const p of model.parameters()) {
      p.data -= learningRate * p.grad
    }

    const newLoss = avgLoss.data
    setLoss(newLoss)
    setLossHistory(h => [...h.slice(-100), newLoss])
    setEpoch(e => e + 1)
    setDecisionBoundary(computeDecisionBoundary(model))

    return newLoss
  }, [model, data, learningRate, computeDecisionBoundary])

  // Animation loop
  useEffect(() => {
    if (isTraining) {
      const step = () => {
        trainStep()
        animationRef.current = requestAnimationFrame(step)
      }
      animationRef.current = requestAnimationFrame(step)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isTraining, trainStep])

  // Reset
  const reset = () => {
    setIsTraining(false)
    setModel(new MLP(2, [8, 8, 1]))
    setLoss(0)
    setEpoch(0)
    setLossHistory([])
  }

  return (
    <div className="h-full flex">
      {/* Main visualization */}
      <div className="flex-1 p-8 flex flex-col">
        {/* Data plot */}
        <div className="flex-1 relative">
          <svg viewBox="-2.5 -2 5.5 4.5" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
            {/* Decision boundary heatmap */}
            {decisionBoundary.map((row, i) =>
              row.map((val, j) => {
                const x = -2 + (j / 30) * 5
                const y = -1.5 + (i / 30) * 4
                const normalized = Math.max(0, Math.min(1, val))
                const r = Math.round(59 + normalized * (249 - 59))
                const g = Math.round(130 + normalized * (115 - 130))
                const b = Math.round(246 + normalized * (22 - 246))

                return (
                  <rect
                    key={`${i}-${j}`}
                    x={x}
                    y={y}
                    width={5 / 30}
                    height={4 / 30}
                    fill={`rgb(${r},${g},${b})`}
                    opacity={0.3}
                  />
                )
              })
            )}

            {/* Grid lines */}
            <line x1="-2" y1="0" x2="3" y2="0" stroke="#374151" strokeWidth="0.02" />
            <line x1="0" y1="-1.5" x2="0" y2="2.5" stroke="#374151" strokeWidth="0.02" />

            {/* Data points */}
            {data.points.map(([x, y], i) => (
              <motion.circle
                key={i}
                cx={x}
                cy={-y} // Flip Y for standard coordinates
                r="0.08"
                className={data.labels[i] === 1 ? 'fill-flow-500' : 'fill-grad-500'}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.005 }}
              />
            ))}
          </svg>
        </div>

        {/* Loss chart */}
        <div className="h-32 mt-4 glass-card !p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Loss over time</span>
            <span className="font-mono text-sm text-flow-400">{loss.toFixed(4)}</span>
          </div>
          <svg viewBox="0 0 100 40" className="w-full h-20" preserveAspectRatio="none">
            {lossHistory.length > 1 && (
              <polyline
                fill="none"
                stroke="#3b82f6"
                strokeWidth="1"
                points={lossHistory.map((l, i) => {
                  const x = (i / Math.max(lossHistory.length - 1, 1)) * 100
                  const y = 40 - Math.min(l * 40, 40)
                  return `${x},${y}`
                }).join(' ')}
              />
            )}
          </svg>
        </div>
      </div>

      {/* Controls sidebar */}
      <div className="w-80 border-l border-white/5 p-6 overflow-y-auto">
        <h3 className="text-lg font-semibold text-white mb-6">Training Controls</h3>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="glass-card !p-3 text-center">
            <div className="text-2xl font-mono text-white">{epoch}</div>
            <div className="text-xs text-gray-500">Epoch</div>
          </div>
          <div className="glass-card !p-3 text-center">
            <div className="text-2xl font-mono text-flow-400">{loss.toFixed(3)}</div>
            <div className="text-xs text-gray-500">Loss</div>
          </div>
        </div>

        {/* Learning rate */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-gray-400">Learning Rate</label>
            <span className="font-mono text-sm text-accent-violet">{learningRate}</span>
          </div>
          <input
            type="range"
            min="0.001"
            max="0.2"
            step="0.001"
            value={learningRate}
            onChange={(e) => setLearningRate(parseFloat(e.target.value))}
            className="w-full accent-accent-violet"
          />
        </div>

        {/* Network architecture */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-400 mb-3">Network</h4>
          <div className="flex items-center justify-center gap-2 p-4 rounded-xl bg-void-800/50">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-flow-600/30 border border-flow-500" />
              <div className="w-8 h-8 rounded-full bg-flow-600/30 border border-flow-500 mt-1" />
              <span className="text-xs text-gray-500 mt-1">2</span>
            </div>
            <div className="text-gray-600">→</div>
            <div className="flex flex-col items-center">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-6 h-6 rounded-full bg-accent-violet/30 border border-accent-violet mb-0.5" />
              ))}
              <span className="text-xs text-gray-500 mt-1">8</span>
            </div>
            <div className="text-gray-600">→</div>
            <div className="flex flex-col items-center">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-6 h-6 rounded-full bg-accent-cyan/30 border border-accent-cyan mb-0.5" />
              ))}
              <span className="text-xs text-gray-500 mt-1">8</span>
            </div>
            <div className="text-gray-600">→</div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-grad-600/30 border border-grad-500" />
              <span className="text-xs text-gray-500 mt-1">1</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">
            {model.parameters().length} parameters
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => setIsTraining(!isTraining)}
            className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              isTraining
                ? 'bg-grad-600 hover:bg-grad-500 text-white'
                : 'bg-flow-600 hover:bg-flow-500 text-white'
            }`}
          >
            {isTraining ? (
              <>
                <Pause className="w-4 h-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Train
              </>
            )}
          </button>
          <div className="flex gap-2">
            <button
              onClick={trainStep}
              disabled={isTraining}
              className="flex-1 btn-secondary flex items-center justify-center gap-2
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <StepForward className="w-4 h-4" />
              Step
            </button>
            <button
              onClick={reset}
              className="flex-1 btn-secondary flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 p-4 rounded-xl bg-void-800/50 border border-white/5">
          <h4 className="text-sm font-medium text-white mb-3">Legend</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-flow-500" />
              <span className="text-xs text-gray-400">Class 1 (target: 1)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-grad-500" />
              <span className="text-xs text-gray-400">Class 0 (target: 0)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-3 bg-gradient-to-r from-flow-500/30 to-grad-500/30 rounded" />
              <span className="text-xs text-gray-400">Decision boundary</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

