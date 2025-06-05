import type { Notification } from '../types'
import { config } from '../config/env'

class NotificationService {
  private ws: WebSocket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectTimeout = 1000

  constructor() {
    if (config.features.enableNotifications) {
      this.connect()
    }
  }

  private connect() {
    try {
      this.ws = new WebSocket(`${config.api.baseUrl.replace('http', 'ws')}/notifications`)
      
      this.ws.onopen = () => {
        console.log('WebSocket conectado')
        this.reconnectAttempts = 0
      }

      this.ws.onclose = () => {
        console.log('WebSocket desconectado')
        this.reconnect()
      }

      this.ws.onerror = (error) => {
        console.error('Erro no WebSocket:', error)
      }

      this.ws.onmessage = (event) => {
        try {
          const notification: Notification = JSON.parse(event.data)
          this.handleNotification(notification)
        } catch (error) {
          console.error('Erro ao processar notificação:', error)
        }
      }
    } catch (error) {
      console.error('Erro ao conectar WebSocket:', error)
      this.reconnect()
    }
  }

  private reconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      setTimeout(() => this.connect(), this.reconnectTimeout * this.reconnectAttempts)
    }
  }

  private handleNotification(notification: Notification) {
    // Envia para o service worker
    if ('serviceWorker' in navigator && 'Notification' in window) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(notification.title, {
          body: notification.message,
          icon: '/icon.png',
          badge: '/badge.png',
          data: notification,
        })
      })
    }

    // Dispara evento customizado
    const event = new CustomEvent('notification', { detail: notification })
    window.dispatchEvent(event)
  }

  async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.warn('Este navegador não suporta notificações')
      return false
    }

    const permission = await Notification.requestPermission()
    return permission === 'granted'
  }

  async markAsRead(notificationId: string): Promise<void> {
    // Implementar lógica para marcar como lida
  }

  async clearAll(): Promise<void> {
    // Implementar lógica para limpar todas
  }
}

export const notificationService = new NotificationService() 