describe('Smoke Test', () => {
    it('displays the welcome message', () => {
        cy.visit('http://localhost:1234')
            .contains('Hello, world!');
    });
});
