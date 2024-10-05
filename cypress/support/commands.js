// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email, password) => {
    cy.visit('https://practice.expandtesting.com/notes/app')
      cy.get('.btn-primary').click()
      cy.get('[data-testid="login-email"]').type(email)
      cy.get('[data-testid="login-password"]').type(password)
      cy.get('[data-testid="login-submit"]').click()
})

Cypress.Commands.add('createNote', (categoryNumber, title, description) =>{
    cy.get('[data-testid="add-new-note"]').click()
    cy.get('[data-testid="note-category"]').select(categoryNumber)
    cy.get('[data-testid="note-title"]').type(title)
    cy.get('[data-testid="note-description"]').type(description)
    cy.get('[data-testid="note-submit"]').click()
})
