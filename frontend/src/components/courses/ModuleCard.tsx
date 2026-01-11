import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Clock, Lock } from 'lucide-react'
import { ModuleDefinition, moduleColorClasses, getModuleUrl } from '../../data/courses'

interface ModuleCardProps {
  module: ModuleDefinition
  courseId: string
  index: number
  isCompleted: boolean
  isLocked?: boolean
}

/**
 * ModuleCard - Displays a module within a course overview page.
 * 
 * Shows module info, completion status, and links to the module.
 * Can be locked (for sequential course progression if desired).
 */
export function ModuleCard({ module, courseId, index, isCompleted, isLocked = false }: ModuleCardProps) {
  const colorClass = moduleColorClasses[module.color]
  const Icon = module.icon

  const content = (
    <div className="flex items-start gap-4">
      {/* Module number / status indicator */}
      <div className={`
        w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
        ${isCompleted 
          ? 'bg-accent-emerald text-void-950' 
          : isLocked 
            ? 'bg-void-700 text-gray-500'
            : 'bg-void-700 text-gray-300'
        }
      `}>
        {isCompleted ? (
          <Check className="w-5 h-5" />
        ) : isLocked ? (
          <Lock className="w-4 h-4" />
        ) : (
          <span className="text-sm font-medium">{index + 1}</span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1">
          <div className={`
            w-8 h-8 rounded-lg flex items-center justify-center
            bg-gradient-to-br ${colorClass}
          `}>
            <Icon className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className={`
              font-semibold transition-colors
              ${isLocked ? 'text-gray-500' : 'text-white group-hover:text-flow-400'}
            `}>
              {module.title}
            </h3>
            <p className={`text-sm ${isLocked ? 'text-gray-600' : 'text-gray-400'}`}>
              {module.subtitle}
            </p>
          </div>
        </div>
        
        <p className={`text-sm mt-2 ${isLocked ? 'text-gray-600' : 'text-gray-400'}`}>
          {module.description}
        </p>

        {/* Meta and CTA */}
        <div className="flex items-center justify-between mt-3">
          {module.estimatedTime && (
            <div className={`flex items-center gap-1.5 text-xs ${isLocked ? 'text-gray-600' : 'text-gray-500'}`}>
              <Clock className="w-3.5 h-3.5" />
              <span>{module.estimatedTime}</span>
            </div>
          )}
          
          {!isLocked && (
            <div className="flex items-center gap-1.5 text-sm text-gray-500 group-hover:text-flow-400 transition-colors">
              <span>{isCompleted ? 'Review' : 'Start'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          )}
        </div>
      </div>
    </div>
  )

  if (isLocked) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        className="glass-card opacity-60 cursor-not-allowed"
      >
        {content}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        to={getModuleUrl(courseId, module.id)}
        className={`
          glass-card block group hover:border-white/20 transition-all duration-300
          ${isCompleted ? 'border-accent-emerald/20' : ''}
        `}
      >
        {content}
      </Link>
    </motion.div>
  )
}

