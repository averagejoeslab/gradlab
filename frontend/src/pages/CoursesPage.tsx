import { motion } from 'framer-motion'
import { GraduationCap, Sparkles } from 'lucide-react'
import { allCourses } from '../data/courses'
import { CourseCard } from '../components/courses'

/**
 * CoursesPage - The main courses listing page.
 * 
 * Displays all available courses with their progress and metadata.
 * URL: /courses
 */
export function CoursesPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-flow-500/10 border border-flow-500/20 text-flow-400 text-sm mb-6">
          <GraduationCap className="w-4 h-4" />
          <span>Learn at your own pace</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Learning Paths
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Master neural networks from the ground up. Each course builds your understanding 
          step by step with clear explanations and interactive examples.
        </p>
      </motion.div>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allCourses.map((course, index) => (
          <CourseCard key={course.id} course={course} index={index} />
        ))}
        
        {/* Coming Soon placeholder if only one course */}
        {allCourses.length < 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: allCourses.length * 0.1 }}
            className="glass-card border-dashed border-void-600 flex flex-col items-center justify-center text-center p-8"
          >
            <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-void-700 mb-4">
              <Sparkles className="w-7 h-7 text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-400 mb-2">
              More Courses Coming Soon
            </h3>
            <p className="text-sm text-gray-500">
              We're working on advanced topics like CNNs, transformers, and more.
            </p>
          </motion.div>
        )}
      </div>

      {/* Learning Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-16 p-6 rounded-xl bg-gradient-to-br from-void-800/50 to-void-900/50 border border-void-700"
      >
        <h2 className="text-lg font-semibold text-white mb-4">💡 Learning Tips</h2>
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <h3 className="font-medium text-flow-400 mb-1">Take your time</h3>
            <p className="text-gray-400">
              Each module is designed to be completed in one sitting, but feel free to 
              revisit concepts as needed.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-flow-400 mb-1">Build intuition</h3>
            <p className="text-gray-400">
              Focus on understanding the "why" behind each concept. The math and code 
              will make more sense once you have the intuition.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-flow-400 mb-1">Experiment in the playground</h3>
            <p className="text-gray-400">
              After completing courses, try the playground to see these concepts in 
              action with real neural networks.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

