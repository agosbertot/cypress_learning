
describe('Backend Testing', () => {

    it('Visitar pagina ejemplo cypress', () => {
        cy.visit('https://example.cypress.io/commands/network-requests')
        
        // interceptar o escuchar cualquier request GET que contenga la ruta /comments/
        // con as le asignamos un alias para identificarlo
        cy.intercept('GET', '**/comments/*').as('getComment')

        //Tenemos un codigo que obtiene un comentario cuando se hace clic en el boton
        cy.get('.network-btn').click()

        // vamos a esperar con wait que el status de respuesta del objeto getComments sea 200 o 304
        cy.wait('@getComment').its('response.statusCode').should('be.oneOf', [200, 304])
        
        //Escuchando las peticiones post
        cy.intercept('POST', '**/comments').as('postComment')

        //Tenemos codigo que publica un comentario cuando se hace clic en el boton
        cy.get('.network-post').click()

        cy.wait('@postComment').should( ({request,response}) => {
            //verificamos que la request contenga un email
            expect(request.body).to.include('email')
            
            expect(request.headers).to.have.property('content-type')

            // verificamos que la respuesta JSON tengas la propiedad de name y tenga ese valor
            expect(response && response.body).to.have.property('name', 'Using POST in cy.intercept()')
           

        })
    })

    it('Mock', () => {
        let mensaje = "Este es un msj de error que creamos nosotro"

        // cambiamos la respuesta de PUT comment
        cy.intercept({
            method: 'PUT',
            url: "**/comments/*",
        },{
            statusCode: 404,
            body:{ error: mensaje },
            headers:{'access-control-allaw-origin':'*'},
            delayMs: 5000,
        }).as('putComments')

        //tenemos codigo que reemplaza un comentario cuando se hace clic en el boton
        cy.get('.network-put').click()
        cy.wait('@putComments')
    })



})