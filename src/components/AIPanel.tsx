import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  SparklesIcon, 
  LightBulbIcon, 
  ChartBarIcon, 
  DocumentTextIcon,
  ShieldCheckIcon,
  ClockIcon,
  UserGroupIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

interface Suggestion {
  id: string
  type: 'performance' | 'security' | 'feature' | 'optimization' | 'user' | 'business'
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  impact: 'high' | 'medium' | 'low'
  effort: 'high' | 'medium' | 'low'
  category: string
}

const AIPanel = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'priority' | 'impact' | 'effort'>('priority')

  const generateSuggestions = () => {
    setIsAnalyzing(true)
    
    // Simulando análise IA
    setTimeout(() => {
      const newSuggestions: Suggestion[] = [
        {
          id: '1',
          type: 'performance',
          title: 'Otimização de Carregamento',
          description: 'Considere implementar lazy loading para imagens e componentes não críticos.',
          priority: 'high',
          impact: 'high',
          effort: 'medium',
          category: 'performance'
        },
        {
          id: '2',
          type: 'security',
          title: 'Autenticação em Duas Etapas',
          description: 'Recomendamos implementar 2FA para maior segurança.',
          priority: 'high',
          impact: 'high',
          effort: 'high',
          category: 'security'
        },
        {
          id: '3',
          type: 'feature',
          title: 'Exportação de Relatórios',
          description: 'Adicione opção de exportar relatórios em PDF e Excel.',
          priority: 'medium',
          impact: 'medium',
          effort: 'medium',
          category: 'feature'
        },
        {
          id: '4',
          type: 'optimization',
          title: 'Cache de Dados',
          description: 'Implemente cache para melhorar performance de consultas frequentes.',
          priority: 'low',
          impact: 'medium',
          effort: 'low',
          category: 'optimization'
        },
        {
          id: '5',
          type: 'user',
          title: 'Onboarding Interativo',
          description: 'Crie um tour guiado para novos usuários.',
          priority: 'medium',
          impact: 'high',
          effort: 'medium',
          category: 'user'
        },
        {
          id: '6',
          type: 'business',
          title: 'Integração com Pagamentos',
          description: 'Adicione suporte a múltiplos gateways de pagamento.',
          priority: 'high',
          impact: 'high',
          effort: 'high',
          category: 'business'
        },
        {
          id: '7',
          type: 'performance',
          title: 'Compressão de Imagens',
          description: 'Implemente compressão automática de imagens.',
          priority: 'medium',
          impact: 'medium',
          effort: 'low',
          category: 'performance'
        },
        {
          id: '8',
          type: 'security',
          title: 'Auditoria de Logs',
          description: 'Implemente sistema de logs para auditoria de ações.',
          priority: 'medium',
          impact: 'high',
          effort: 'medium',
          category: 'security'
        },
        {
          id: '9',
          type: 'performance',
          title: 'Otimização de Imagens',
          description: 'Implemente carregamento progressivo de imagens.',
          priority: 'medium',
          impact: 'medium',
          effort: 'low',
          category: 'performance'
        },
        {
          id: '10',
          type: 'security',
          title: 'Rate Limiting',
          description: 'Adicione limites de requisições por IP.',
          priority: 'high',
          impact: 'high',
          effort: 'medium',
          category: 'security'
        },
        {
          id: '11',
          type: 'feature',
          title: 'Exportação em Lote',
          description: 'Permita exportar múltiplos documentos de uma vez.',
          priority: 'medium',
          impact: 'high',
          effort: 'medium',
          category: 'feature'
        },
        {
          id: '12',
          type: 'optimization',
          title: 'Indexação de Dados',
          description: 'Implemente índices para consultas frequentes.',
          priority: 'high',
          impact: 'high',
          effort: 'high',
          category: 'optimization'
        },
        {
          id: '13',
          type: 'user',
          title: 'Temas Personalizados',
          description: 'Permita que usuários criem seus próprios temas.',
          priority: 'low',
          impact: 'medium',
          effort: 'high',
          category: 'user'
        },
        {
          id: '14',
          type: 'business',
          title: 'Relatórios Avançados',
          description: 'Adicione relatórios personalizados e dashboards.',
          priority: 'high',
          impact: 'high',
          effort: 'high',
          category: 'business'
        },
        {
          id: '15',
          type: 'performance',
          title: 'Service Workers',
          description: 'Implemente cache offline com service workers.',
          priority: 'medium',
          impact: 'high',
          effort: 'high',
          category: 'performance'
        },
        {
          id: '16',
          type: 'security',
          title: 'Auditoria de Acesso',
          description: 'Adicione logs detalhados de acesso e ações.',
          priority: 'high',
          impact: 'high',
          effort: 'medium',
          category: 'security'
        }
      ]
      
      setSuggestions(newSuggestions)
      setIsAnalyzing(false)
      toast.success('Análise concluída!')
    }, 2000)
  }

  useEffect(() => {
    generateSuggestions()
  }, [])

  const getIcon = (type: Suggestion['type']) => {
    switch (type) {
      case 'performance':
        return <ChartBarIcon className="w-6 h-6" />
      case 'security':
        return <ShieldCheckIcon className="w-6 h-6" />
      case 'feature':
        return <LightBulbIcon className="w-6 h-6" />
      case 'optimization':
        return <ClockIcon className="w-6 h-6" />
      case 'user':
        return <UserGroupIcon className="w-6 h-6" />
      case 'business':
        return <CurrencyDollarIcon className="w-6 h-6" />
    }
  }

  const getPriorityColor = (priority: Suggestion['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
    }
  }

  const getImpactColor = (impact: Suggestion['impact']) => {
    switch (impact) {
      case 'high':
        return 'bg-purple-100 text-purple-800'
      case 'medium':
        return 'bg-blue-100 text-blue-800'
      case 'low':
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getEffortColor = (effort: Suggestion['effort']) => {
    switch (effort) {
      case 'high':
        return 'bg-orange-100 text-orange-800'
      case 'medium':
        return 'bg-indigo-100 text-indigo-800'
      case 'low':
        return 'bg-teal-100 text-teal-800'
    }
  }

  const filteredSuggestions = suggestions.filter(suggestion => 
    selectedCategory === 'all' || suggestion.category === selectedCategory
  )

  const sortedSuggestions = [...filteredSuggestions].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    return priorityOrder[a[sortBy]] - priorityOrder[b[sortBy]]
  })

  const categories = [
    { id: 'all', name: 'Todas' },
    { id: 'performance', name: 'Performance' },
    { id: 'security', name: 'Segurança' },
    { id: 'feature', name: 'Funcionalidades' },
    { id: 'optimization', name: 'Otimização' },
    { id: 'user', name: 'Usuário' },
    { id: 'business', name: 'Negócio' }
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Painel IA
        </h2>
        <button
          onClick={generateSuggestions}
          disabled={isAnalyzing}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isAnalyzing ? 'Analisando...' : 'Atualizar Análise'}
        </button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'priority' | 'impact' | 'effort')}
          className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="priority">Ordenar por Prioridade</option>
          <option value="impact">Ordenar por Impacto</option>
          <option value="effort">Ordenar por Esforço</option>
        </select>
      </div>

      <AnimatePresence>
        {isAnalyzing ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center py-8"
          >
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          </motion.div>
        ) : (
          <div className="space-y-4">
            {sortedSuggestions.map((suggestion) => (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    {getIcon(suggestion.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {suggestion.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(suggestion.priority)}`}>
                          Prioridade: {suggestion.priority}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(suggestion.impact)}`}>
                          Impacto: {suggestion.impact}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEffortColor(suggestion.effort)}`}>
                          Esforço: {suggestion.effort}
                        </span>
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      {suggestion.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AIPanel 