import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { PlaygroundPage } from './pages/PlaygroundPage'
import { NotFoundPage } from './pages/NotFoundPage'

// Courses pages
import { CoursesPage } from './pages/CoursesPage'
import {
  FoundationsCoursePage,
  IntroductionModule,
  BuildingBlocksModule,
  MakingPredictionsModule,
  MeasuringMistakesModule,
  FindingWhatToFixModule,
  MakingAdjustmentsModule,
  PuttingItTogetherModule,
} from './pages/courses/foundations'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="playground" element={<PlaygroundPage />} />
        
        {/* Courses routes */}
        <Route path="courses" element={<CoursesPage />} />
        
        {/* Foundations course */}
        <Route path="courses/foundations" element={<FoundationsCoursePage />} />
        <Route path="courses/foundations/introduction" element={<IntroductionModule />} />
        <Route path="courses/foundations/building-blocks" element={<BuildingBlocksModule />} />
        <Route path="courses/foundations/making-predictions" element={<MakingPredictionsModule />} />
        <Route path="courses/foundations/measuring-mistakes" element={<MeasuringMistakesModule />} />
        <Route path="courses/foundations/finding-what-to-fix" element={<FindingWhatToFixModule />} />
        <Route path="courses/foundations/making-adjustments" element={<MakingAdjustmentsModule />} />
        <Route path="courses/foundations/putting-it-together" element={<PuttingItTogetherModule />} />
        
        {/* Legacy /learn routes - redirect to new /courses structure */}
        <Route path="learn" element={<Navigate to="/courses/foundations" replace />} />
        <Route path="learn/introduction" element={<Navigate to="/courses/foundations/introduction" replace />} />
        <Route path="learn/building-blocks" element={<Navigate to="/courses/foundations/building-blocks" replace />} />
        <Route path="learn/making-predictions" element={<Navigate to="/courses/foundations/making-predictions" replace />} />
        <Route path="learn/measuring-mistakes" element={<Navigate to="/courses/foundations/measuring-mistakes" replace />} />
        <Route path="learn/finding-what-to-fix" element={<Navigate to="/courses/foundations/finding-what-to-fix" replace />} />
        <Route path="learn/making-adjustments" element={<Navigate to="/courses/foundations/making-adjustments" replace />} />
        <Route path="learn/putting-it-together" element={<Navigate to="/courses/foundations/putting-it-together" replace />} />
        
        {/* Catch-all route for 404 pages */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
