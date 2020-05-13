describe('adding a restaurant', () => {
    it('displays the added restuarant in the list', () => {
        const restaurant = 'Seafood Island';

        cy.visit('http://localhost:1234');

        cy.get('.restaurant-form')
            .should('not.exist');

        cy.get('.restaurant-list [data-action="create"]')
            .click();

        cy.get('[name="name"]')
            .type(restaurant);

        cy.get('.restaurant-form [data-action="save"]')
            .click();

        cy.get('.restaurant-list')
            .contains(restaurant);

        cy.get('.restaurant-form')
            .should('not.exist');
    });
});
