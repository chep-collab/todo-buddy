describe('Todo App UI Tests', () => {
  const baseUrl = 'http://localhost:5182';

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.login('admin', 'password'); // Custom command in commands.js
  });

  it('should login with valid credentials', () => {
    cy.url().should('include', '/todos');
    cy.contains('Todo List').should('be.visible');
    cy.get('input[placeholder="Title"]').should('be.visible');
    cy.get('input[placeholder="Description"]').should('be.visible');
  });

  it('should fail login with invalid credentials', () => {
    cy.visit(baseUrl);
    cy.get('input[placeholder="Username"]').type('wrong');
    cy.get('input[placeholder="Password"]').type('wrong');
    cy.get('button').contains('Login').click();
    cy.contains('Invalid credentials').should('be.visible');
  });

  it('should fetch and display todos on page load', () => {
    cy.contains('Todo List').should('be.visible');
    cy.get('input[placeholder="Title"]').should('be.visible');
    cy.get('input[placeholder="Description"]').should('be.visible');
  });

  it('should create a new todo', () => {
    const uniqueTitle = `Test Todo ${Date.now()}`;
    cy.get('input[placeholder="Title"]').type(uniqueTitle);
    cy.get('input[placeholder="Description"]').type('Test Description');
    cy.get('button').contains('Create Todo').click();
    cy.contains(`${uniqueTitle} - Test Description`).should('be.visible');
  });

  it('should edit an existing todo', () => {
    const uniqueTitle = `Editable Todo ${Date.now()}`;
    const editedTitle = 'Edited Todo';
    const editedDescription = 'Edited Description';

    // Create
    cy.get('input[placeholder="Title"]').type(uniqueTitle);
    cy.get('input[placeholder="Description"]').type('To Edit');
    cy.get('button').contains('Create Todo').click();
    cy.contains(`${uniqueTitle} - To Edit`).should('be.visible');

    // Intercept and Edit
    cy.intercept('PUT', '**/todos/*').as('updateTodo');
    cy.contains(uniqueTitle)
      .parent()
      .find('button')
      .contains('Edit')
      .click();
    cy.get('input[placeholder="Title"]').last().clear().type(editedTitle);
    cy.get('input[placeholder="Description"]').last().clear().type(editedDescription);
    cy.get('button').contains('Update Todo').click();
    cy.wait('@updateTodo');

    // Verify
    cy.contains(`${editedTitle} - ${editedDescription}`).should('be.visible');
    cy.contains(`${uniqueTitle} - To Edit`).should('not.exist');
  });

  it('should delete a todo', () => {
    const uniqueTitle = `Delete Me ${Date.now()}`;

    // Create
    cy.get('input[placeholder="Title"]').type(uniqueTitle);
    cy.get('input[placeholder="Description"]').type('To be deleted');
    cy.get('button').contains('Create Todo').click();
    cy.contains(uniqueTitle).should('be.visible');

    // Intercept and Delete
    cy.intercept('DELETE', '**/todos/*').as('deleteTodo');
    cy.contains(uniqueTitle)
      .parent()
      .find('button')
      .contains('Delete')
      .click();
    cy.wait('@deleteTodo');

    // Verify
    cy.contains(uniqueTitle).should('not.exist');
  });
});
