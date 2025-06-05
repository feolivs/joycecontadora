import { useState } from 'react'
import { motion } from 'framer-motion'
import { SwatchIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
}

const defaultColors: ThemeColors = {
  primary: '#3B82F6',
  secondary: '#6B7280',
  accent: '#10B981',
  background: '#FFFFFF',
  text: '#1F2937'
}

const ThemeCustomizer = () => {
  const [colors, setColors] = useState<ThemeColors>(defaultColors)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleColorChange = (key: keyof ThemeColors, value: string) => {
    setColors(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSave = () => {
    // Aqui você implementaria a lógica para salvar as configurações
    // Por exemplo, usando localStorage ou uma API
    localStorage.setItem('themeColors', JSON.stringify(colors))
    localStorage.setItem('darkMode', String(isDarkMode))
    
    // Aplicar as cores ao documento
    const root = document.documentElement
    root.style.setProperty('--color-primary', colors.primary)
    root.style.setProperty('--color-secondary', colors.secondary)
    root.style.setProperty('--color-accent', colors.accent)
    root.style.setProperty('--color-background', colors.background)
    root.style.setProperty('--color-text', colors.text)
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    toast.success('Tema personalizado salvo!')
  }

  const handleReset = () => {
    setColors(defaultColors)
    setIsDarkMode(false)
    toast.success('Tema restaurado para padrão!')
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Personalização do Tema
        </h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsDarkMode(false)}
            className={`p-2 rounded-lg ${!isDarkMode ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
          >
            <SunIcon className="w-6 h-6" />
          </button>
          <button
            onClick={() => setIsDarkMode(true)}
            className={`p-2 rounded-lg ${isDarkMode ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
          >
            <MoonIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Cor Primária
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={colors.primary}
                onChange={(e) => handleColorChange('primary', e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={colors.primary}
                onChange={(e) => handleColorChange('primary', e.target.value)}
                className="flex-1 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Cor Secundária
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={colors.secondary}
                onChange={(e) => handleColorChange('secondary', e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={colors.secondary}
                onChange={(e) => handleColorChange('secondary', e.target.value)}
                className="flex-1 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Cor de Destaque
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={colors.accent}
                onChange={(e) => handleColorChange('accent', e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={colors.accent}
                onChange={(e) => handleColorChange('accent', e.target.value)}
                className="flex-1 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Cor de Fundo
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={colors.background}
                onChange={(e) => handleColorChange('background', e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={colors.background}
                onChange={(e) => handleColorChange('background', e.target.value)}
                className="flex-1 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            Restaurar Padrão
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Salvar Tema
          </button>
        </div>
      </div>
    </div>
  )
}

export default ThemeCustomizer 