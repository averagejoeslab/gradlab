
export class Value {
  /** stores a single scalar value and its gradient */

  data: number;
  grad: number;
  _backward: () => void;
  _prev: Set<Value>;
  _op: string;

  constructor(data: number, _children: Value[] = [], _op: string = '') {
    this.data = data;
    this.grad = 0;
    // internal variables used for autograd graph construction
    this._backward = () => {};
    this._prev = new Set(_children);
    this._op = _op; // the op that produced this node, for graphviz / debugging / etc
  }

  toString(): string {
    return `Value(data=${this.data}, grad=${this.grad})`;
  }

  // core operations (define new graph nodes with custom backward)

  add(other: Value | number): Value {
    const otherValue = other instanceof Value ? other : new Value(other);
    const out = new Value(this.data + otherValue.data, [this, otherValue], '+');

    out._backward = () => {
      this.grad += out.grad;
      otherValue.grad += out.grad;
    };

    return out;
  }

  mul(other: Value | number): Value {
    const otherValue = other instanceof Value ? other : new Value(other);
    const out = new Value(this.data * otherValue.data, [this, otherValue], '*');

    out._backward = () => {
      this.grad += otherValue.data * out.grad;
      otherValue.grad += this.data * out.grad;
    };

    return out;
  }

  pow(n: number): Value {
    if (typeof n !== 'number') {
      throw new Error('only supporting int/float powers for now');
    }
    const out = new Value(this.data ** n, [this], `**${n}`);

    out._backward = () => {
      this.grad += (n * this.data ** (n - 1)) * out.grad;
    };

    return out;
  }

  // derived operations (reuse core ops, no new backward needed)

  neg(): Value {
    return this.mul(-1);
  }

  sub(other: Value | number): Value {
    const otherValue = other instanceof Value ? other : new Value(other);
    return this.add(otherValue.neg());
  }

  div(other: Value | number): Value {
    const otherValue = other instanceof Value ? other : new Value(other);
    return this.mul(otherValue.pow(-1));
  }

  // activation functions

  relu(): Value {
    const out = new Value(this.data < 0 ? 0 : this.data, [this], 'ReLU');

    out._backward = () => {
      this.grad += (out.data > 0 ? 1 : 0) * out.grad;
    };

    return out;
  }

  // backpropagation

  backward(): void {
    // topological order all of the children in the graph
    const topo: Value[] = [];
    const visited = new Set<Value>();

    const buildTopo = (v: Value): void => {
      if (!visited.has(v)) {
        visited.add(v);
        for (const child of v._prev) {
          buildTopo(child);
        }
        topo.push(v);
      }
    };

    buildTopo(this);

    // go one variable at a time and apply the chain rule to get its gradient
    this.grad = 1;
    for (const v of [...topo].reverse()) {
      v._backward();
    }
  }
}

