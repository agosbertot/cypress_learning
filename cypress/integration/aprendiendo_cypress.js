/// <reference types="Cypress"/> 

describe('Primeros casos de prueba', () => {

    beforeEach(() => {
        cy.visit('http://automationpractice.com/index.php')
    })
    xit('Contabilizar cantidad de elementos en la pagina principal', () => {

        //La página principal debería mostrar sólo 7 elementos, si sólo pongo .product-contain 
        //me devuelve una lista de 14 elementos que son todos los que existen 
        //pero de estos sólo se deberían mostrar 7, entonces con #homefeatured .product-container me toma sólo los 7 contenidos en homefeatured
        cy.get('#homefeatured .product-container').should('have.length', 7)

        //obtenemos el elemento #homefeatured .product-container como un parametro/alias reutilizable
        cy.get('#homefeatured .product-container').as('ProductosPrincipales')

        //Verificamos cantidad de elementos utilizando el alias
        cy.get('@ProductosPrincipales').should('have.length', 7)
    })

    xit('Agregar elemento Printed dress al carrito de compras', () => {

        cy.get('#homefeatured .product-container').as('ProductosPrincipales')

        //Iteramos para encontrar un producto con nombre X
        //con $el hacemos referencia al elemento product-name de cada contenedor (product-container)
        cy.get('@ProductosPrincipales')
            .find('.product-name')
            .each(($el, index, $list) => {
                cy.get('@ProductosPrincipales').eq(index).find('.price').then(function ($el1) {
                    let precio = $el1.text()
                    cy.log(precio)
                    if ($el.attr('title') === 'Printed Dress' && precio.includes('26.00')) {
                        cy.log('Se ha encontrado el elemento buscado') //imprime en consola
                        cy.get('@ProductosPrincipales').eq(index).contains('Add to cart').click()
                    }
                })
            })
        cy.get('h2 > .ajax_cart_product_txt')
            .should('contain.text', 'There is 1 item in your cart.')
            .should('be.visible')
    })

    xit('Navegando Hover', () => {
        // con invoke le cambio el valor a la tag STYLE del elemento, 
        //porque ese estilo es lo que hace que aparezca o no el modal con el submenu 
        //cuando me paro sobre el boton WOMEN 
        //attr = attribute
        cy.get('#block_top_menu > ul > li:nth-child(1) > ul').invoke('attr', 'style', 'display: block')
        cy.get('a[title="Tops"]').should('be.visible')
    })

    xit('Verificar funcionamiento Checkbox', () => {
        cy.get('.sf-menu > :nth-child(2) > .sf-with-ul').click()
        cy.get('li[class ="nomargin hiddable col-lg-6"]:has(a[href*="categories-casual_dresses"]) input').check().should('be.checked')
        cy.get('li[class ="nomargin hiddable col-lg-6"]:has(a[href*="categories-summer_dresses"]) input').should('not.be.checked')
    })

    xit('Verificar Dropdown', () => {
        cy.get('.sf-menu > :nth-child(2) > .sf-with-ul').click()
        cy.get('#selectProductSort').select('In stock').should('have.value', 'quatity:desc')
    })

    it('Crear una compra', () => {
        cy.get('#search_query_top').type('Blouse')
        cy.get('#searchbox > .btn').click()
        cy.get('.product-container:has(.product-name[title="Blouse"]) .ajax_add_to_cart_button').click()
        cy.get('.button-container > .button-medium > span').click()
        cy.get('tr[id^="product"]').find('.product-name > a').should('contain.text', 'Blouse')
        cy.get('tr[id^="product"]').find('.price').should('contain.text', '27.00')
        cy.get('.cart_navigation > .button').click()
        cy.get('#email').type('agos@gmail.com')
        cy.get('#passwd').type('agos535683266')
        cy.get('#SubmitLogin').click()
        cy.get('.cart_navigation > .button').click()
        cy.get('#cgv').check().should('be.checked')
        cy.get('.cart_navigation > .button').click()
        cy.get('.bankwire').click()
        cy.get('#cart_navigation > .button').click()
        cy.get('.cheque-indent > .dark').should('contain.text', 'Your order on My Store is complete')
    })

})