# Micrograd Modularization Plan

This document outlines the planned evolution of the micrograd package structure as new features are added.

## Current Structure

```
micrograd/
├── __init__.py      # Package exports
├── engine.py        # Value class (autograd engine)
└── nn.py            # Module, Neuron, Layer, MLP
```

## Planned Modularization

### Phase 1: Activation Functions → `activations.py`

**Trigger:** When 3+ activation functions exist

**Extract from:** `engine.py` (currently only `relu`)

**New file contents:**
- `relu(x)`
- `tanh(x)`
- `sigmoid(x)`
- `leaky_relu(x, alpha=0.01)`
- `softmax(x)` (if applicable)

**Implementation notes:**
- Activations should be standalone functions that take a `Value` and return a `Value`
- Each must define its own `_backward` closure
- Update `Neuron` in `nn.py` to use activations from this module

---

### Phase 2: Loss Functions → `losses.py`

**Trigger:** When loss functions are needed for training examples

**New file contents:**
- `mse_loss(predictions, targets)` — Mean Squared Error
- `cross_entropy_loss(predictions, targets)` — For classification
- `binary_cross_entropy(predictions, targets)` — For binary classification
- `hinge_loss(predictions, targets)` — SVM-style loss

**Implementation notes:**
- Each loss should return a single `Value` that can be backpropagated
- Consider adding reduction options (`mean`, `sum`)

---

### Phase 3: Optimizers → `optim.py`

**Trigger:** When training loops need configurable optimization

**New file contents:**
- `SGD` — Stochastic Gradient Descent
- `Adam` — Adaptive Moment Estimation
- `RMSprop` — Root Mean Square Propagation

**Implementation notes:**
- Base `Optimizer` class with `step()` and `zero_grad()` methods
- Each optimizer takes `parameters()` from a `Module`
- Store optimizer state (momentum, etc.) per-parameter

**Example API:**
```python
optimizer = SGD(model.parameters(), lr=0.01, momentum=0.9)
optimizer.zero_grad()
loss.backward()
optimizer.step()
```

---

### Phase 4: Visualization → `viz.py`

**Trigger:** When graph visualization is needed beyond notebooks

**New file contents:**
- `draw_graph(root)` — Render computation graph using graphviz
- `plot_training(losses)` — Plot loss curve over epochs

**Implementation notes:**
- Keep graphviz as optional dependency
- Return graphviz `Digraph` object for flexibility

---

## Future Structure

```
micrograd/
├── __init__.py      # Package exports
├── engine.py        # Value class (core autograd)
├── nn.py            # Module, Neuron, Layer, MLP
├── activations.py   # Activation functions
├── losses.py        # Loss functions
├── optim.py         # Optimizers
└── viz.py           # Visualization utilities
```

## Updated `__init__.py` (Future)

```python
from micrograd.engine import Value
from micrograd.nn import Module, Neuron, Layer, MLP
from micrograd.activations import relu, tanh, sigmoid
from micrograd.losses import mse_loss, cross_entropy_loss
from micrograd.optim import SGD, Adam
```

## Guiding Principles

1. **Don't split prematurely** — Only create new files when the trigger conditions are met
2. **Maintain backwards compatibility** — Existing imports should continue to work
3. **Keep it educational** — Micrograd's value is clarity; don't over-engineer
4. **Single responsibility** — Each file should have one clear purpose

