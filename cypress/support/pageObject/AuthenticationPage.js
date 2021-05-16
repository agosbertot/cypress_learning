
class AuthenticationPage{

    getEmailInput() {
        return  cy.get('#email')
    }

    getPasswdInput() {
        return   cy.get('#passwd')
    }

    getSubmitLoginBtn() {
        return   cy.get('#SubmitLogin')
    }

}

export default AuthenticationPage;