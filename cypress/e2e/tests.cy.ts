/// <reference types="Cypress" />

beforeEach(() => {
  cy.visit('http://localhost:3000');
});

describe('initial render', () => {
  it('6 todo items just be displayed', () => {
    cy.get('[data-cy="todo-item"]').should('have.length', 6);
  });

  it('color theme should be set to dark mode by default', () => {
    cy.get('[data-cy="body-bg"]').should('have.class', 'body-dark');
    cy.get('[data-cy="todo-item"]').should('have.class', 'card-dark');

  });
});

describe('color theme', () => {
  it('clicking on the color theme switch should switch the color theme from light mode to dark mode and vice versa', () => {
    cy.get('[data-cy="body-bg"]').should('have.class', 'body-dark');
    cy.get('[data-cy="todo-item"]').should('have.class', 'card-dark');
    cy.get('[data-cy="color-theme-switch"]').click();
    cy.get('[data-cy="body-bg"]').should('have.class', 'body-light');
    cy.get('[data-cy="todo-item"]').should('have.class', 'card-light');
    cy.get('[data-cy="color-theme-switch"]').click();
    cy.get('[data-cy="body-bg"]').should('have.class', 'body-dark');
    cy.get('[data-cy="todo-item"]').should('have.class', 'card-dark');
  });

  it('when dark mode is active, the color theme switch is an icon of the sun', () => {
    cy.get('[data-cy="color-theme-switch"]').should('have.attr', 'src', '/static/media/icon-sun.910b1f9a23741afc341e95653a51f14f.svg');
  });

  it('when light mode is active, the color theme switch is an icon of the moon', () => {
    cy.get('[data-cy="color-theme-switch"]').click();
    cy.get('[data-cy="color-theme-switch"]').should('have.attr', 'src', '/static/media/icon-moon.6c03114b495d05f4380b3c544d9afe2a.svg');
  });
});

describe('adding a todo item', () => {
  it('a new todo item should be added to the top of the todos list', () => {
    cy.get('[data-cy="create-new-todo"]').type('do laundry');
    cy.get('[data-cy="add-btn"').click();
    cy.get('[data-cy="todo-item"]').should('have.length', 7);
    cy.get('[data-cy="todo-item"]').eq(0).should('contain', 'Do laundry');
  });

  it('the first letter of the first word of the todo item should be capitalized by default', () => {
    cy.get('[data-cy="create-new-todo"]').type('pick up mail');
    cy.get('[data-cy="add-btn"').click();
    cy.get('[data-cy="todo-item"]').eq(0).should('contain', 'Pick up mail');

  });
});

describe('deleting a todo item', () => {
  it('clicking on a todo item\'s cross icon should delete it from the todos list', () => {
    cy.get('[data-cy="todo-item"]').eq(5).should('contain', 'Complete Todo App');
    cy.get('[data-cy="delete-btn"]').eq(5).click();
    cy.get('[data-cy="todo-item"]').contains('Complete Todo App').should('not.exist');
    cy.get('[data-cy="todo-item"]').should('have.length', 5);

    cy.get('[data-cy="todo-item"]').eq(2).should('contain', '10 minutes meditation');
    cy.get('[data-cy="delete-btn"]').eq(2).click();
    cy.get('[data-cy="todo-item"]').contains('10 minutes meditation').should('not.exist');
    cy.get('[data-cy="todo-item"]').should('have.length', 4);

  });
});

describe('updating a todo item', () => {
  it('clicking on a todo item\'s bullet should mark the todo as completed, therefore adding a strikethrough effect to the todo text', () => {
    cy.get('[data-cy="todo-item-bullet"]').eq(5).click();
    cy.get('[data-cy="todo-item-text').eq(5).should('have.css', 'text-decoration', 'line-through solid rgb(118, 121, 146)');
  });

  it('clicking on a todo item\'s bullet should mark the todo as completed, therefore changing the todo object\'s completed property', () => {
    cy.get('[data-cy="todo-item-bullet"]').eq(0).click();
    cy.get('[data-cy="todo-item"]').eq(0).should('have.attr', 'data-completed', 'true');
    cy.get('[data-cy="todo-item-bullet"]').eq(0).click();
    cy.get('[data-cy="todo-item"]').eq(0).should('have.attr', 'data-completed', 'false');
  });
});

describe('filtering todo items', () => {
  it('the Completed tab should display all completed todos', () => {
    cy.get('[data-cy="todo-item-bullet"]').eq(1).click();
    cy.get('[data-cy="todo-item-bullet"]').eq(3).click();
    cy.get('[data-cy="todo-item-bullet"]').eq(4).click();
    cy.get('[data-cy="completed-filter"]').click();
    cy.get('[data-cy="todo-item"]').should('have.length', 3);
  });

  it('the Active tab should display todos that have not yet been completed', () => {
    cy.get('[data-cy="todo-item-bullet"]').eq(2).click();
    cy.get('[data-cy="todo-item-bullet"]').eq(3).click();
    cy.get('[data-cy="active-filter"]').click();
    cy.get('[data-cy="todo-item"]').should('have.length', 4);
  });

  it('the All tab should display all todo items whether completed or not', () => {
    cy.get('[data-cy="todo-item-bullet"]').eq(0).click();
    cy.get('[data-cy="todo-item-bullet"]').eq(1).click();
    cy.get('[data-cy="todo-item-bullet"]').eq(3).click();
    cy.get('[data-cy="todo-item-bullet"]').eq(4).click();
    cy.get('[data-cy="todo-item-bullet"]').eq(5).click();
    cy.get('[data-cy="completed-filter"]').click();
    cy.get('[data-cy="todo-item"]').should('have.length', 5);
    cy.get('[data-cy="all-filter"]').click();
    cy.get('[data-cy="todo-item"]').should('have.length', 6);
  });
});

it('clicking on Clear Completed should clear all completed todos', () => {
  cy.get('[data-cy="todo-item-bullet"]').eq(0).click();
  cy.get('[data-cy="todo-item-bullet"]').eq(1).click();
  cy.get('[data-cy="todo-item-bullet"]').eq(3).click();
  cy.get('[data-cy="todo-item-bullet"]').eq(4).click();
  cy.get('[data-cy="todo-item-bullet"]').eq(5).click();
  cy.get('[data-cy="clear-completed"').click();
  cy.get('[data-cy="todo-item"]').eq(0).should('have.attr', 'data-completed', 'false');
  cy.get('[data-cy="todo-item"]').eq(1).should('have.attr', 'data-completed', 'false');
  cy.get('[data-cy="todo-item"]').eq(3).should('have.attr', 'data-completed', 'false');
  cy.get('[data-cy="todo-item"]').eq(4).should('have.attr', 'data-completed', 'false');
  cy.get('[data-cy="todo-item"]').eq(5).should('have.attr', 'data-completed', 'false');
});

it('"number of items left" should reflect the number of todos that have not been completed', () => {
  cy.get('[data-cy="todo-item-bullet"]').eq(0).click();
  cy.get('[data-cy="todo-item-bullet"]').eq(1).click();
  cy.get('[data-cy="todo-item-bullet"]').eq(3).click();
  cy.get('[data-cy="todo-item-bullet"]').eq(4).click();
  cy.get('[data-cy="todo-item-bullet"]').eq(5).click();
  cy.get('[data-cy="items-left"]').should('contain', '1 item left');
});

describe('reordering the todo list', () => {
  it('dragging a todo item and dropping it over another todo item should swap the two todos', () => {
    const dataTransfer = new DataTransfer;

    cy.get('[data-cy="todo-item"]')
      .eq(0)
      .trigger('dragstart', { dataTransfer });

    cy.get('[data-cy="todo-item"]')
      .eq(2)
      .trigger('dragenter')
      .trigger('dragover', { dataTransfer })
      .trigger('drop', { dataTransfer })

    cy.get('[data-cy="todo-item"]')
      .eq(0)
      .trigger('dragend', { force: true });

    cy.get('[data-cy="todo-item"]').eq(2).should('contain', 'Complete online JavaScript course');
    cy.get('[data-cy="todo-item"]').eq(0).should('contain', '10 minutes meditation');

    cy.get('[data-cy="todo-item"]')
      .eq(4)
      .trigger('dragstart', { dataTransfer });

    cy.get('[data-cy="todo-item"]')
      .eq(5)
      .trigger('dragenter')
      .trigger('dragover', { dataTransfer })
      .trigger('drop', { dataTransfer })

    cy.get('[data-cy="todo-item"]')
      .eq(4)
      .trigger('dragend', { force: true });

    cy.get('[data-cy="todo-item"]').eq(4).should('contain', 'Complete Todo App');
    cy.get('[data-cy="todo-item"]').eq(5).should('contain', 'Pick up groceries');
  });
});