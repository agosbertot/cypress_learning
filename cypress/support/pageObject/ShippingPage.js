

class ShippingPage {

    getTermsOfServiceCheckbox(){
        return  cy.get('#cgv')
     }

     getProceedToCheckoutBtn(){
        return cy.get('.cart_navigation > .button')
     }
    
}

export default ShippingPage;