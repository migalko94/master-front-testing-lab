import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialog component specs', () => {
  it('should display a dialog when its open atributte is true', () => {
    // Arrange
    const props = {
      onAccept: () => {},
      onClose: () => {},
      isOpen: true,
      title: 'test',
      labels: {
        closeButton: 'test 1',
        acceptButton: 'test 2',
      },
      children: 123,
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);
    const dialogElement = screen.getByRole('dialog');

    // Assert
    expect(dialogElement).toBeInTheDocument();
  });

  it('should not display a dialog when its open atributte is false', () => {
    // Arrange
    const props = {
      onAccept: () => {},
      onClose: () => {},
      isOpen: false,
      title: 'test',
      labels: {
        closeButton: 'test 1',
        acceptButton: 'test 2',
      },
      children: 123,
    };
    // Act
    render(<ConfirmationDialogComponent {...props} />);
    const dialogElement = screen.queryByRole('dialog');
    // Assert
    expect(dialogElement).not.toBeInTheDocument();
  });

  it('should display two buttons when dialog open atributte is true', () => {
    // Arrange
    const props = {
      onAccept: () => {},
      onClose: () => {},
      isOpen: true,
      title: 'test',
      labels: {
        closeButton: 'test 1',
        acceptButton: 'test 2',
      },
      children: 123,
    };
    // Act
    render(<ConfirmationDialogComponent {...props} />);
    const buttons = screen.getAllByRole('button');
    const closeButton = buttons[0];
    const acceptButton = buttons[1];

    // Assert
    expect(closeButton).toBeInTheDocument();
    expect(acceptButton).toBeInTheDocument();
  });

  it('should not display buttons when dialog open atributte is false', () => {
    // Arrange
    const props = {
      onAccept: () => {},
      onClose: () => {},
      isOpen: false,
      title: 'test',
      labels: {
        closeButton: 'test 1',
        acceptButton: 'test 2',
      },
      children: 123,
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);
    const button = screen.queryByRole('button');

    // Assert
    expect(button).not.toBeInTheDocument();
  });

  it('should display a title dialog text when dialog open atributte is true', () => {
    // Arrange
    const props = {
      onAccept: () => {},
      onClose: () => {},
      isOpen: true,
      title: 'test title',
      labels: {
        closeButton: 'test 1',
        acceptButton: 'test 2',
      },
      children: 123,
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);
    const titleElement = screen.getByText('test title');

    // Assert
    expect(titleElement).toBeInTheDocument();
  });

  it('should display content text when dialog open atributte is true', () => {
    // Arrange
    const props = {
      onAccept: () => {},
      onClose: () => {},
      isOpen: true,
      title: 'test title',
      labels: {
        closeButton: 'test 1',
        acceptButton: 'test 2',
      },
      children: 'test content',
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);
    const contentElement = screen.getByText('test content');

    // Assert
    expect(contentElement).toBeInTheDocument();
  });

  it('should call onClose when it clicks on "close" button given isOpen is true', async () => {
    // Arrange
    const props = {
      onAccept: () => {},
      onClose: jest.fn(),
      isOpen: true,
      title: 'test',
      labels: {
        closeButton: 'test 1',
        acceptButton: 'test 2',
      },
      children: 123,
    };
    // Act
    render(<ConfirmationDialogComponent {...props} />);
    const buttons = screen.getAllByRole('button');
    const closeButton = buttons[0];
    await userEvent.click(closeButton);

    // Assert
    expect(props.onClose).toHaveBeenCalled();
  });

  it('should call onAccept when it clicks on "accept" button given isOpen is true', async () => {
    // Arrange
    const props = {
      onAccept: jest.fn(),
      onClose: () => {},
      isOpen: true,
      title: 'test',
      labels: {
        closeButton: 'test 1',
        acceptButton: 'test 2',
      },
      children: 123,
    };
    // Act
    render(<ConfirmationDialogComponent {...props} />);
    const buttons = screen.getAllByRole('button');
    const acceptButton = buttons[1];
    await userEvent.click(acceptButton);

    // Assert
    expect(props.onAccept).toHaveBeenCalled();
  });
});
