# GradLab: Neural Network Foundations
## Course Study Guide & Learning Objectives

**Version:** 1.0  
**Estimated Time:** 2-3 hours  
**Prerequisites:** Basic arithmetic (addition, multiplication)  
**Difficulty Level:** Beginner

---

## Course Description

This course provides foundational knowledge of neural network architecture, operation, and training methodology. Upon completion, learners will understand the core components, mathematical operations, and optimization processes that enable neural networks to learn from data.

---

## Domain Breakdown

| Domain | Weight | Modules |
|--------|--------|---------|
| 1.0 Core Concepts | 15% | 1 |
| 2.0 Neural Network Architecture | 25% | 2, 3, 4 |
| 3.0 Forward Propagation | 15% | 5 |
| 4.0 Loss Computation | 15% | 6 |
| 5.0 Backward Propagation | 15% | 7 |
| 6.0 Optimization | 10% | 8 |
| 7.0 Training Process | 5% | 9 |

---

## 1.0 Core Concepts

### 1.1 Define neural networks and their purpose
- 1.1.1 Explain what a neural network is
- 1.1.2 Describe pattern recognition through example-based learning
- 1.1.3 Differentiate between explicit programming and learned behavior
- 1.1.4 Identify common applications of neural networks

### 1.2 Describe the supervised learning paradigm
- 1.2.1 Explain the role of labeled training data
- 1.2.2 Describe the input-output mapping process
- 1.2.3 Explain iterative improvement through feedback

### 1.3 Identify the five stages of neural network learning
- 1.3.1 Make a prediction (forward pass)
- 1.3.2 Measure the error (loss computation)
- 1.3.3 Determine responsibility (backpropagation)
- 1.3.4 Update parameters (optimization)
- 1.3.5 Iterate (training loop)

#### Key Terms
- Neural network
- Pattern recognition
- Supervised learning
- Training data
- Prediction

---

## 2.0 Neural Network Architecture

### 2.1 Describe the biological inspiration for artificial neurons
- 2.1.1 Identify the three functional components of biological neurons
  - Dendrites (signal reception)
  - Cell body (signal processing)
  - Axon (signal transmission)
- 2.1.2 Explain the abstraction from biological to artificial neurons

### 2.2 Identify and describe neuron components
- 2.2.1 **Inputs (x)**: Define input signals and their representation
- 2.2.2 **Weights (w)**: Explain weight parameters and their function
- 2.2.3 **Bias (b)**: Describe bias terms and their purpose
- 2.2.4 **Output (y)**: Define neuron output and activation

### 2.3 Explain the neuron computation process
- 2.3.1 Compute weighted sum: Σ(xᵢ × wᵢ)
- 2.3.2 Apply bias term: Σ(xᵢ × wᵢ) + b
- 2.3.3 Apply activation function

### 2.4 Describe activation functions
- 2.4.1 Explain the purpose of non-linear activation
- 2.4.2 Define ReLU (Rectified Linear Unit)
  - f(x) = max(0, x)
  - Negative inputs → 0
  - Positive inputs → unchanged
- 2.4.3 Explain why activation functions enable complex pattern learning

### 2.5 Define network topology
- 2.5.1 **Layer**: Group of neurons processing in parallel
- 2.5.2 **Input layer**: Entry point for data
- 2.5.3 **Hidden layer(s)**: Intermediate processing layers
- 2.5.4 **Output layer**: Final prediction layer
- 2.5.5 **MLP (Multi-Layer Perceptron)**: Fully connected feedforward network

### 2.6 Explain the role of learnable parameters
- 2.6.1 Identify weights and biases as learnable parameters
- 2.6.2 Describe random initialization
- 2.6.3 Explain parameter adjustment through training

#### Key Terms
- Artificial neuron
- Weight
- Bias
- Weighted sum
- Activation function
- ReLU
- Layer
- Hidden layer
- MLP (Multi-Layer Perceptron)
- Parameters

#### Formulas
```
Neuron output (pre-activation): z = Σ(xᵢ × wᵢ) + b
Neuron output (post-activation): y = ReLU(z) = max(0, z)
```

---

## 3.0 Forward Propagation

### 3.1 Define the forward pass
- 3.1.1 Describe data flow direction (input → output)
- 3.1.2 Explain sequential layer computation
- 3.1.3 Identify the forward pass as inference/prediction

### 3.2 Describe layer-wise computation
- 3.2.1 Explain how layers receive input from previous layer
- 3.2.2 Describe parallel neuron computation within a layer
- 3.2.3 Explain output propagation to subsequent layers

### 3.3 Explain hierarchical feature extraction
- 3.3.1 Early layers: Simple/low-level patterns
- 3.3.2 Deep layers: Complex/high-level patterns
- 3.3.3 Output layer: Final decision/prediction

### 3.4 Identify forward pass limitations
- 3.4.1 Explain that untrained networks produce incorrect predictions
- 3.4.2 Recognize the need for parameter optimization

#### Key Terms
- Forward pass
- Forward propagation
- Inference
- Feature extraction
- Prediction

---

## 4.0 Loss Computation

### 4.1 Define loss and its purpose
- 4.1.1 Explain loss as a measure of prediction error
- 4.1.2 Describe the relationship: low loss = good predictions
- 4.1.3 Identify loss minimization as the training objective

### 4.2 Describe loss function components
- 4.2.1 **Prediction**: Network output
- 4.2.2 **Target/Ground truth**: Correct answer
- 4.2.3 **Error**: Difference between prediction and target

### 4.3 Calculate squared error loss
- 4.3.1 Compute difference: (prediction - target)
- 4.3.2 Square the difference: (prediction - target)²
- 4.3.3 Explain properties of squared error
  - Always non-negative
  - Zero when prediction equals target
  - Larger penalties for larger errors

### 4.4 Describe the loss landscape
- 4.4.1 Conceptualize loss as a function of weights
- 4.4.2 Identify minima as optimal weight configurations
- 4.4.3 Explain the goal of finding the minimum

#### Key Terms
- Loss
- Loss function
- Error
- Target
- Ground truth
- Squared error
- Mean Squared Error (MSE)
- Loss landscape
- Minimum

#### Formulas
```
Squared Error Loss: L = (ŷ - y)²
Where: ŷ = prediction, y = target
```

---

## 5.0 Backward Propagation

### 5.1 Define the gradient
- 5.1.1 Explain gradient as sensitivity measure
- 5.1.2 Describe gradient as partial derivative of loss with respect to weight
- 5.1.3 Interpret gradient magnitude (large = high sensitivity)
- 5.1.4 Interpret gradient sign (positive = increase weight increases loss)

### 5.2 Explain the chain rule concept
- 5.2.1 Describe compositional function structure
- 5.2.2 Explain how changes propagate through operations
- 5.2.3 Demonstrate gradient flow through multiplication

### 5.3 Define backpropagation
- 5.3.1 Describe backward flow from loss to inputs
- 5.3.2 Explain gradient computation for each parameter
- 5.3.3 Identify computational efficiency of backpropagation

### 5.4 Interpret gradient information
- 5.4.1 Determine which weights have the largest effect
- 5.4.2 Determine direction to adjust each weight
- 5.4.3 Determine relative magnitude of adjustment

#### Key Terms
- Gradient
- Partial derivative
- Sensitivity
- Chain rule
- Backpropagation
- Backward pass

#### Conceptual Formula
```
Gradient of weight w: ∂L/∂w
Interpretation: How much loss changes when w changes by a small amount
```

---

## 6.0 Optimization

### 6.1 Define gradient descent
- 6.1.1 Explain gradient descent as iterative optimization
- 6.1.2 Describe movement in opposite direction of gradient
- 6.1.3 Explain convergence toward minimum loss

### 6.2 Describe the weight update rule
- 6.2.1 State the update formula: w_new = w_old - (η × gradient)
- 6.2.2 Explain subtraction (move opposite to gradient)
- 6.2.3 Describe simultaneous update of all parameters

### 6.3 Define and configure the learning rate
- 6.3.1 Explain learning rate (η) as step size
- 6.3.2 Identify consequences of high learning rate
  - Overshooting
  - Oscillation
  - Divergence
- 6.3.3 Identify consequences of low learning rate
  - Slow convergence
  - Increased training time
- 6.3.4 Describe optimal learning rate selection

### 6.4 Describe a single optimization step
- 6.4.1 Compute gradients via backpropagation
- 6.4.2 Apply update rule to all weights
- 6.4.3 Verify loss reduction

#### Key Terms
- Gradient descent
- Optimization
- Learning rate (η)
- Step size
- Convergence
- Update rule

#### Formulas
```
Weight Update: w_new = w_old - η × (∂L/∂w)
Where: η = learning rate
```

---

## 7.0 Training Process

### 7.1 Define the training loop
- 7.1.1 Enumerate training loop steps:
  1. Forward pass (compute prediction)
  2. Loss computation (measure error)
  3. Backward pass (compute gradients)
  4. Parameter update (gradient descent)
  5. Repeat
- 7.1.2 Explain iterative refinement

### 7.2 Define training terminology
- 7.2.1 **Iteration/Step**: Single forward-backward-update cycle
- 7.2.2 **Epoch**: Complete pass through entire training dataset
- 7.2.3 **Training set**: Data used for parameter optimization

### 7.3 Describe training dynamics
- 7.3.1 Explain loss decrease over training
- 7.3.2 Describe prediction improvement over epochs
- 7.3.3 Identify convergence indicators

### 7.4 Summarize end-to-end training flow
- 7.4.1 Data → Network → Prediction → Loss → Gradients → Updates → Repeat
- 7.4.2 Explain transformation from random to trained parameters

#### Key Terms
- Training loop
- Iteration
- Step
- Epoch
- Training set
- Convergence

---

## Glossary of Terms

| Term | Definition |
|------|------------|
| **Activation Function** | Non-linear function applied to neuron output to enable complex pattern learning |
| **Backpropagation** | Algorithm for computing gradients by propagating error backward through the network |
| **Bias** | Learnable parameter added to weighted sum, allows shifting activation threshold |
| **Epoch** | One complete pass through all training examples |
| **Forward Pass** | Process of computing network output from input data |
| **Gradient** | Measure of how much loss changes when a parameter changes; direction of steepest ascent |
| **Gradient Descent** | Optimization algorithm that adjusts parameters in direction opposite to gradient |
| **Hidden Layer** | Network layer between input and output layers |
| **Layer** | Group of neurons that process inputs in parallel |
| **Learning Rate** | Hyperparameter controlling the magnitude of parameter updates |
| **Loss** | Scalar value measuring prediction error |
| **Loss Function** | Mathematical function that computes loss from prediction and target |
| **MLP** | Multi-Layer Perceptron; fully-connected feedforward neural network |
| **Neuron** | Basic computational unit; computes weighted sum of inputs plus bias, then applies activation |
| **Parameter** | Learnable value in the network (weights and biases) |
| **Prediction** | Network output for a given input |
| **ReLU** | Rectified Linear Unit; activation function: f(x) = max(0, x) |
| **Target** | Correct/expected output for a given input |
| **Training** | Process of adjusting parameters to minimize loss |
| **Weight** | Learnable parameter that scales an input's contribution |

---

## Formula Reference Sheet

### Neuron Computation
```
Pre-activation:    z = Σᵢ(xᵢ × wᵢ) + b
Post-activation:   y = activation(z)
ReLU activation:   ReLU(z) = max(0, z)
```

### Loss Functions
```
Squared Error:     L = (ŷ - y)²
```

### Optimization
```
Weight Update:     w ← w - η × (∂L/∂w)
```

### Gradient Interpretation
```
∂L/∂w > 0  →  Decrease w to reduce loss
∂L/∂w < 0  →  Increase w to reduce loss
∂L/∂w = 0  →  w at local optimum
```

---

## Learning Objectives Checklist

Upon completion of this course, learners should be able to:

- [ ] Define a neural network and explain its purpose
- [ ] Identify and describe the components of an artificial neuron
- [ ] Calculate neuron output given inputs, weights, and bias
- [ ] Apply ReLU activation function
- [ ] Distinguish between input, hidden, and output layers
- [ ] Define MLP architecture
- [ ] Trace data flow through a network (forward pass)
- [ ] Calculate squared error loss
- [ ] Explain the concept of a gradient
- [ ] Describe the backpropagation algorithm at a conceptual level
- [ ] Apply the gradient descent update rule
- [ ] Explain the role of learning rate
- [ ] Enumerate the steps of the training loop
- [ ] Define epoch and iteration

---

*Course Version: 1.0 | Last Updated: January 2026*

