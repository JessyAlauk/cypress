/// <reference types="cypress" />

describe('Create notes using API', () =>{
    var jsonData = require('../../fixtures/dto.json');
    var baseUri = 'https://practice.expandtesting.com/notes/api'
    let token
    let id
    beforeEach(() => {
        cy.request({
            method: 'POST',
            url: `${baseUri}/users/login`,
            headers: {'accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: {
                "email": jsonData.email,
                "password": jsonData.password
            }
        }).then(response => {
            token = response.body.data.token
        })
    })
    it('Create', () =>{
        cy.request({
            method: 'POST',
            url: `${baseUri}/notes`,
            headers: {'accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded', 'x-auth-token': token
            },
            body:{
                "title": jsonData.title,
                "description": jsonData.description,
                "category": jsonData.category[0]
            }
        }).then(response => {
            id = response.body.data.id
        })
    })

    it('View', () =>{
        cy.request({
            method: 'GET',
            url: `${baseUri}/notes`,
            headers: {'accept': 'application/json', 'x-auth-token': token}
        }).its('status').should('be.equal', 200)
    })

    it('Edit', () =>{
        cy.request({
            method: 'PUT',
            url: `${baseUri}/notes/${id}`,
            headers: {'accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded', 'x-auth-token': token
            },
            body:{
                "title": jsonData.title,
                "description": jsonData.description,
                "category": jsonData.category[1],
                "completed": false
            }
        }).its('status').should('be.equal', 200)
    })

    it('Delete', () =>{
        cy.request({
            method: 'DELETE',
            url: `${baseUri}/notes/${id}`,
            headers: {'accept': 'application/json', 'x-auth-token': token
            }
        }).its('status').should('be.equal', 200)
    })

})