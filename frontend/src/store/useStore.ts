import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Course progress tracking per course
 */
interface CourseProgress {
  completedModules: string[]
}

interface AppState {
  // Course-based progress tracking
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
  
  // Legacy: Keep completedModules for backwards compatibility during migration
  // This maps to foundations course
  completedModules: string[]
  
  // Hints visibility
  showHints: boolean
  toggleHints: () => void
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      courseProgress: {},
      
      markModuleComplete: (courseId: string, moduleId: string) => 
        set((state) => {
          const currentProgress = state.courseProgress[courseId] || { completedModules: [] }
          const newCompletedModules = [...new Set([...currentProgress.completedModules, moduleId])]
          
          return {
            courseProgress: {
              ...state.courseProgress,
              [courseId]: {
                ...currentProgress,
                completedModules: newCompletedModules,
              },
            },
            // Also update legacy completedModules for foundations course
            completedModules: courseId === 'foundations' 
              ? newCompletedModules 
              : state.completedModules,
          }
        }),
      
      getCourseProgress: (courseId: string) => {
        const state = get()
        return state.courseProgress[courseId] || { completedModules: [] }
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
            [courseId]: { completedModules: [] },
          },
          completedModules: courseId === 'foundations' ? [] : state.completedModules,
        })),
      
      // Legacy support
      completedModules: [],
      
      showHints: true,
      toggleHints: () => set((state) => ({ showHints: !state.showHints })),
    }),
    {
      name: 'micrograd-playground-storage',
      // Migrate old data format to new format
      migrate: (persistedState: unknown, _version: number) => {
        const state = persistedState as AppState
        
        // If we have old completedModules but no courseProgress for foundations,
        // migrate the data
        if (state.completedModules?.length > 0 && !state.courseProgress?.foundations) {
          return {
            ...state,
            courseProgress: {
              ...state.courseProgress,
              foundations: {
                completedModules: state.completedModules,
              },
            },
          }
        }
        
        return state
      },
      version: 1,
    }
  )
)
