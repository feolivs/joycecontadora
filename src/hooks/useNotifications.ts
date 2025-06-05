import { useState, useEffect, useCallback } from 'react'
import type { Notification } from '../types'
import { notificationService } from '../services/notifications'

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [permission, setPermission] = useState<NotificationPermission>('default')

  useEffect(() => {
    // Verifica permissão inicial
    if ('Notification' in window) {
      setPermission(Notification.permission)
    }

    // Listener para novas notificações
    const handleNewNotification = (event: CustomEvent<Notification>) => {
      setNotifications(prev => [event.detail, ...prev])
    }

    window.addEventListener('notification', handleNewNotification as EventListener)

    return () => {
      window.removeEventListener('notification', handleNewNotification as EventListener)
    }
  }, [])

  const requestPermission = useCallback(async () => {
    const granted = await notificationService.requestPermission()
    if (granted) {
      setPermission('granted')
    }
    return granted
  }, [])

  const markAsRead = useCallback(async (notificationId: string) => {
    await notificationService.markAsRead(notificationId)
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    )
  }, [])

  const clearAll = useCallback(async () => {
    await notificationService.clearAll()
    setNotifications([])
  }, [])

  return {
    notifications,
    permission,
    requestPermission,
    markAsRead,
    clearAll,
    unreadCount: notifications.filter(n => !n.read).length
  }
} 