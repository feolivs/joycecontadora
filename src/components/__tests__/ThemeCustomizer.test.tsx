import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ThemeCustomizer from '../ThemeCustomizer'
import { Toaster } from 'react-hot-toast'

describe('ThemeCustomizer', () => {
  it('deve renderizar o personalizador de tema corretamente', () => {
    render(
      <>
        <ThemeCustomizer />
        <Toaster />
      </>
    )

    expect(screen.getByText('Personalização do Tema')).toBeInTheDocument()
    expect(screen.getByText('Cor Primária')).toBeInTheDocument()
    expect(screen.getByText('Cor Secundária')).toBeInTheDocument()
    expect(screen.getByText('Cor de Destaque')).toBeInTheDocument()
    expect(screen.getByText('Cor de Fundo')).toBeInTheDocument()
  })

  it('deve alterar cores ao selecionar novos valores', () => {
    render(
      <>
        <ThemeCustomizer />
        <Toaster />
      </>
    )

    const primaryColorInput = screen.getAllByRole('textbox')[0]
    fireEvent.change(primaryColorInput, { target: { value: '#FF0000' } })

    expect(primaryColorInput).toHaveValue('#FF0000')
  })

  it('deve alternar entre modo claro e escuro', () => {
    render(
      <>
        <ThemeCustomizer />
        <Toaster />
      </>
    )

    const darkModeButton = screen.getByRole('button', { name: /moon/i })
    fireEvent.click(darkModeButton)

    expect(document.documentElement).toHaveClass('dark')
  })

  it('deve mostrar toast de sucesso ao salvar tema', async () => {
    render(
      <>
        <ThemeCustomizer />
        <Toaster />
      </>
    )

    const saveButton = screen.getByText('Salvar Tema')
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(screen.getByText('Tema personalizado salvo!')).toBeInTheDocument()
    })
  })

  it('deve restaurar cores padrão ao clicar em resetar', () => {
    render(
      <>
        <ThemeCustomizer />
        <Toaster />
      </>
    )

    const primaryColorInput = screen.getAllByRole('textbox')[0]
    fireEvent.change(primaryColorInput, { target: { value: '#FF0000' } })
    
    const resetButton = screen.getByText('Restaurar Padrão')
    fireEvent.click(resetButton)

    expect(primaryColorInput).toHaveValue('#3B82F6')
  })
}) 