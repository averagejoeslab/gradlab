import { foundationsCourse } from '../../../data/courses'
import { CourseOverview } from '../../../components/courses'

/**
 * FoundationsCoursePage - The overview page for the Neural Network Foundations course.
 * 
 * URL: /courses/foundations
 */
export function FoundationsCoursePage() {
  return <CourseOverview course={foundationsCourse} />
}

