import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'

export const initSentry = () => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.init({
      dsn: process.env.VITE_SENTRY_DSN,
      integrations: [new BrowserTracing()],
      tracesSampleRate: 1.0,
      environment: process.env.NODE_ENV,
      release: process.env.VITE_APP_VERSION,
      beforeSend(event) {
        // Não envie eventos em desenvolvimento
        if (process.env.NODE_ENV === 'development') {
          return null
        }
        return event
      },
    })
  }
}

export const captureException = (error: Error) => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureException(error)
  }
}

export const captureMessage = (message: string) => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureMessage(message)
  }
} 