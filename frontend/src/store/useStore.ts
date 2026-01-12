import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ============================================================================
// Types
// ============================================================================

/**
 * Progress tracking for a single module
 */
interface ModuleProgress {
  /** Current step the user is on (0-indexed) */
  currentStep: number
  /** ISO timestamp of last visit */
  lastVisited: string
}

/**
 * Progress tracking for a single course
 */
interface CourseProgress {
  /** List of completed module IDs */
  completedModules: string[]
  /** Step-level progress per module */
  moduleProgress: Record<string, ModuleProgress>
  /** ISO timestamp when course was started */
  startedAt?: string
}

/**
 * User preferences
 */
interface UserPreferences {
  /** Whether to show hint tooltips */
  showHints: boolean
}

/**
 * Main application state
 */
interface AppState {
  // =========================================================================
  // Course Progress
  // =========================================================================
  
  /** Progress data for all courses */
  courseProgress: Record<string, CourseProgress>
  
  /**
   * Mark a module as complete within a specific course
   */
  markModuleComplete: (courseId: string, moduleId: string) => void
  
  /**
   * Get progress for a specific course
   */
  getCourseProgress: (courseId: string) => CourseProgress
  
  /**
   * Check if a specific module is completed
   */
  isModuleCompleted: (courseId: string, moduleId: string) => boolean
  
  /**
   * Reset progress for a course (for testing/debugging)
   */
  resetCourseProgress: (courseId: string) => void
  
  // =========================================================================
  // Module Step Progress (NEW)
  // =========================================================================
  
  /**
   * Get the current step for a module (returns 0 if not started)
   */
  getModuleStep: (courseId: string, moduleId: string) => number
  
  /**
   * Set the current step for a module
   */
  setModuleStep: (courseId: string, moduleId: string, step: number) => void
  
  /**
   * Reset step progress for a specific module
   */
  resetModuleStep: (courseId: string, moduleId: string) => void
  
  // =========================================================================
  // User Preferences
  // =========================================================================
  
  preferences: UserPreferences
  
  /** Toggle hints visibility */
  toggleHints: () => void
  
  // =========================================================================
  // Legacy Support (for backwards compatibility)
  // =========================================================================
  
  /** @deprecated Use courseProgress instead */
  completedModules: string[]
  
  /** @deprecated Use preferences.showHints instead */
  showHints: boolean
}

// ============================================================================
// Default Values
// ============================================================================

const createDefaultCourseProgress = (): CourseProgress => ({
  completedModules: [],
  moduleProgress: {},
  startedAt: new Date().toISOString(),
})

const createDefaultModuleProgress = (): ModuleProgress => ({
  currentStep: 0,
  lastVisited: new Date().toISOString(),
})

// ============================================================================
// Store Implementation
// ============================================================================

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // =======================================================================
      // Course Progress
      // =======================================================================
      
      courseProgress: {},
      
      markModuleComplete: (courseId: string, moduleId: string) => 
        set((state) => {
          const currentProgress = state.courseProgress[courseId] || createDefaultCourseProgress()
          const newCompletedModules = [...new Set([...currentProgress.completedModules, moduleId])]
          
          return {
            courseProgress: {
              ...state.courseProgress,
              [courseId]: {
                ...currentProgress,
                completedModules: newCompletedModules,
              },
            },
            // Legacy support
            completedModules: courseId === 'foundations' 
              ? newCompletedModules 
              : state.completedModules,
          }
        }),
      
      getCourseProgress: (courseId: string) => {
        const state = get()
        return state.courseProgress[courseId] || createDefaultCourseProgress()
      },
      
      isModuleCompleted: (courseId: string, moduleId: string) => {
        const state = get()
        const progress = state.courseProgress[courseId]
        return progress?.completedModules.includes(moduleId) ?? false
      },
      
      resetCourseProgress: (courseId: string) =>
        set((state) => ({
          courseProgress: {
            ...state.courseProgress,
            [courseId]: createDefaultCourseProgress(),
          },
          completedModules: courseId === 'foundations' ? [] : state.completedModules,
        })),
      
      // =======================================================================
      // Module Step Progress (NEW)
      // =======================================================================
      
      getModuleStep: (courseId: string, moduleId: string) => {
        const state = get()
        return state.courseProgress[courseId]?.moduleProgress[moduleId]?.currentStep ?? 0
      },
      
      setModuleStep: (courseId: string, moduleId: string, step: number) =>
        set((state) => {
          const currentCourseProgress = state.courseProgress[courseId] || createDefaultCourseProgress()
          const currentModuleProgress = currentCourseProgress.moduleProgress[moduleId] || createDefaultModuleProgress()
          
          return {
            courseProgress: {
              ...state.courseProgress,
              [courseId]: {
                ...currentCourseProgress,
                moduleProgress: {
                  ...currentCourseProgress.moduleProgress,
                  [moduleId]: {
                    ...currentModuleProgress,
                    currentStep: step,
                    lastVisited: new Date().toISOString(),
                  },
                },
              },
            },
          }
        }),
      
      resetModuleStep: (courseId: string, moduleId: string) =>
        set((state) => {
          const currentCourseProgress = state.courseProgress[courseId]
          if (!currentCourseProgress) return state
          
          const { [moduleId]: _, ...remainingModuleProgress } = currentCourseProgress.moduleProgress
          
          return {
            courseProgress: {
              ...state.courseProgress,
              [courseId]: {
                ...currentCourseProgress,
                moduleProgress: remainingModuleProgress,
              },
            },
          }
        }),
      
      // =======================================================================
      // User Preferences
      // =======================================================================
      
      preferences: {
        showHints: true,
      },
      
      toggleHints: () => set((state) => ({ 
        preferences: {
          ...state.preferences,
          showHints: !state.preferences.showHints,
        },
        // Legacy support
        showHints: !state.showHints,
      })),
      
      // =======================================================================
      // Legacy Support
      // =======================================================================
      
      completedModules: [],
      showHints: true,
    }),
    {
      name: 'gradlab-storage',
      version: 2, // Bumped version for migration
      
      // Migrate old data format to new format
      migrate: (persistedState: unknown, version: number) => {
        const state = persistedState as Partial<AppState>
        
        // Version 1 -> 2: Add moduleProgress to courseProgress
        if (version < 2) {
          // Ensure courseProgress exists with proper structure
          const updatedCourseProgress: Record<string, CourseProgress> = {}
          
          if (state.courseProgress) {
            for (const [courseId, progress] of Object.entries(state.courseProgress)) {
              updatedCourseProgress[courseId] = {
                completedModules: progress.completedModules || [],
                moduleProgress: progress.moduleProgress || {},
                startedAt: progress.startedAt,
              }
            }
          }
          
          // Migrate legacy completedModules to foundations course if needed
          if (state.completedModules?.length && !updatedCourseProgress.foundations) {
            updatedCourseProgress.foundations = {
              completedModules: state.completedModules,
              moduleProgress: {},
              startedAt: new Date().toISOString(),
            }
          }
          
          return {
            ...state,
            courseProgress: updatedCourseProgress,
            preferences: {
              showHints: state.showHints ?? state.preferences?.showHints ?? true,
            },
          }
        }
        
        return state as AppState
      },
    }
  )
)

// ============================================================================
// Custom Hooks for Convenient Access
// ============================================================================

/**
 * Hook for managing module progress (step tracking + completion)
 * 
 * @example
 * ```tsx
 * function MyModule() {
 *   const { currentStep, setStep, markComplete } = useModuleProgress('foundations', 'introduction')
 *   
 *   return (
 *     <ModuleShell
 *       currentStep={currentStep}
 *       onStepChange={setStep}
 *       // ...
 *     />
 *   )
 * }
 * ```
 */
export function useModuleProgress(courseId: string, moduleId: string) {
  const store = useStore()
  
  return {
    /** Current step (0-indexed), persisted across refreshes */
    currentStep: store.getModuleStep(courseId, moduleId),
    
    /** Update the current step */
    setStep: (step: number) => store.setModuleStep(courseId, moduleId, step),
    
    /** Mark this module as complete */
    markComplete: () => store.markModuleComplete(courseId, moduleId),
    
    /** Check if this module is already completed */
    isCompleted: store.isModuleCompleted(courseId, moduleId),
    
    /** Reset step progress for this module */
    resetStep: () => store.resetModuleStep(courseId, moduleId),
  }
}

/**
 * Hook for accessing course-level progress
 * 
 * @example
 * ```tsx
 * function CourseOverview() {
 *   const { completedCount, totalModules, percentComplete } = useCourseProgress('foundations', 7)
 *   // ...
 * }
 * ```
 */
export function useCourseProgress(courseId: string, totalModules: number) {
  const store = useStore()
  const progress = store.getCourseProgress(courseId)
  
  return {
    /** List of completed module IDs */
    completedModules: progress.completedModules,
    
    /** Number of completed modules */
    completedCount: progress.completedModules.length,
    
    /** Total number of modules in the course */
    totalModules,
    
    /** Completion percentage (0-100) */
    percentComplete: totalModules > 0 
      ? Math.round((progress.completedModules.length / totalModules) * 100) 
      : 0,
    
    /** Check if a specific module is completed */
    isModuleCompleted: (moduleId: string) => progress.completedModules.includes(moduleId),
    
    /** Reset all progress for this course */
    reset: () => store.resetCourseProgress(courseId),
  }
}
