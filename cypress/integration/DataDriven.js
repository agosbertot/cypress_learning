/// <reference types="Cypress"/> 

describe('Unidad 2', () => {
    before(function () {
        //cargamos los valores del archivo .json en un objeto
        // cy.fixture('data').then(function (datos) {
        //     this.datos = datos // para que dsp datos se pueda utilizar en otros bloques
        // })
    })
    beforeEach(() => {
        cy.visit('https://demoqa.com/automation-practice-form')
    })

    it('Llenado de formulario con fixture', () => {

        cy.fixture('data').then(function (datos) {
            this.datos = datos
            cy.get('#firstName').type(this.datos.nombre)
            cy.get('#lastName').type(this.datos.apellido)
            cy.get('#userEmail').type(this.datos.email)

            //con force:true fuerzo el click sobre el radiobutton 
            //porque con un check solo no me deja porque el input esta dentro de un label
            // el label se encuentra por encima entonce sintenta hacer click al label y no al input
            //cy.get('input[name = "gender"][value = "Female"]').check({force:true})

            // entre los + concatena
            cy.get('input[name = "gender"][value = "' + this.datos.sexo + '"]').check({ force: true }).should('be.checked')
            cy.get('#userNumber').type(this.datos.tel)

            //DATE PICKERS
            cy.get('#dateOfBirthInput').click()
            cy.get('.react-datepicker__month-select').should('be.visible').select(this.datos.fecha_nacimiento[0])
            cy.get('.react-datepicker__year-select').select(this.datos.fecha_nacimiento[1])
            cy.get('.react-datepicker__day--0' + this.datos.fecha_nacimiento[2] + '').click()
            cy.get('#dateOfBirthInput')
                .should('contain.value', this.datos.fecha_nacimiento[0].substring(0, 3)) //toma los primeros 3 valores del string, es decir: Dec (correspondiente a Diciembre)
                .should('contain.value', this.datos.fecha_nacimiento[1])
                .should('contain.value', this.datos.fecha_nacimiento[2])

            cy.get('.subjects-auto-complete__value-container').type(this.datos.materia)
            cy.get('#react-select-2-option-0').click()
            cy.get('.subjects-auto-complete__value-container').should('contain.text', this.datos.materia)
            cy.get('div[class = "custom-control custom-checkbox custom-control-inline"]:has(label:contains("' + this.datos.hobbies[0] + '")) input').check({ force: true }).should('be.checked')
            cy.get('div[class = "custom-control custom-checkbox custom-control-inline"]:has(label:contains("' + this.datos.hobbies[1] + '")) input').check({ force: true }).should('be.checked')

            cy.fixture(this.datos.imagen).as('imagen')

            cy.get('#uploadPicture').then(function ($el) {
                //convertir la imagen en un string de base64
                // conversión de: https://www.base64-image.de/
                const blob = Cypress.Blob.base64StringToBlob(this.imagen, 'image/jpg')

                const file = new File([Blob], this.datos.imagen, { type: 'image/jpg' })
                const list = new DataTransfer()

                list.items.add(file)
                const file_list = list.files
                $el[0].files = file_list
                $el[0].dispatchEvent(new Event('change', { bubbles: true }))
            })

            cy.get('#currentAddress').type(this.datos.direccion)

            cy.get('#state').click().find('div:contains("' + this.datos.estado + '")[id^="react-select"]').should('be.visible').click()
            cy.get('#city').click().find('div:contains("' + this.datos.ciudad + '")[id^="react-select"]').should('be.visible').click()
            cy.get('#submit').click()

            //ASERCIONES

            cy.get('#example-modal-sizes-title-lg')
                .should('have.text', 'Thanks for submitting the form')

            cy.get('td:contains("Student Name") +td')
                .should('have.text', this.datos.nombre + " " + this.datos.apellido)

            cy.get('td:contains("Student Email") +td')
                .should('have.text', this.datos.email)

            cy.get('td:contains("Gender") +td')
                .should('have.text', this.datos.sexo)

            cy.get('td:contains("Mobile") +td')
                .should('have.text', this.datos.tel)

            cy.get('td:contains("Date of Birth") +td')
                .should('have.text', this.datos.fecha_nacimiento[2] + " " + this.datos.fecha_nacimiento[0] + "," + this.datos.fecha_nacimiento[1])

            cy.get('td:contains("Subjects") +td')
                .should('have.text', this.datos.materia)

            cy.get('td:contains("Hobbies") +td')
                .should('have.text', this.datos.hobbies[0] + "," + " " + this.datos.hobbies[1])

            cy.get('td:contains("Picture") +td')
                .should('have.text', this.datos.imagen)

            cy.get('td:contains("Address") +td')
                .should('have.text', this.datos.direccion)

            cy.get('td:contains("State and City") +td')
                .should('have.text', this.datos.estado + " " + this.datos.ciudad)

        })
    })
})