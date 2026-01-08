import { create } from 'zustand'

export type InteractivityLevel = 'guided' | 'explorer' | 'sandbox'

interface AppState {
  // Interactivity level
  interactivityLevel: InteractivityLevel
  setInteractivityLevel: (level: InteractivityLevel) => void
  
  // Learning progress
  completedModules: string[]
  markModuleComplete: (moduleId: string) => void
  
  // Current module hints
  showHints: boolean
  toggleHints: () => void
}

export const useStore = create<AppState>((set) => ({
  interactivityLevel: 'explorer',
  setInteractivityLevel: (level) => set({ interactivityLevel: level }),
  
  completedModules: [],
  markModuleComplete: (moduleId) => 
    set((state) => ({ 
      completedModules: [...new Set([...state.completedModules, moduleId])] 
    })),
  
  showHints: true,
  toggleHints: () => set((state) => ({ showHints: !state.showHints })),
}))

