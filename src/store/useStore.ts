import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  name: string
  email: string
  avatar?: string
}

interface AppState {
  isDarkMode: boolean
  user: User | null
  isAuthenticated: boolean
  toggleDarkMode: () => void
  setUser: (user: User | null) => void
  logout: () => void
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      user: null,
      isAuthenticated: false,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'app-storage',
    }
  )
) 