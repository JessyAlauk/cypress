/// <reference types="cypress" />

import '../../support/commands'

describe('Create, edit, update and delete notes', () => {
  var jsonData = require('../../fixtures/dto.json');
    beforeEach(() => {
      const email = jsonData.email
      const password = jsonData.password
      cy.login(email,password)
    })
    
    it('Create a new note', () => {
      const categories = jsonData.category
      const title = jsonData.title
      for (let i = 0; i < categories.length; i++){
        const description = `${jsonData.description}${categories[i]}` 
        cy.createNote(i, title ,description)
        cy.get(':nth-child(2) > [data-testid="note-card"] > .card-body').should('exist')
      }
    })

    it('View list notes', () => {
      cy.get('[data-testid="notes-list"]').should('exist')
    })
    
    it('Edit note', () => {
      cy.get(':nth-child(2) > [data-testid="note-card"] > .card-footer > div > [data-testid="note-edit"]').click()
      cy.get('[data-testid="note-title"]')
        .clear()
        .type('A new title!!!!!')
        cy.get('[data-testid="note-submit"]').click()
      cy.get('[data-testid="note-card-title"]').should('exist')
    })
    it('Delete note', () => {
      const text = cy.get(':nth-child(2) > [data-testid="note-card"] > [data-testid="note-card-title"]').title()
      console.log(text)
      cy.get(':nth-child(2) > [data-testid="note-card"] > .card-footer > div > [data-testid="note-delete"]').click()
      cy.get('[data-testid="note-delete-confirm"]').click()
    
    })
   
})