/**
 * Learning Module Components
 * 
 * Reusable components for building learning modules with:
 * - Persisted step progress (survives page refreshes!)
 * - Consistent navigation and layout
 * - Animated step transitions
 */

export { ModuleShell } from './ModuleShell'
export type { ModuleShellProps } from './ModuleShell'

export { StepContent } from './StepContent'
export type { StepContentProps } from './StepContent'

export { useModuleContext, useCurrentStep } from './ModuleContext'
