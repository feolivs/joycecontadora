describe('Autenticação', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('deve exibir a página de login', () => {
    cy.get('h2').should('contain', 'Login')
    cy.get('input[type="email"]').should('exist')
    cy.get('input[type="password"]').should('exist')
    cy.get('button[type="submit"]').should('exist')
  })

  it('deve mostrar erro com credenciais inválidas', () => {
    cy.get('input[type="email"]').type('teste@exemplo.com')
    cy.get('input[type="password"]').type('senha123')
    cy.get('button[type="submit"]').click()
    
    cy.get('[role="alert"]').should('be.visible')
    cy.get('[role="alert"]').should('contain', 'Credenciais inválidas')
  })

  it('deve fazer login com sucesso', () => {
    cy.get('input[type="email"]').type('admin@exemplo.com')
    cy.get('input[type="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    
    // Verifica se foi redirecionado para o dashboard
    cy.url().should('include', '/dashboard')
    
    // Verifica se o menu lateral está visível
    cy.get('nav').should('be.visible')
    
    // Verifica se o nome do usuário está visível
    cy.get('[data-testid="user-name"]').should('contain', 'Admin')
  })

  it('deve fazer logout com sucesso', () => {
    // Faz login primeiro
    cy.get('input[type="email"]').type('admin@exemplo.com')
    cy.get('input[type="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    
    // Clica no botão de logout
    cy.get('[data-testid="logout-button"]').click()
    
    // Verifica se foi redirecionado para a página de login
    cy.url().should('include', '/login')
  })
}) 