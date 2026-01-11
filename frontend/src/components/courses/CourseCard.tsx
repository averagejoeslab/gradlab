import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, BarChart3, Check } from 'lucide-react'
import { CourseDefinition, courseColorClasses, getCourseUrl } from '../../data/courses'
import { useStore } from '../../store/useStore'

interface CourseCardProps {
  course: CourseDefinition
  index?: number
}

const difficultyLabels = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

const difficultyColors = {
  beginner: 'text-accent-emerald',
  intermediate: 'text-amber-400',
  advanced: 'text-accent-rose',
}

/**
 * CourseCard - Displays a course on the courses listing page.
 * 
 * Shows course metadata, progress, and links to the course overview.
 */
export function CourseCard({ course, index = 0 }: CourseCardProps) {
  const { getCourseProgress } = useStore()
  const progress = getCourseProgress(course.id)
  const colorClasses = courseColorClasses[course.color]
  const Icon = course.icon
  
  const completedModules = progress.completedModules.length
  const totalModules = course.modules.length
  const isComplete = completedModules === totalModules
  const progressPercent = totalModules > 0 ? (completedModules / totalModules) * 100 : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link
        to={getCourseUrl(course.id)}
        className={`
          glass-card block group hover:border-white/20 transition-all duration-300
          ${isComplete ? 'ring-1 ring-accent-emerald/30' : ''}
        `}
      >
        {/* Header with icon and completion status */}
        <div className="flex items-start justify-between mb-4">
          <div className={`
            w-14 h-14 rounded-xl flex items-center justify-center
            bg-gradient-to-br ${colorClasses.gradient}
          `}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          {isComplete && (
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-accent-emerald/20">
              <Check className="w-3.5 h-3.5 text-accent-emerald" />
              <span className="text-xs font-medium text-accent-emerald">Complete</span>
            </div>
          )}
        </div>

        {/* Title and subtitle */}
        <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-flow-400 transition-colors">
          {course.title}
        </h3>
        <p className="text-sm text-flow-400 mb-3">{course.subtitle}</p>
        
        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* Meta info */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{course.estimatedTime}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5" />
            <span className={difficultyColors[course.difficulty]}>
              {difficultyLabels[course.difficulty]}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>{totalModules} modules</span>
          </div>
        </div>

        {/* Progress bar */}
        {completedModules > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-gray-400">Progress</span>
              <span className="text-gray-400">{completedModules}/{totalModules}</span>
            </div>
            <div className="h-1.5 bg-void-700 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full bg-gradient-to-r ${colorClasses.gradient} transition-all duration-500`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="flex items-center gap-2 text-sm text-gray-500 group-hover:text-flow-400 transition-colors">
          <span>
            {isComplete ? 'Review course' : completedModules > 0 ? 'Continue learning' : 'Start course'}
          </span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </motion.div>
  )
}

