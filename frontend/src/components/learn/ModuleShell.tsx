import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { useStore } from '../../store/useStore'

// Color mapping for progress bar and accents
const colorClasses: Record<string, string> = {
  flow: 'bg-flow-500',
  cyan: 'bg-accent-cyan',
  violet: 'bg-accent-violet',
  rose: 'bg-accent-rose',
  emerald: 'bg-accent-emerald',
  grad: 'bg-grad-500',
}

export interface ModuleShellProps {
  /** Module title displayed in the header */
  title: string
  /** Subtitle/description displayed under the title */
  subtitle: string
  /** Unique module ID for tracking completion */
  moduleId: string
  /** Total number of steps in this module */
  totalSteps: number
  /** Current step (0-indexed) */
  currentStep: number
  /** Callback when step changes */
  onStepChange: (step: number) => void
  /** Color theme for progress bar (default: 'flow') */
  progressColor?: keyof typeof colorClasses
  /** Path to navigate to on completion */
  nextPath: string
  /** Label for the completion button */
  nextLabel: string
  /** Whether this is the final module (shows "Complete Journey" instead of "Continue to...") */
  isFinalModule?: boolean
  /** The step content to render */
  children: ReactNode
}

/**
 * ModuleShell - The structural wrapper for all learn modules.
 * 
 * Provides consistent layout with:
 * - Header (back button, title, subtitle)
 * - Progress bar
 * - Content card
 * - Navigation (Previous/Next buttons)
 * 
 * @example
 * ```tsx
 * <ModuleShell
 *   title="Introduction"
 *   subtitle="What is a neural network?"
 *   moduleId="introduction"
 *   totalSteps={7}
 *   currentStep={step}
 *   onStepChange={setStep}
 *   progressColor="flow"
 *   nextPath="/learn/building-blocks"
 *   nextLabel="Continue to Building Blocks"
 * >
 *   <StepContent step={0} currentStep={step}>
 *     {/* Step 0 content *\/}
 *   </StepContent>
 *   <StepContent step={1} currentStep={step}>
 *     {/* Step 1 content *\/}
 *   </StepContent>
 * </ModuleShell>
 * ```
 */
export function ModuleShell({
  title,
  subtitle,
  moduleId,
  totalSteps,
  currentStep,
  onStepChange,
  progressColor = 'flow',
  nextPath,
  nextLabel,
  isFinalModule = false,
  children,
}: ModuleShellProps) {
  const { markModuleComplete } = useStore()

  const handleComplete = () => {
    markModuleComplete(moduleId)
  }

  const handlePrevious = () => {
    onStepChange(Math.max(0, currentStep - 1))
  }

  const handleNext = () => {
    onStepChange(currentStep + 1)
  }

  const progressColorClass = colorClasses[progressColor] || colorClasses.flow

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
          <h1 className="text-3xl font-bold text-white">{title}</h1>
          <p className="text-gray-400">{subtitle}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex gap-2 mb-8">
        {[...Array(totalSteps)].map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= currentStep ? progressColorClass : 'bg-void-700'
            }`}
          />
        ))}
      </div>

      {/* Content Card */}
      <div className="glass-card mb-8">
        {children}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </button>

        {currentStep < totalSteps - 1 ? (
          <button
            onClick={handleNext}
            className="btn-primary flex items-center gap-2"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <Link
            to={nextPath}
            onClick={handleComplete}
            className="btn-primary flex items-center gap-2"
          >
            {nextLabel}
            {isFinalModule ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        )}
      </div>
    </div>
  )
}

