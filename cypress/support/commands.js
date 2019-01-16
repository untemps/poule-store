Cypress.Commands.add("login", (email, password) => {
	cy.get('#username').type(email)
	cy.get('#password').type(password)
	cy.get('[data-testid=submit-button]').click()
})
