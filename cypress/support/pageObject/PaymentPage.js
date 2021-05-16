
class PaymentPage {

    getPayByBankWireBtn(){
        return  cy.get('.bankwire')
     }

     getConfirmMyOrderBtn(){
        return cy.get('#cart_navigation > .button')
     }

     getDescriptionTitleText(){
      return cy.get('.cheque-indent > .dark')
   }
    
}

export default PaymentPage;