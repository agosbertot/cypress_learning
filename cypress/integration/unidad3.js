/// <reference types="Cypress"/> 

describe('Unidad 3', () => {

    beforeEach(() => {
        cy.visit(Cypress.env('url') + "/index.php")
    })

    it('Compra de celular basado en título', () => {
        cy.get('.collapse a:contains("Phones & PDAs")').click()

        // cy.get('#content .product-layout').as('ProductosPrincipales')

        //Con nombre de telefono harcodeado
        // cy.get('@ProductosPrincipales')
        // .find('.caption')
        // .each(($el, index, $list) => {
        //     cy.get('@ProductosPrincipales').eq(index).find('a').then(function ($el1) {
        //         let titulo = $el1.text()
        //         cy.log(titulo)
        //          if (titulo === 'iPhone') {
        //              cy.log('Se ha encontrado el elemento buscado') //imprime en consola
        //              cy.get('@ProductosPrincipales').eq(index).find('button[onclick^="cart.add"]').click()
        //          }
        //     })
        // })

        cy.fixture('carritoCompras').then(function (productos) {
            this.productos = productos
            // cy.get('@ProductosPrincipales')
            // .find('.caption')
            // .each(($el, index, $list) => {
            //     cy.get('@ProductosPrincipales').eq(index).find('a').then(function ($el1) {
            //         let titulo = $el1.text()
            //         cy.log(titulo)
            //          if (titulo === this.productos.telefono1) {
            //              cy.log('Se ha encontrado el elemento buscado') //imprime en consola
            //              cy.get('@ProductosPrincipales').eq(index).find('button[onclick^="cart.add"]').click()
            //          }
            //     })
            // })

            // cy.get('@ProductosPrincipales')
            // .find('.caption')
            // .each(($el, index, $list) => {
            //     cy.get('@ProductosPrincipales').eq(index).find('a').then(function ($el1) {
            //         let titulo = $el1.text()
            //         cy.log(titulo)
            //          if (titulo === this.productos.telefono2) {
            //              cy.log('Se ha encontrado el elemento buscado') //imprime en consola
            //              cy.get('@ProductosPrincipales').eq(index).find('button[onclick^="cart.add"]').click()
            //          }
            //     })
            // })

            // cy.get('@ProductosPrincipales')
            // .find('.caption')
            // .each(($el, index, $list) => {
            //     cy.get('@ProductosPrincipales').eq(index).find('a').then(function ($el1) {
            //         let titulo = $el1.text()
            //         cy.log(titulo)
            //          if (titulo === this.productos.telefono3) {
            //              cy.log('Se ha encontrado el elemento buscado') //imprime en consola
            //              cy.get('@ProductosPrincipales').eq(index).find('button[onclick^="cart.add"]').click()
            //          }
            //     })
            // })

            //Parametrizando método en commands.js - Reemplaza de linea 30 a 67
            cy.agregarElementoAlCarrito(this.productos.telefono1)
            cy.agregarElementoAlCarrito(this.productos.telefono2)
            cy.agregarElementoAlCarrito(this.productos.telefono3)

            cy.get('.btn-inverse').click()
            cy.verificarElementoCarrito(this.productos.telefono1)
            cy.verificarElementoCarrito(this.productos.telefono2)
            cy.verificarElementoCarrito(this.productos.telefono3)

        })

    })

    it('Compra de celular basado en título', () => {
        cy.get('.collapse a:contains("Phones & PDAs")').click()
        cy.fixture('arregloCarrito').then(function (datos) {
            this.datos = datos

            this.datos.articulos.forEach(function (articulo) {
                cy.agregarElementoAlCarrito(articulo)
                //cy.pause() // para pausar y depurar codigo
            });

            cy.get('.btn-inverse').click()

            this.datos.articulos.forEach(function (articulo) {
                cy.verificarElementoCarrito(articulo)
            });

        })
    })

    it('Verificar precio total de la compra', () => {
        cy.get('.collapse a:contains("Phones & PDAs")').click()
        cy.fixture('arregloCarrito').then(function (datos) {
            this.datos = datos

            this.datos.articulos.forEach(function (articulo) {
                cy.agregarElementoAlCarrito(articulo)
            });
        })

        cy.get('.btn-inverse').click()

        var suma = 0

        cy.get('tr:has(button) td:contains("$")').each(function ($el) {
            const monto = $el.text()
            // replace reemplaza un caracter por otro
            var precio = monto.replace('$', '')
            suma = Number(suma) + Number(precio)
            cy.log("La suma es: " + suma)
        })

        cy.get('.table.table-bordered :nth-child(4) :contains("$")').then(function ($el) {
            const monto = $el.text()
            var total = monto.replace('$', '')
            expect(Number(total)).to.equal(Number(suma))
        })
    })

})