import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { PlaygroundPage } from './pages/PlaygroundPage'
import { LearnPage } from './pages/LearnPage'
import { ValuesModule } from './pages/learn/ValuesModule'
import { OperationsModule } from './pages/learn/OperationsModule'
import { GradientsModule } from './pages/learn/GradientsModule'
import { NeuronModule } from './pages/learn/NeuronModule'
import { NetworkModule } from './pages/learn/NetworkModule'
import { TrainingModule } from './pages/learn/TrainingModule'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="playground" element={<PlaygroundPage />} />
        <Route path="learn" element={<LearnPage />} />
        <Route path="learn/values" element={<ValuesModule />} />
        <Route path="learn/operations" element={<OperationsModule />} />
        <Route path="learn/gradients" element={<GradientsModule />} />
        <Route path="learn/neuron" element={<NeuronModule />} />
        <Route path="learn/network" element={<NetworkModule />} />
        <Route path="learn/training" element={<TrainingModule />} />
      </Route>
    </Routes>
  )
}

