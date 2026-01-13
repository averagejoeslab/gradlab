import { LucideIcon, BookOpen, CircleDot, Calculator, Layers, ArrowRight, Target, Search, Wrench, RefreshCw, Brain } from 'lucide-react'

/**
 * Course and Module Data Definitions
 * 
 * This file serves as the single source of truth for all course and module metadata.
 * Adding a new course or module is as simple as adding to these arrays.
 */

// ============================================================================
// Types
// ============================================================================

export interface ModuleDefinition {
  /** Unique ID for the module (used in URLs and progress tracking) */
  id: string
  /** Display title */
  title: string
  /** Short subtitle shown on cards */
  subtitle: string
  /** Longer description for the module card */
  description: string
  /** Icon component from lucide-react */
  icon: LucideIcon
  /** Color theme key */
  color: ModuleColor
  /** Estimated time to complete (e.g., "10 min") */
  estimatedTime?: string
}

export interface CourseDefinition {
  /** Unique ID for the course (used in URLs) */
  id: string
  /** Display title */
  title: string
  /** Short subtitle */
  subtitle: string
  /** Longer description for the course card */
  description: string
  /** Icon component from lucide-react */
  icon: LucideIcon
  /** Color theme key */
  color: CourseColor
  /** Estimated total time to complete */
  estimatedTime: string
  /** Difficulty level */
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  /** Modules in this course (in order) */
  modules: ModuleDefinition[]
}

// Color types for type safety
export type ModuleColor = 'white' | 'flow' | 'violet' | 'orange' | 'cyan' | 'emerald' | 'rose' | 'amber' | 'indigo'
export type CourseColor = 'flow' | 'violet' | 'emerald' | 'amber' | 'rose' | 'cyan'

// ============================================================================
// Color Mappings (for consistent styling)
// ============================================================================

export const moduleColorClasses: Record<ModuleColor, string> = {
  white: 'from-gray-400 to-gray-500',
  flow: 'from-flow-500 to-flow-600',
  violet: 'from-accent-violet to-purple-600',
  orange: 'from-grad-500 to-grad-600',
  cyan: 'from-accent-cyan to-cyan-600',
  emerald: 'from-accent-emerald to-emerald-600',
  rose: 'from-accent-rose to-rose-600',
  amber: 'from-amber-500 to-amber-600',
  indigo: 'from-indigo-500 to-indigo-600',
}

export const courseColorClasses: Record<CourseColor, { gradient: string; bg: string; border: string }> = {
  flow: {
    gradient: 'from-flow-500 to-flow-600',
    bg: 'bg-flow-500/10',
    border: 'border-flow-500/30',
  },
  violet: {
    gradient: 'from-accent-violet to-purple-600',
    bg: 'bg-accent-violet/10',
    border: 'border-accent-violet/30',
  },
  emerald: {
    gradient: 'from-accent-emerald to-emerald-600',
    bg: 'bg-accent-emerald/10',
    border: 'border-accent-emerald/30',
  },
  amber: {
    gradient: 'from-amber-500 to-amber-600',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
  },
  rose: {
    gradient: 'from-accent-rose to-rose-600',
    bg: 'bg-accent-rose/10',
    border: 'border-accent-rose/30',
  },
  cyan: {
    gradient: 'from-accent-cyan to-cyan-600',
    bg: 'bg-accent-cyan/10',
    border: 'border-accent-cyan/30',
  },
}

export const progressColorClasses: Record<ModuleColor, string> = {
  white: 'bg-gray-400',
  flow: 'bg-flow-500',
  violet: 'bg-accent-violet',
  orange: 'bg-grad-500',
  cyan: 'bg-accent-cyan',
  emerald: 'bg-accent-emerald',
  rose: 'bg-accent-rose',
  amber: 'bg-amber-500',
  indigo: 'bg-indigo-500',
}

// ============================================================================
// Course Definitions
// ============================================================================

export const foundationsCourse: CourseDefinition = {
  id: 'foundations',
  title: 'Neural Network Foundations',
  subtitle: 'Build genuine intuition from scratch',
  description: 'Understand neural networks step by step — no coding or math background required. Each module builds on the previous, giving you genuine intuition for how neural networks learn.',
  icon: Brain,
  color: 'flow',
  estimatedTime: '2-3 hours',
  difficulty: 'beginner',
  modules: [
    {
      id: 'introduction',
      title: 'Introduction',
      subtitle: 'What is a neural network?',
      description: 'Start here! Learn what neural networks are, what they do, and how they learn — using an analogy you already understand.',
      icon: BookOpen,
      color: 'white',
      estimatedTime: '15 min',
    },
    {
      id: 'what-is-neuron',
      title: 'What is a Neuron?',
      subtitle: 'The basic building block',
      description: 'Discover how biological neurons inspired artificial ones, and learn the key parts: inputs, weights, bias, and output.',
      icon: CircleDot,
      color: 'cyan',
      estimatedTime: '10 min',
    },
    {
      id: 'how-neurons-compute',
      title: 'How Neurons Compute',
      subtitle: 'The simple math inside',
      description: 'See the actual calculation a neuron performs — it\'s just multiply and add! Plus, try it yourself with an interactive demo.',
      icon: Calculator,
      color: 'violet',
      estimatedTime: '10 min',
    },
    {
      id: 'building-networks',
      title: 'Building Networks',
      subtitle: 'Combining neurons together',
      description: 'Learn how neurons form layers, and how layers stack into a complete network (MLP) that can recognize complex patterns.',
      icon: Layers,
      color: 'emerald',
      estimatedTime: '10 min',
    },
    {
      id: 'making-predictions',
      title: 'Making Predictions',
      subtitle: 'How inputs become outputs',
      description: 'Watch data flow through the network in the forward pass to produce a prediction.',
      icon: ArrowRight,
      color: 'flow',
      estimatedTime: '15 min',
    },
    {
      id: 'measuring-mistakes',
      title: 'Measuring Mistakes',
      subtitle: "How we know when we're wrong",
      description: 'Learn how the loss function measures the gap between predictions and correct answers.',
      icon: Target,
      color: 'rose',
      estimatedTime: '15 min',
    },
    {
      id: 'finding-what-to-fix',
      title: 'Finding What to Fix',
      subtitle: 'Tracing back to find the problem',
      description: 'Understand gradients and backpropagation — how the network knows which weights to adjust.',
      icon: Search,
      color: 'orange',
      estimatedTime: '20 min',
    },
    {
      id: 'making-adjustments',
      title: 'Making Adjustments',
      subtitle: 'Actually improving the network',
      description: 'See how gradient descent uses gradients to update weights and reduce the loss.',
      icon: Wrench,
      color: 'emerald',
      estimatedTime: '15 min',
    },
    {
      id: 'putting-it-together',
      title: 'Putting It Together',
      subtitle: 'The complete training loop',
      description: 'Bring it all together: the training loop that makes neural networks learn.',
      icon: RefreshCw,
      color: 'violet',
      estimatedTime: '20 min',
    },
  ],
}

// ============================================================================
// All Courses Registry
// ============================================================================

/**
 * Master list of all courses.
 * Add new courses here to have them appear on the courses page.
 */
export const allCourses: CourseDefinition[] = [
  foundationsCourse,
  // Future courses will be added here:
  // advancedCourse,
  // cnnCourse,
  // etc.
]

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get a course by ID
 */
export function getCourseById(courseId: string): CourseDefinition | undefined {
  return allCourses.find(c => c.id === courseId)
}

/**
 * Get a module by course ID and module ID
 */
export function getModuleById(courseId: string, moduleId: string): ModuleDefinition | undefined {
  const course = getCourseById(courseId)
  return course?.modules.find(m => m.id === moduleId)
}

/**
 * Get the next module in a course (returns undefined if at the end)
 */
export function getNextModule(courseId: string, currentModuleId: string): ModuleDefinition | undefined {
  const course = getCourseById(courseId)
  if (!course) return undefined
  
  const currentIndex = course.modules.findIndex(m => m.id === currentModuleId)
  if (currentIndex === -1 || currentIndex >= course.modules.length - 1) return undefined
  
  return course.modules[currentIndex + 1]
}

/**
 * Get the previous module in a course (returns undefined if at the beginning)
 */
export function getPreviousModule(courseId: string, currentModuleId: string): ModuleDefinition | undefined {
  const course = getCourseById(courseId)
  if (!course) return undefined
  
  const currentIndex = course.modules.findIndex(m => m.id === currentModuleId)
  if (currentIndex <= 0) return undefined
  
  return course.modules[currentIndex - 1]
}

/**
 * Check if a module is the last in its course
 */
export function isLastModule(courseId: string, moduleId: string): boolean {
  const course = getCourseById(courseId)
  if (!course || course.modules.length === 0) return false
  return course.modules[course.modules.length - 1].id === moduleId
}

/**
 * Get the module index (1-based for display)
 */
export function getModuleIndex(courseId: string, moduleId: string): number {
  const course = getCourseById(courseId)
  if (!course) return -1
  return course.modules.findIndex(m => m.id === moduleId) + 1
}

/**
 * Generate URL for a course page
 */
export function getCourseUrl(courseId: string): string {
  return `/courses/${courseId}`
}

/**
 * Generate URL for a module page
 */
export function getModuleUrl(courseId: string, moduleId: string): string {
  return `/courses/${courseId}/${moduleId}`
}

