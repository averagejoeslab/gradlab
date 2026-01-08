import { create } from 'zustand'

interface AppState {
  // Learning progress
  completedModules: string[]
  markModuleComplete: (moduleId: string) => void
  
  // Hints visibility
  showHints: boolean
  toggleHints: () => void
}

export const useStore = create<AppState>((set) => ({
  completedModules: [],
  markModuleComplete: (moduleId) => 
    set((state) => ({ 
      completedModules: [...new Set([...state.completedModules, moduleId])] 
    })),
  
  showHints: true,
  toggleHints: () => set((state) => ({ showHints: !state.showHints })),
}))
