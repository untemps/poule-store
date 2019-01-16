/// <reference types="Cypress" />

describe('Login process', () => {
	beforeEach(() => {
		cy.visit('/login')
	})

	it('Should login', () => {
		cy.get('#username').type('cot@poulestore.com')
		cy.get('#password').type('cotcotcodot')
		cy.get('[data-testid=submit-button]').click()
		//cy.url().should('eq', Cypress.config().baseUrl + '/')
		cy.url().then(value => expect(value).to.equal(Cypress.config().baseUrl + '/'))
	})

	it('Should display error on username', () => {
		cy.get('#username')
			.as('usernameEl')
			.type('cot')
		cy.get('@usernameEl').should('have.class', 'error')
	})

	it('Should display error on password', () => {
		cy.get('#password')
			.as('passwordEl')
			.type('c')
		cy.get('@passwordEl').clear()
		cy.get('@passwordEl').blur()
		cy.get('@passwordEl').should('have.class', 'error')
	})
})
