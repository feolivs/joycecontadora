import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
  // Configurações do usuário
  userPreferences: {
    theme: 'light' | 'dark' | 'system'
    language: string
    notifications: boolean
    emailNotifications: boolean
    autoSave: boolean
  }
  
  // Estado da aplicação
  isLoading: boolean
  isSidebarOpen: boolean
  currentPage: string
  lastVisitedPages: string[]
  
  // Métricas e estatísticas
  metrics: {
    totalDocuments: number
    totalClients: number
    totalContracts: number
    lastUpdate: string
  }
  
  // Ações
  setUserPreferences: (preferences: Partial<AppState['userPreferences']>) => void
  setLoading: (loading: boolean) => void
  toggleSidebar: () => void
  setCurrentPage: (page: string) => void
  updateMetrics: (metrics: Partial<AppState['metrics']>) => void
}

export const useAppState = create<AppState>()(
  persist(
    (set) => ({
      // Estado inicial
      userPreferences: {
        theme: 'system',
        language: 'pt-BR',
        notifications: true,
        emailNotifications: false,
        autoSave: true
      },
      
      isLoading: false,
      isSidebarOpen: true,
      currentPage: 'dashboard',
      lastVisitedPages: [],
      
      metrics: {
        totalDocuments: 0,
        totalClients: 0,
        totalContracts: 0,
        lastUpdate: new Date().toISOString()
      },
      
      // Ações
      setUserPreferences: (preferences) =>
        set((state) => ({
          userPreferences: { ...state.userPreferences, ...preferences }
        })),
      
      setLoading: (loading) =>
        set({ isLoading: loading }),
      
      toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      
      setCurrentPage: (page) =>
        set((state) => ({
          currentPage: page,
          lastVisitedPages: [
            page,
            ...state.lastVisitedPages.filter(p => p !== page).slice(0, 4)
          ]
        })),
      
      updateMetrics: (metrics) =>
        set((state) => ({
          metrics: {
            ...state.metrics,
            ...metrics,
            lastUpdate: new Date().toISOString()
          }
        }))
    }),
    {
      name: 'app-state',
      partialize: (state) => ({
        userPreferences: state.userPreferences,
        lastVisitedPages: state.lastVisitedPages
      })
    }
  )
) 