/// <reference types="cypress" />

import '../../support/commands'

describe('Errors', () => {
    var jsonData = require('../../fixtures/dto.json');
    it('Login error', () => {
        cy.login('error','test123')
        cy.get(':nth-child(1) > .invalid-feedback').should('exist')
    })

    it('Create note without title', () => {
      const email = jsonData.email
      const password = jsonData.password
      cy.login(email,password)
      cy.createNote(1, ' ', 'test')
      cy.get(':nth-child(3) > .invalid-feedback').should('exist')
    })

    it.only('Create note without description', () => {
        const email = jsonData.email
        const password = jsonData.password
        cy.login(email,password)
        cy.createNote(1, 'test', ' ')
        cy.get(':nth-child(4) > .invalid-feedback').should('exist')
      })

})