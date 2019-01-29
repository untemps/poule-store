/// <reference types="Cypress" />

describe('Storage', () => {
	let polyfill

	before(() => {
		const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js'
		cy.request(polyfillUrl).then(response => {
			polyfill = response.body
		})
	})

	it('Should redirect to login page', () => {
		cy.visit('/')
		cy.url().then(value => expect(value).to.equal(Cypress.config().baseUrl + '/login'))
	})

	it('Should display page', () => {
		cy.login('cot@poulestore.com', 'cotcotcodot')
		cy.visit('/product/1')
		cy.url().then(value => expect(value).to.equal(Cypress.config().baseUrl + '/product/1'))
	})

	it('Should redirect to login page since localstorage has been cleared', () => {
		cy.clearLocalStorage('user')
		cy.visit('/product/1')
		cy.url().then(value => expect(value).to.equal(Cypress.config().baseUrl + '/login'))
	})

	it('Should write a file with remote data', () => {
		cy.request('https://jsonplaceholder.typicode.com/users/3').then(response => {
			cy.writeFile('cypress/fixtures/remote-user.json', response.body)
		})
		cy.exec('open cypress/fixtures/remote-user.json')
	})

	describe('Stub login with remote data', () => {
		beforeEach(() => {
			cy.server()
			cy.route('POST', '/login', 'fixture:remote-user.json').as('fetchUser')

			cy.visit('/login', {
				onBeforeLoad(win) {
					delete win.fetch
					win.eval(polyfill)
					win.fetch = win.unfetch
				},
			})

			cy.login('cot@poulestore.com', 'cotcotcodot')
		})

		it('Should post credentials', () => {
			cy.wait('@fetchUser').its('response.body.id').should('eq', 3)
		})
	})
})
