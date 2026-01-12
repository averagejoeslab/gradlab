import { createContext, useContext } from 'react'

/**
 * Context for sharing module state between ModuleShell and child components
 */
interface ModuleContextValue {
  /** Current step (0-indexed) */
  currentStep: number
  /** Total number of steps */
  totalSteps: number
  /** Course ID */
  courseId: string
  /** Module ID */
  moduleId: string
}

const ModuleContext = createContext<ModuleContextValue | null>(null)

/**
 * Provider component for module context
 */
export const ModuleProvider = ModuleContext.Provider

/**
 * Hook to access module context
 * Must be used within a ModuleShell component
 */
export function useModuleContext(): ModuleContextValue {
  const context = useContext(ModuleContext)
  if (!context) {
    throw new Error('useModuleContext must be used within a ModuleShell')
  }
  return context
}

/**
 * Hook to get current step from context
 * Convenience wrapper for common use case
 */
export function useCurrentStep(): number {
  return useModuleContext().currentStep
}

