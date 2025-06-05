import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { NotificationsPanel } from '../NotificationsPanel'
import { useNotifications } from '../../hooks/useNotifications'

// Mock do hook useNotifications
vi.mock('../../hooks/useNotifications', () => ({
  useNotifications: vi.fn()
}))

describe('NotificationsPanel', () => {
  const mockNotifications = [
    {
      id: '1',
      type: 'success',
      title: 'Sucesso',
      message: 'Operação concluída',
      timestamp: new Date().toISOString(),
      read: false
    },
    {
      id: '2',
      type: 'error',
      title: 'Erro',
      message: 'Operação falhou',
      timestamp: new Date().toISOString(),
      read: true
    }
  ]

  const mockUseNotifications = {
    notifications: mockNotifications,
    markAsRead: vi.fn(),
    markAllAsRead: vi.fn(),
    removeNotification: vi.fn(),
    clearAllNotifications: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useNotifications as any).mockReturnValue(mockUseNotifications)
  })

  it('deve renderizar o botão de notificações', () => {
    render(<NotificationsPanel />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('deve mostrar o contador de notificações não lidas', () => {
    render(<NotificationsPanel />)
    const unreadCount = mockNotifications.filter(n => !n.read).length
    expect(screen.getByText(unreadCount.toString())).toBeInTheDocument()
  })

  it('deve abrir o painel ao clicar no botão', () => {
    render(<NotificationsPanel />)
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByText('Notificações')).toBeInTheDocument()
  })

  it('deve listar todas as notificações', () => {
    render(<NotificationsPanel />)
    fireEvent.click(screen.getByRole('button'))
    mockNotifications.forEach(notification => {
      expect(screen.getByText(notification.title)).toBeInTheDocument()
      expect(screen.getByText(notification.message)).toBeInTheDocument()
    })
  })

  it('deve chamar markAllAsRead ao clicar no botão', () => {
    render(<NotificationsPanel />)
    fireEvent.click(screen.getByRole('button'))
    fireEvent.click(screen.getByText('Marcar todas como lidas'))
    expect(mockUseNotifications.markAllAsRead).toHaveBeenCalled()
  })

  it('deve chamar clearAllNotifications ao clicar no botão', () => {
    render(<NotificationsPanel />)
    fireEvent.click(screen.getByRole('button'))
    fireEvent.click(screen.getByText('Limpar todas'))
    expect(mockUseNotifications.clearAllNotifications).toHaveBeenCalled()
  })

  it('deve chamar removeNotification ao clicar no botão de remover', () => {
    render(<NotificationsPanel />)
    fireEvent.click(screen.getByRole('button'))
    const removeButtons = screen.getAllByRole('button', { name: /remover/i })
    fireEvent.click(removeButtons[0])
    expect(mockUseNotifications.removeNotification).toHaveBeenCalledWith('1')
  })
}) 