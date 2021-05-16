
class ShoppingCartSummary{

    getProductNameText() {
        return  cy.get('tr[id^="product"]').find('.product-name > a')
    }

    getProductPriceText() {
        return   cy.get('tr[id^="product"]').find('.price')
    }

    getProceedToCheckoutBtn() {
        return   cy.get('.cart_navigation > .button')
    }

}

export default ShoppingCartSummary;