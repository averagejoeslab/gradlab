import { BookOpen, RefreshCw } from 'lucide-react'
import { ModuleShell, StepContent } from '../../../components/learn'

export function IntroductionModule() {
  return (
    <ModuleShell
      courseId="foundations"
      title="Introduction"
      subtitle="What is a neural network?"
      moduleId="introduction"
      totalSteps={7}
      progressColor="flow"
    >
      <StepContent step={0}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          What you'll learn
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed text-lg">
          By the end of this introduction, you'll understand:
        </p>
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-void-800/30">
            <div className="w-6 h-6 rounded-full bg-flow-600/30 flex items-center justify-center text-flow-400 text-sm">✓</div>
            <span className="text-gray-300">What a neural network actually is (in simple terms)</span>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-void-800/30">
            <div className="w-6 h-6 rounded-full bg-flow-600/30 flex items-center justify-center text-flow-400 text-sm">✓</div>
            <span className="text-gray-300">What it does and why it's useful</span>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-void-800/30">
            <div className="w-6 h-6 rounded-full bg-flow-600/30 flex items-center justify-center text-flow-400 text-sm">✓</div>
            <span className="text-gray-300">How it learns (you already understand this intuitively!)</span>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-void-800/30">
            <div className="w-6 h-6 rounded-full bg-flow-600/30 flex items-center justify-center text-flow-400 text-sm">✓</div>
            <span className="text-gray-300">The step-by-step process a neural network follows to learn</span>
          </div>
        </div>
        <div className="bg-void-800 rounded-xl p-6 border-l-4 border-flow-500">
          <p className="text-gray-300">
            <strong className="text-white">No math or coding knowledge required.</strong> If you can add and multiply, 
            you have everything you need.
          </p>
        </div>
      </StepContent>

      <StepContent step={1}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          What is a neural network?
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed text-lg">
          A <strong className="text-flow-400">neural network</strong> is a system that learns patterns from examples.
        </p>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Instead of being told exactly what to do step by step, a neural network is shown 
          many examples and figures out the patterns on its own.
        </p>
        <div className="bg-void-800 rounded-xl p-6 border-l-4 border-flow-500">
          <p className="text-gray-300">
            <strong className="text-white">That's it.</strong> At its core, a neural network is just a pattern-learning machine. 
            Show it enough examples <em>along with the right answers</em>, and it learns to recognize what's important.
          </p>
        </div>
      </StepContent>

      <StepContent step={2}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          What does a neural network do?
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          A neural network takes <strong className="text-flow-400">inputs</strong> (information you give it) 
          and produces <strong className="text-grad-400">outputs</strong> (answers or predictions).
        </p>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-flow-600/10 border border-flow-500/30 text-center">
            <div className="text-sm text-gray-500 mb-2">Input</div>
            <div className="text-white font-medium">A photo</div>
          </div>
          <div className="p-4 rounded-xl bg-void-800/50 text-center">
            <div className="text-sm text-gray-500 mb-2">Neural Network</div>
            <div className="text-white font-medium">→ learns patterns →</div>
          </div>
          <div className="p-4 rounded-xl bg-grad-600/10 border border-grad-500/30 text-center">
            <div className="text-sm text-gray-500 mb-2">Output</div>
            <div className="text-white font-medium">"It's a dog"</div>
          </div>
        </div>
        <p className="text-gray-300 leading-relaxed">
          The magic is that <strong className="text-white">you don't tell it how</strong> to recognize a dog. 
          You just show it thousands of pictures <em>labeled as "dog"</em>, and it figures out the patterns itself.
        </p>
      </StepContent>

      <StepContent step={3}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          Think about teaching a toddler
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          This is exactly how you'd teach a child what a dog is.
        </p>
        <p className="text-gray-300 mb-6 leading-relaxed">
          You don't start by listing features: <em>"A dog has four legs, fur, a tail, and barks."</em>
          <br />
          Instead, you just <strong className="text-white">show them dogs</strong>.
        </p>
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-void-800/50">
            <div className="text-2xl">🐕</div>
            <div className="text-gray-300">You point: <em>"Dog."</em></div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-void-800/50">
            <div className="text-2xl">🐩</div>
            <div className="text-gray-300">Different dog: <em>"Dog."</em></div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-void-800/50">
            <div className="text-2xl">🐕‍🦺</div>
            <div className="text-gray-300">Another one: <em>"Dog."</em></div>
          </div>
        </div>
        <p className="text-gray-300 leading-relaxed">
          Each time, you're <strong className="text-accent-emerald">training</strong> them — 
          they're learning the pattern of "dog-ness" without you ever explaining it explicitly.
        </p>
      </StepContent>

      <StepContent step={4}>
        <h2 className="text-2xl font-semibold text-white mb-6">
          Learning from mistakes
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Now here's the important part. What happens when they get it wrong?
        </p>
        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-void-800/50">
            <div className="text-2xl">🐱</div>
            <div>
              <div className="text-gray-300">Child points at a cat: <em>"Dog!"</em></div>
              <div className="text-accent-rose mt-1">✗ Wrong</div>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-xl bg-accent-emerald/10 border border-accent-emerald/30">
            <div className="text-2xl">👆</div>
            <div>
              <div className="text-gray-300">You correct them: <em>"No, that's a cat."</em></div>
              <div className="text-accent-emerald mt-1">They adjust their understanding</div>
            </div>
          </div>
        </div>
        <p className="text-gray-300 mb-6 leading-relaxed">
          This is <strong className="text-white">exactly</strong> how neural networks learn:
        </p>
        <div className="bg-void-800 rounded-xl p-6">
          <ol className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-flow-600/30 text-flow-400 flex items-center justify-center text-sm font-medium shrink-0">1</span>
              <span>They make a prediction</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-accent-rose/30 text-accent-rose flex items-center justify-center text-sm font-medium shrink-0">2</span>
              <span>They're told how wrong they were</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-accent-emerald/30 text-accent-emerald flex items-center justify-center text-sm font-medium shrink-0">3</span>
              <span>They adjust to do better next time</span>
            </li>
          </ol>
        </div>
      </StepContent>

      <StepContent step={5}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-accent-violet/20 flex items-center justify-center">
            <RefreshCw className="w-6 h-6 text-accent-violet" />
          </div>
          <h2 className="text-2xl font-semibold text-white">
            The learning process
          </h2>
        </div>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Every time a neural network learns, it follows the same simple loop:
        </p>
        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-flow-600/10 border border-flow-500/30">
            <div className="w-8 h-8 rounded-full bg-flow-600/30 flex items-center justify-center text-flow-400 font-medium shrink-0">1</div>
            <div>
              <div className="font-medium text-white">Make a prediction</div>
              <div className="text-sm text-gray-400">Take the input, process it, and guess an answer</div>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-xl bg-accent-rose/10 border border-accent-rose/30">
            <div className="w-8 h-8 rounded-full bg-accent-rose/30 flex items-center justify-center text-accent-rose font-medium shrink-0">2</div>
            <div>
              <div className="font-medium text-white">Measure the mistake</div>
              <div className="text-sm text-gray-400">Compare the guess to the right answer — how wrong were we?</div>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-xl bg-grad-600/10 border border-grad-500/30">
            <div className="w-8 h-8 rounded-full bg-grad-600/30 flex items-center justify-center text-grad-400 font-medium shrink-0">3</div>
            <div>
              <div className="font-medium text-white">Find what to fix</div>
              <div className="text-sm text-gray-400">Figure out which parts of the thinking led to the mistake</div>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-xl bg-accent-emerald/10 border border-accent-emerald/30">
            <div className="w-8 h-8 rounded-full bg-accent-emerald/30 flex items-center justify-center text-accent-emerald font-medium shrink-0">4</div>
            <div>
              <div className="font-medium text-white">Make adjustments</div>
              <div className="text-sm text-gray-400">Tweak the network so it does better next time</div>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-xl bg-accent-violet/10 border border-accent-violet/30">
            <div className="w-8 h-8 rounded-full bg-accent-violet/30 flex items-center justify-center text-accent-violet font-medium shrink-0">5</div>
            <div>
              <div className="font-medium text-white">Repeat</div>
              <div className="text-sm text-gray-400">Do this with thousands of examples until it's good</div>
            </div>
          </div>
        </div>
        <div className="bg-void-800 rounded-xl p-6 border-l-4 border-accent-violet">
          <p className="text-gray-300">
            <strong className="text-white">This is the entire process.</strong> Every neural network — 
            from simple ones to ChatGPT — learns by repeating this loop over and over.
          </p>
        </div>
      </StepContent>

      <StepContent step={6}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-flow-600/20 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-flow-400" />
          </div>
          <h2 className="text-2xl font-semibold text-white">
            What's next
          </h2>
        </div>
        <p className="text-gray-300 mb-6 leading-relaxed">
          In the following modules, we'll explore each step of this process in detail:
        </p>
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-4 p-3 rounded-lg bg-void-800/30">
            <div className="w-8 h-8 rounded-full bg-accent-cyan/20 flex items-center justify-center text-accent-cyan text-sm font-medium">1</div>
            <div>
              <span className="font-medium text-white">Building Blocks</span>
              <span className="text-gray-500 mx-2">—</span>
              <span className="text-gray-400">The parts of a neural network</span>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3 rounded-lg bg-void-800/30">
            <div className="w-8 h-8 rounded-full bg-flow-600/20 flex items-center justify-center text-flow-400 text-sm font-medium">2</div>
            <div>
              <span className="font-medium text-white">Making Predictions</span>
              <span className="text-gray-500 mx-2">—</span>
              <span className="text-gray-400">How input becomes output</span>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3 rounded-lg bg-void-800/30">
            <div className="w-8 h-8 rounded-full bg-accent-rose/20 flex items-center justify-center text-accent-rose text-sm font-medium">3</div>
            <div>
              <span className="font-medium text-white">Measuring Mistakes</span>
              <span className="text-gray-500 mx-2">—</span>
              <span className="text-gray-400">How we know when we're wrong</span>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3 rounded-lg bg-void-800/30">
            <div className="w-8 h-8 rounded-full bg-grad-600/20 flex items-center justify-center text-grad-400 text-sm font-medium">4</div>
            <div>
              <span className="font-medium text-white">Finding What to Fix</span>
              <span className="text-gray-500 mx-2">—</span>
              <span className="text-gray-400">Tracing back to find the problem</span>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3 rounded-lg bg-void-800/30">
            <div className="w-8 h-8 rounded-full bg-accent-emerald/20 flex items-center justify-center text-accent-emerald text-sm font-medium">5</div>
            <div>
              <span className="font-medium text-white">Making Adjustments</span>
              <span className="text-gray-500 mx-2">—</span>
              <span className="text-gray-400">Actually improving the network</span>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3 rounded-lg bg-void-800/30">
            <div className="w-8 h-8 rounded-full bg-accent-violet/20 flex items-center justify-center text-accent-violet text-sm font-medium">6</div>
            <div>
              <span className="font-medium text-white">Putting It Together</span>
              <span className="text-gray-500 mx-2">—</span>
              <span className="text-gray-400">The complete training loop</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-flow-600/10 via-accent-violet/10 to-grad-600/10 rounded-xl p-6 border border-white/10">
          <p className="text-gray-300 mb-4">
            <strong className="text-white">First up:</strong> We'll meet the building blocks — neurons, weights, layers — 
            and see how they fit together to form a complete neural network.
          </p>
          <p className="text-gray-400 text-sm">
            Everything uses just addition and multiplication. No complex math. No coding.
          </p>
        </div>
      </StepContent>
    </ModuleShell>
  )
}

