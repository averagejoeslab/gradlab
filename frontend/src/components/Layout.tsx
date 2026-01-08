import { Outlet, Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Home, 
  GraduationCap, 
  Boxes, 
  Settings,
  Sparkles
} from 'lucide-react'
import { InteractivitySelector } from './InteractivitySelector'

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/learn', icon: GraduationCap, label: 'Learn' },
  { path: '/playground', icon: Boxes, label: 'Playground' },
]

export function Layout() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="glass border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-flow-500 to-accent-violet 
                          flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-xl">
              <span className="text-white">micro</span>
              <span className="text-flow-400">grad</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path !== '/' && location.pathname.startsWith(item.path))
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    relative px-4 py-2 rounded-lg flex items-center gap-2
                    transition-colors duration-200
                    ${isActive 
                      ? 'text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-white/10 rounded-lg -z-10"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <InteractivitySelector />
            <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-500 text-sm">
          Built with{' '}
          <a 
            href="https://github.com/karpathy/micrograd" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-flow-400 hover:text-flow-300 transition-colors"
          >
            micrograd
          </a>
          {' '}• An educational neural network playground
        </div>
      </footer>
    </div>
  )
}

