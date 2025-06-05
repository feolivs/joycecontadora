import { motion } from 'framer-motion'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

const statusItems = [
  { id: 1, name: 'IA', status: 'online', message: 'IA pronta' },
  { id: 2, name: 'Supabase', status: 'online', message: 'Conectado' },
  { id: 3, name: 'Sistema', status: 'online', message: 'Operacional' },
]

export default function StatusBar() {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-2 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {statusItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-2">
                {item.status === 'online' ? (
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircleIcon className="w-4 h-4 text-red-500" />
                )}
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {item.name}: {item.message}
                </span>
              </div>
            ))}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            v1.0.0
          </div>
        </div>
      </div>
    </motion.div>
  )
} 