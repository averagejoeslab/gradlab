import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useModuleContext } from './ModuleContext'

export interface StepContentProps {
  /** The step number this content belongs to (0-indexed) */
  step: number
  /** 
   * @deprecated No longer needed - currentStep is provided via context from ModuleShell
   * Kept for backwards compatibility during migration
   */
  currentStep?: number
  /** The content to render when this step is active */
  children: ReactNode
}

/**
 * StepContent - Animated wrapper for individual step content.
 * 
 * Only renders when step matches the current step, with a slide-in animation.
 * 
 * Current step is automatically obtained from ModuleShell context,
 * so you no longer need to pass currentStep as a prop!
 * 
 * @example
 * ```tsx
 * // New way (recommended) - no currentStep prop needed!
 * <StepContent step={0}>
 *   <h2>Step 0 title</h2>
 *   <p>Step 0 content...</p>
 * </StepContent>
 * 
 * // Old way (still works for backwards compatibility)
 * <StepContent step={0} currentStep={currentStep}>
 *   <h2>Step 0 title</h2>
 * </StepContent>
 * ```
 */
export function StepContent({ step, currentStep: propCurrentStep, children }: StepContentProps) {
  // Get currentStep from context, fall back to prop for backwards compatibility
  let contextCurrentStep: number
  try {
    const context = useModuleContext()
    contextCurrentStep = context.currentStep
  } catch {
    // If not in a ModuleShell context, use the prop
    contextCurrentStep = propCurrentStep ?? 0
  }
  
  const currentStep = propCurrentStep ?? contextCurrentStep

  if (step !== currentStep) {
    return null
  }

  return (
    <motion.div
      key={step} // Add key to force re-animation when step changes
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
