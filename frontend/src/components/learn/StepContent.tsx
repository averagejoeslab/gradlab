import { ReactNode } from 'react'
import { motion } from 'framer-motion'

export interface StepContentProps {
  /** The step number this content belongs to (0-indexed) */
  step: number
  /** The current active step */
  currentStep: number
  /** The content to render when this step is active */
  children: ReactNode
}

/**
 * StepContent - Animated wrapper for individual step content.
 * 
 * Only renders when step === currentStep, with a slide-in animation.
 * 
 * @example
 * ```tsx
 * <StepContent step={0} currentStep={currentStep}>
 *   <h2>Step 0 title</h2>
 *   <p>Step 0 content...</p>
 * </StepContent>
 * ```
 */
export function StepContent({ step, currentStep, children }: StepContentProps) {
  if (step !== currentStep) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      {children}
    </motion.div>
  )
}

