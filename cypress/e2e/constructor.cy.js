/// <reference types="cypress" />

const BASE_URL = 'http://localhost:4000';

describe('Burger constructor flow', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.visit(BASE_URL);
    cy.wait('@getIngredients');
  });

  it('adds bun and filling to constructor', () => {
    cy.contains('li', 'Флюоресцентная булка R2-D3').find('button').click();
    cy.contains('li', 'Сыр с астероидной плесенью').find('button').click();

    cy.contains('section', 'Оформить заказ')
      .should('contain.text', 'Флюоресцентная булка R2-D3')
      .and('contain.text', 'Сыр с астероидной плесенью');
  });

  it('opens and closes ingredient modal', () => {
    cy.contains('li', 'Флюоресцентная булка R2-D3').find('a').click();
    cy.contains('h3', 'Детали ингредиента').should('exist');
    cy.get('button').contains('×').click({ force: true });
    cy.contains('h3', 'Детали ингредиента').should('not.exist');
  });

  it('creates order and clears constructor', () => {
    cy.setCookie('accessToken', 'test');
    cy.window().then((win) => win.localStorage.setItem('refreshToken', 'test'));

    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as('createOrder');

    cy.contains('li', 'Флюоресцентная булка R2-D3').find('button').click();
    cy.contains('li', 'Сыр с астероидной плесенью').find('button').click();

    cy.contains('button', 'Оформить заказ').click();
    cy.wait('@createOrder');

    cy.contains('h2', '1991').should('exist');
    cy.get('button').contains('×').click({ force: true });

    cy.contains('section', 'Оформить заказ').should('not.contain', 'Сыр с астероидной плесенью');
  });
});
