import { act, renderHook } from '@testing-library/react';
import { Lookup } from 'common/models';
import { useConfirmationDialog } from './confirmation-dialog.hook';

describe('useConfirmationDialog specs', () => {
  it('should return a boolean: isOpen with default value false', () => {
    // Arrange

    // Act

    const { result } = renderHook(() => useConfirmationDialog());

    // Assert
    const defaultIsOpen: boolean = false;
    expect(result.current.isOpen).toEqual(defaultIsOpen);
  });
  it('should return an object: itemToDelete with default value createEmptyLookup()', () => {
    // Arrange

    // Act

    const { result } = renderHook(() => useConfirmationDialog());

    // Assert
    const defaultItemToDelete: Lookup = {
      id: '',
      name: '',
    };
    expect(result.current.itemToDelete).toEqual(defaultItemToDelete);
  });

  it('should return onAccept, onClose, and onOpenDialog functions', () => {
    // Arrange

    // Act

    const { result } = renderHook(() => useConfirmationDialog());

    // Assert
    expect(result.current.onAccept).toEqual(expect.any(Function));
    expect(result.current.onClose).toEqual(expect.any(Function));
    expect(result.current.onOpenDialog).toEqual(expect.any(Function));
  });

  it('should update itemToDelete to createEmptyLookup() result itemToDelete using onAccept', () => {
    // Arrange

    const newItemToDelete: Lookup = {
      id: '',
      name: '',
    };

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onAccept();
    });

    // Assert

    expect(result.current.itemToDelete).toEqual(newItemToDelete);
  });

  it('should update isOpen to true, and itemToDelete to item using onOpenDialog', () => {
    // Arrange
    const item: Lookup = {
      id: '1',
      name: 'John Doe',
    };
    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog(item);
    });

    // Assert

    expect(result.current.isOpen).toEqual(true);
    expect(result.current.itemToDelete).toEqual(item);
  });

  it('should update isOpen to false using onClose. As initial value of isOpen is false, we first use onOpenDialog', () => {
    // Arrange
    const item: Lookup = {
      id: '1',
      name: 'John Doe',
    };
    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog(item);
      result.current.onClose();
    });

    // Assert

    expect(result.current.isOpen).toEqual(false);
  });
});
