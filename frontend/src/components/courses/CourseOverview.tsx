import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, BarChart3, BookOpen, Check } from 'lucide-react'
import { CourseDefinition, courseColorClasses, getModuleUrl } from '../../data/courses'
import { useStore } from '../../store/useStore'
import { ModuleCard } from './ModuleCard'

interface CourseOverviewProps {
  course: CourseDefinition
  /** Optional additional content to render after the header */
  headerContent?: ReactNode
}

const difficultyLabels = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

/**
 * CourseOverview - The main layout for a course overview page.
 * 
 * Displays:
 * - Course header with metadata
 * - Progress bar
 * - List of all modules with completion status
 */
export function CourseOverview({ course, headerContent }: CourseOverviewProps) {
  const { getCourseProgress } = useStore()
  const progress = getCourseProgress(course.id)
  const colorClasses = courseColorClasses[course.color]
  const Icon = course.icon
  
  const completedModules = progress.completedModules
  const totalModules = course.modules.length
  const isComplete = completedModules.length === totalModules
  const progressPercent = totalModules > 0 ? (completedModules.length / totalModules) * 100 : 0

  // Find the next module to continue
  const nextModuleIndex = course.modules.findIndex(m => !completedModules.includes(m.id))
  const nextModule = nextModuleIndex !== -1 ? course.modules[nextModuleIndex] : null

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Back navigation */}
      <Link
        to="/courses"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        All Courses
      </Link>

      {/* Course Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-start gap-6 mb-6">
          <div className={`
            w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0
            bg-gradient-to-br ${colorClasses.gradient}
          `}>
            <Icon className="w-10 h-10 text-white" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white">{course.title}</h1>
              {isComplete && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-emerald/20">
                  <Check className="w-4 h-4 text-accent-emerald" />
                  <span className="text-sm font-medium text-accent-emerald">Complete</span>
                </div>
              )}
            </div>
            <p className="text-lg text-gray-400 mb-4">{course.description}</p>
            
            {/* Meta info */}
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{course.estimatedTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                <span>{difficultyLabels[course.difficulty]}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>{totalModules} modules</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className={`p-4 rounded-xl ${colorClasses.bg} border ${colorClasses.border}`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-white">Course Progress</span>
            <span className="text-sm text-gray-400">
              {completedModules.length} of {totalModules} modules completed
            </span>
          </div>
          <div className="h-2 bg-void-800 rounded-full overflow-hidden mb-4">
            <div 
              className={`h-full rounded-full bg-gradient-to-r ${colorClasses.gradient} transition-all duration-500`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          
          {/* Continue/Start CTA */}
          {nextModule && (
            <Link
              to={getModuleUrl(course.id, nextModule.id)}
              className="btn-primary inline-flex items-center gap-2"
            >
              {completedModules.length > 0 ? 'Continue Learning' : 'Start Course'}
              <nextModule.icon className="w-4 h-4" />
            </Link>
          )}
          {isComplete && (
            <Link
              to={getModuleUrl(course.id, course.modules[0].id)}
              className="btn-secondary inline-flex items-center gap-2"
            >
              Review from Beginning
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          )}
        </div>
      </motion.div>

      {/* Optional header content */}
      {headerContent}

      {/* Modules List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white mb-4">Modules</h2>
        {course.modules.map((module, index) => (
          <ModuleCard
            key={module.id}
            module={module}
            courseId={course.id}
            index={index}
            isCompleted={completedModules.includes(module.id)}
            // Optional: Set isLocked based on sequential progression
            // isLocked={index > 0 && !completedModules.includes(course.modules[index - 1].id)}
          />
        ))}
      </div>
    </div>
  )
}

