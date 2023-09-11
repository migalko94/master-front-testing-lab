describe('Login specs', () => {
  it('visit the login page', () => {
    cy.visit('/');
  });

  it('should name input has the focus when it clicks on it - user', () => {
    // Arrange

    // Act
    cy.visit('/');
    cy.findByRole('textbox').click();

    // Assert
    cy.findByRole('textbox').should('have.focus');
  });

  it('should show an error message when leaving empty user input', () => {
    // Arrange
    const user = 'admin';
    // Act
    cy.visit('/');
    cy.findByLabelText('Usuario *').as('userInput');

    cy.get('@userInput').type(user).clear();
    cy.findByLabelText('Contraseña *').click();

    // Assert

    cy.findByText('Debe informar el campo');
  });

  it('should show an error message when leaving empty password input', () => {
    // Arrange
    const password = 'test';
    // Act
    cy.visit('/');
    cy.findByLabelText('Contraseña *').as('passwordInput');

    cy.get('@passwordInput').type(password).clear();
    cy.findByLabelText('Usuario *').click();

    // Assert

    cy.findByText('Debe informar el campo');
  });

  it('should show an error message when login with empty user input', () => {
    // Arrange
    const user = 'admin';
    // Act
    cy.visit('/');
    cy.findByLabelText('Usuario *').as('userInput');

    cy.get('@userInput').type(user);
    cy.findByRole('button').click();

    // Assert

    cy.findByText('Debe informar el campo');
  });

  it('should show an error message when login with empty password input', () => {
    // Arrange
    const password = 'test';
    // Act
    cy.visit('/');
    cy.findByLabelText('Contraseña *').as('passwordInput');

    cy.get('@passwordInput').type(password);
    cy.findByRole('button').click();

    // Assert

    cy.findByText('Debe informar el campo');
  });

  it('should name input has the focus when it clicks on it - password', () => {
    // Arrange

    // Act
    cy.visit('/');
    cy.findByLabelText('Contraseña *').click();

    // Assert
    cy.findByLabelText('Contraseña *').should('have.focus');
  });

  it('should navigate to submodule list url when type valid credentials', () => {
    // Arrange
    const user = 'admin';
    const password = 'test';

    // Act
    cy.visit('/');
    cy.findByLabelText('Usuario *').as('userInput');
    cy.findByLabelText('Contraseña *').as('passwordInput');

    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);
    cy.findByRole('button').click();

    // Assert
    cy.url().should('equal', 'http://localhost:8080/#/submodule-list');
  });
});

it('should show an alert with a message when type invalid credentials', () => {
  // Arrange
  const user = 'admin';
  const password = '1234';

  // Act
  cy.visit('/');
  cy.findByRole('textbox').as('userInput');
  cy.findByLabelText('Contraseña *').as('passwordInput');

  cy.get('@userInput').type(user);
  cy.get('@passwordInput').type(password);
  cy.findByRole('button', { name: 'Login' }).click();

  // Assert
  cy.get('@userInput').should('have.value', user);
  cy.get('@passwordInput').should('have.value', password);
  cy.findByRole('alert');
  cy.findByText('Usuario y/o password no válidos');
});
