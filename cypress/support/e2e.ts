// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

declare global {
  namespace Cypress {
    interface Chainable {
      // Adicione comandos personalizados aqui
      login(email: string, password: string): Chainable<void>
      logout(): Chainable<void>
    }
  }
}

// Comando personalizado para login
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login')
  cy.get('input[type="email"]').type(email)
  cy.get('input[type="password"]').type(password)
  cy.get('button[type="submit"]').click()
})

// Comando personalizado para logout
Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="logout-button"]').click()
}) 