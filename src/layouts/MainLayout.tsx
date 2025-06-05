import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { useStore } from '../store/useStore'
import { motion } from 'framer-motion'
import { 
  HomeIcon, 
  UserGroupIcon, 
  DocumentTextIcon, 
  ChartBarIcon, 
  Cog6ToothIcon 
} from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'
import StatusBar from '../components/StatusBar'

interface MainLayoutProps {
  children: ReactNode
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Clientes', href: '/clientes', icon: UserGroupIcon },
  { name: 'Documentos', href: '/documentos', icon: DocumentTextIcon },
  { name: 'Relatórios', href: '/relatorios', icon: ChartBarIcon },
  { name: 'Configurações', href: '/configuracoes', icon: Cog6ToothIcon },
]

export default function MainLayout({ children }: MainLayoutProps) {
  const { isDarkMode, toggleDarkMode, user } = useStore()
  const location = useLocation()

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 px-4 bg-primary">
            <h1 className="text-xl font-bold text-white">Dashboard</h1>
          </div>
          
          <nav className="flex-1 px-4 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-primary text-white' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="pl-64">
        {/* Navbar */}
        <header className="h-16 bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex items-center justify-between h-full px-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Olá, {user?.name || 'Usuário'}!
              </h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                {isDarkMode ? '🌞' : '🌙'}
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6 pb-20">
          {children}
        </main>

        {/* Status Bar */}
        <StatusBar />
      </div>
    </div>
  )
} 