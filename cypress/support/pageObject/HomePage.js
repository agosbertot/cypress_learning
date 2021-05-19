
class HomePage {
    //generamos los elementos que contiene la pagina 
    getSearchBoxInput() {
        return  cy.get('#search_query_top')
    }

    getSearchBoxBtn(){
        return  cy.get('#searchbox > .btn')
    }

    getAddToCartElementBtn(product){
       return cy.get('.product-container:has(.product-name[title="'+product+'"]) .ajax_add_to_cart_button')
    }

    getProceedToCheckoutBtn(){
        return cy.get('.button-container > .button-medium > span')
     }
    
}

export default HomePage;
