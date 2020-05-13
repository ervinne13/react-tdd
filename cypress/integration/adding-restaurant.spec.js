describe('adding a restaurant', () => {
    it('displays the added restuarant in the list', () => {
        const restaurant = 'Seafood Island';

        cy.visit('http://localhost:1234');
        cy.get('[data-action="create-restaurant"]')
            .click();

        cy.get('[name="name"]')
            .type(restaurant);

        cy.get('[data-action="store-restaurant"]')
            .click();

        cy.contains(restaurant);
    });
});
