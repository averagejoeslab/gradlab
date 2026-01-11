import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { PlaygroundPage } from './pages/PlaygroundPage'
import { LearnPage } from './pages/LearnPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { IntroductionModule } from './pages/learn/IntroductionModule'
import { BuildingBlocksModule } from './pages/learn/BuildingBlocksModule'
import { MakingPredictionsModule } from './pages/learn/MakingPredictionsModule'
import { MeasuringMistakesModule } from './pages/learn/MeasuringMistakesModule'
import { FindingWhatToFixModule } from './pages/learn/FindingWhatToFixModule'
import { MakingAdjustmentsModule } from './pages/learn/MakingAdjustmentsModule'
import { PuttingItTogetherModule } from './pages/learn/PuttingItTogetherModule'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="playground" element={<PlaygroundPage />} />
        <Route path="learn" element={<LearnPage />} />
        <Route path="learn/introduction" element={<IntroductionModule />} />
        <Route path="learn/building-blocks" element={<BuildingBlocksModule />} />
        <Route path="learn/making-predictions" element={<MakingPredictionsModule />} />
        <Route path="learn/measuring-mistakes" element={<MeasuringMistakesModule />} />
        <Route path="learn/finding-what-to-fix" element={<FindingWhatToFixModule />} />
        <Route path="learn/making-adjustments" element={<MakingAdjustmentsModule />} />
        <Route path="learn/putting-it-together" element={<PuttingItTogetherModule />} />
        {/* Catch-all route for 404 pages */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
