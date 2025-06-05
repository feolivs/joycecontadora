import { useState } from 'react'
import { motion } from 'framer-motion'
import { Switch } from '@headlessui/react'
import { useStore } from '../store'
import toast from 'react-hot-toast'
import ThemeCustomizer from '../components/ThemeCustomizer'
import AIPanel from '../components/AIPanel'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Settings = () => {
  const { darkMode, setDarkMode } = useStore()
  const [notifications, setNotifications] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [autoSave, setAutoSave] = useState(true)

  const handleSave = () => {
    // Aqui você implementaria a lógica para salvar as configurações
    toast.success('Configurações salvas com sucesso!')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Configurações
        </h2>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Salvar Alterações
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Preferências Gerais
            </h3>
            
            <div className="space-y-4">
              <Switch.Group as="div" className="flex items-center justify-between">
                <Switch.Label as="span" className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Modo Escuro
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Alternar entre tema claro e escuro
                  </span>
                </Switch.Label>
                <Switch
                  checked={darkMode}
                  onChange={setDarkMode}
                  className={classNames(
                    darkMode ? 'bg-blue-600' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      darkMode ? 'translate-x-5' : 'translate-x-0',
                      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    )}
                  />
                </Switch>
              </Switch.Group>

              <Switch.Group as="div" className="flex items-center justify-between">
                <Switch.Label as="span" className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Notificações
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Receber notificações do sistema
                  </span>
                </Switch.Label>
                <Switch
                  checked={notifications}
                  onChange={setNotifications}
                  className={classNames(
                    notifications ? 'bg-blue-600' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      notifications ? 'translate-x-5' : 'translate-x-0',
                      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    )}
                  />
                </Switch>
              </Switch.Group>

              <Switch.Group as="div" className="flex items-center justify-between">
                <Switch.Label as="span" className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Notificações por Email
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Receber atualizações por email
                  </span>
                </Switch.Label>
                <Switch
                  checked={emailNotifications}
                  onChange={setEmailNotifications}
                  className={classNames(
                    emailNotifications ? 'bg-blue-600' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      emailNotifications ? 'translate-x-5' : 'translate-x-0',
                      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    )}
                  />
                </Switch>
              </Switch.Group>

              <Switch.Group as="div" className="flex items-center justify-between">
                <Switch.Label as="span" className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Salvamento Automático
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Salvar alterações automaticamente
                  </span>
                </Switch.Label>
                <Switch
                  checked={autoSave}
                  onChange={setAutoSave}
                  className={classNames(
                    autoSave ? 'bg-blue-600' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      autoSave ? 'translate-x-5' : 'translate-x-0',
                      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    )}
                  />
                </Switch>
              </Switch.Group>
            </div>
          </div>

          <ThemeCustomizer />
        </div>

        <div className="space-y-6">
          <AIPanel />
        </div>
      </div>
    </div>
  )
}

export default Settings 