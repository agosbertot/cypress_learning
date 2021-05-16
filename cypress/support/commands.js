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

Cypress.Commands.add("agregarElementoAlCarrito", (nombreProducto) => {
    cy.get('#content .product-layout').as('ProductosPrincipales')
    cy.get('@ProductosPrincipales')
        .find('.caption')
        .each(($el, index, $list) => {
            cy.get('@ProductosPrincipales').eq(index).find('a').then(function ($el1) {
                let titulo = $el1.text()
                cy.log(titulo)
                if (titulo === nombreProducto) {
                    cy.log('Se ha encontrado el elemento buscado') //imprime en consola
                    cy.get('@ProductosPrincipales').eq(index).find('button[onclick^="cart.add"]').click()
                    cy.get('.alert.alert-success.alert-dismissible').should('contain.text', nombreProducto)
                }
            })
        })
})

Cypress.Commands.add("verificarElementoCarrito", (nombreProducto) => {
    cy.get('tr:has(button[onclick ^= "cart.remove"])')
        .each(($el, index, $list) => {
            cy.get('td[class="text-left"] a').eq(index).then(function ($el) {
                let titulo = $el.text()
                cy.get('tr:has(button[onclick ^= "cart.remove"])').should('contain.text', nombreProducto)
            })
        })
})
