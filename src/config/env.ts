export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    timeout: 5000,
    retryAttempts: 3,
  },
  auth: {
    tokenKey: 'auth_token',
    refreshTokenKey: 'refresh_token',
    tokenExpiry: 3600, // 1 hora
  },
  cache: {
    defaultStaleTime: 5 * 60 * 1000, // 5 minutos
    defaultCacheTime: 30 * 60 * 1000, // 30 minutos
  },
  features: {
    enableNotifications: true,
    enableDarkMode: true,
    enableAnimations: true,
    enableAIPanel: true,
  },
  analytics: {
    enabled: true,
    trackingId: import.meta.env.VITE_GA_TRACKING_ID,
  },
  errorReporting: {
    enabled: true,
    dsn: import.meta.env.VITE_SENTRY_DSN,
  },
  performance: {
    enableLazyLoading: true,
    enableCodeSplitting: true,
    enableServiceWorker: true,
  }
} 