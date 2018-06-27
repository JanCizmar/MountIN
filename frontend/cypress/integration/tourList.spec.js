describe('Tour list test', function () {
    it('clicks the link "type"', function () {
        cy.visit('localhost:8000');

        cy.contains('List').click();
        cy.url().should('include', '/list');
        cy.get('#location')
            .type('München')
            .should('have.value', 'München');
        cy.get('.autocomplete-dropdown-container .suggestion-item').first().click()

    })
});