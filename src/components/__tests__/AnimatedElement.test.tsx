import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import AnimatedElement from '../AnimatedElement'

describe('AnimatedElement', () => {
  it('deve renderizar o conteúdo corretamente', () => {
    render(
      <AnimatedElement>
        <div>Conteúdo Teste</div>
      </AnimatedElement>
    )

    expect(screen.getByText('Conteúdo Teste')).toBeInTheDocument()
  })

  it('deve aplicar classes CSS corretamente', () => {
    render(
      <AnimatedElement className="test-class">
        <div>Conteúdo Teste</div>
      </AnimatedElement>
    )

    const element = screen.getByText('Conteúdo Teste').parentElement
    expect(element).toHaveClass('test-class')
  })

  it('deve renderizar com diferentes configurações de animação', () => {
    render(
      <AnimatedElement delay={0.5} threshold={0.5} once={false} amount={0.5}>
        <div>Conteúdo Teste</div>
      </AnimatedElement>
    )

    const element = screen.getByText('Conteúdo Teste').parentElement
    expect(element).toBeInTheDocument()
  })
}) 