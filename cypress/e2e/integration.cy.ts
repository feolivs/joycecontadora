describe('Integração', () => {
  beforeEach(() => {
    cy.login('admin@exemplo.com', 'admin123')
  })

  it('deve navegar entre as páginas', () => {
    // Dashboard
    cy.visit('/dashboard')
    cy.get('h1').should('contain', 'Dashboard')
    
    // Clientes
    cy.get('a[href="/clientes"]').click()
    cy.url().should('include', '/clientes')
    cy.get('h1').should('contain', 'Clientes')
    
    // Documentos
    cy.get('a[href="/documentos"]').click()
    cy.url().should('include', '/documentos')
    cy.get('h1').should('contain', 'Documentos')
    
    // Relatórios
    cy.get('a[href="/relatorios"]').click()
    cy.url().should('include', '/relatorios')
    cy.get('h1').should('contain', 'Relatórios')
    
    // Configurações
    cy.get('a[href="/configuracoes"]').click()
    cy.url().should('include', '/configuracoes')
    cy.get('h1').should('contain', 'Configurações')
  })

  it('deve interagir com o painel IA', () => {
    cy.visit('/dashboard')
    
    // Abre o painel IA
    cy.get('[data-testid="ai-panel-button"]').click()
    
    // Verifica se o painel está visível
    cy.get('[data-testid="ai-panel"]').should('be.visible')
    
    // Atualiza a análise
    cy.get('[data-testid="update-analysis"]').click()
    
    // Verifica se as sugestões aparecem
    cy.get('[data-testid="suggestion-item"]').should('have.length.at.least', 1)
    
    // Filtra por categoria
    cy.get('[data-testid="category-filter"]').select('performance')
    cy.get('[data-testid="suggestion-item"]').should('exist')
    
    // Ordena por prioridade
    cy.get('[data-testid="sort-options"]').select('priority')
    cy.get('[data-testid="suggestion-item"]').should('exist')
  })

  it('deve interagir com as notificações', () => {
    cy.visit('/dashboard')
    
    // Abre o painel de notificações
    cy.get('[data-testid="notifications-button"]').click()
    
    // Verifica se o painel está visível
    cy.get('[data-testid="notifications-panel"]').should('be.visible')
    
    // Marca todas como lidas
    cy.get('[data-testid="mark-all-read"]').click()
    
    // Verifica se o contador de não lidas foi zerado
    cy.get('[data-testid="unread-count"]').should('not.exist')
    
    // Limpa todas as notificações
    cy.get('[data-testid="clear-all"]').click()
    
    // Verifica se não há mais notificações
    cy.get('[data-testid="notification-item"]').should('not.exist')
  })

  it('deve personalizar o tema', () => {
    cy.visit('/configuracoes')
    
    // Alterna o tema escuro
    cy.get('[data-testid="dark-mode-toggle"]').click()
    cy.get('html').should('have.class', 'dark')
    
    // Alterna o tema claro
    cy.get('[data-testid="dark-mode-toggle"]').click()
    cy.get('html').should('not.have.class', 'dark')
    
    // Altera a cor primária
    cy.get('[data-testid="primary-color"]').invoke('val', '#FF0000').trigger('change')
    cy.get('[data-testid="save-theme"]').click()
    
    // Verifica se a cor foi aplicada
    cy.get('[data-testid="primary-color"]').should('have.value', '#FF0000')
  })

  it('deve gerenciar o cache', () => {
    cy.visit('/dashboard')
    
    // Verifica se os dados são carregados
    cy.get('[data-testid="dashboard-data"]').should('exist')
    
    // Força uma atualização
    cy.get('[data-testid="refresh-data"]').click()
    
    // Verifica se os dados foram atualizados
    cy.get('[data-testid="dashboard-data"]').should('exist')
    
    // Limpa o cache
    cy.get('[data-testid="clear-cache"]').click()
    
    // Verifica se os dados são recarregados
    cy.get('[data-testid="dashboard-data"]').should('exist')
  })
}) 