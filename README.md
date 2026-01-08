# Micrograd Playground

An interactive web application for understanding neural networks — no coding required. Built on a TypeScript port of [Andrej Karpathy's micrograd](https://github.com/karpathy/micrograd).

![Micrograd Playground](https://img.shields.io/badge/Learn-Neural_Networks-blue?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

## ✨ Features

### 🎓 Learning Journey
Six progressive modules that take you from zero to understanding neural networks:

| Module | Concept | What You'll Learn |
|--------|---------|-------------------|
| **Values** | Everything is a number | How neural networks represent information |
| **Operations** | Numbers combine | Building computation graphs |
| **Gradients** | Sensitivity | How backpropagation works |
| **Neuron** | Weighted sum + activation | The building block of neural networks |
| **Networks** | Layers of neurons | How complex patterns emerge |
| **Training** | Learning from mistakes | Gradient descent in action |

### 🎨 Interactive Playground

- **Computation Graph Canvas** — Drag and drop values, connect with operations, watch gradients flow backward
- **Neuron Visualizer** — Adjust weights and biases with sliders, see real-time output changes
- **Training Arena** — Train a network on 2D data, watch the decision boundary evolve live

### 🎚️ Interactivity Levels

Choose your learning style:
- **Guided** — Step-by-step tutorials with hints
- **Explorer** — Learn at your own pace with tips
- **Sandbox** — Full freedom to experiment

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/micrograd-playground.git
cd micrograd-playground

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗️ Project Structure

```
src/
├── core/                 # TypeScript port of micrograd
│   ├── engine.ts         # Value class with autograd
│   └── nn.ts             # Module, Neuron, Layer, MLP
├── components/
│   ├── graph/            # Computation graph visualization
│   ├── neuron/           # Neuron builder UI
│   └── training/         # Training arena
├── pages/
│   ├── HomePage.tsx      # Landing page
│   ├── LearnPage.tsx     # Module selection
│   ├── PlaygroundPage.tsx
│   └── learn/            # Individual learning modules
└── store/                # State management
```

## 🧠 The Core Engine

The `src/core/` directory contains a faithful TypeScript reimplementation of micrograd (~150 lines). It supports:

- Automatic differentiation (autograd)
- Basic operations: `add`, `mul`, `pow`, `relu`
- Neural network primitives: `Neuron`, `Layer`, `MLP`
- Backpropagation via `.backward()`

```typescript
import { Value, MLP } from './core'

// Build a computation graph
const a = new Value(2.0)
const b = new Value(3.0)
const c = a.mul(b).add(new Value(1.0))

// Backpropagate
c.backward()

console.log(a.grad) // 3.0 (dc/da = b)
console.log(b.grad) // 2.0 (dc/db = a)

// Create a neural network
const model = new MLP(2, [4, 4, 1])
```

## 🛠️ Tech Stack

- **React 18** — UI framework
- **TypeScript** — Type safety
- **Vite** — Fast development and builds
- **Tailwind CSS** — Styling
- **Framer Motion** — Animations
- **React Flow** — Graph visualization
- **Zustand** — State management

## 🙏 Acknowledgments

This project is a derivative work based on [micrograd](https://github.com/karpathy/micrograd) by [Andrej Karpathy](https://karpathy.ai/). Micrograd is a tiny autograd engine that implements backpropagation for building and training neural networks.

The original micrograd demonstrates that the core of deep learning — automatic differentiation and neural networks — can be implemented in remarkably few lines of code. This project extends that educational mission by making it accessible to people who don't code.

**Original micrograd repository:** [https://github.com/karpathy/micrograd](https://github.com/karpathy/micrograd)

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

This project is a derivative work of [micrograd](https://github.com/karpathy/micrograd) (MIT License, Copyright (c) 2020 Andrej Karpathy).
