import { CartProvider, useCart } from '@/contexts/CatrContext';
import { renderHook, act } from '@testing-library/react-hooks';


describe('CartContext', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(Storage.prototype, 'setItem'); // Optional: spy on setItem for specific checks
    jest.spyOn(Storage.prototype, 'getItem'); // Optional: spy on getItem for specific checks
  });

  afterEach(() => {
    localStorage.clear();
    jest.restoreAllMocks(); // Clean up spies to ensure no leakage between tests
  });

  it('should add items to the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const newItem = { id: '1', name: 'Item 1', price: 100, quantity: 1, size: 'M', color: 'red' };

    act(() => {
      result.current.addToCart(newItem);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0]).toEqual(newItem);
  });

  it('should remove items from the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const newItem = { id: '1', name: 'Item 1', price: 100, quantity: 1, size: 'M', color: 'red' };

    act(() => {
      result.current.addToCart(newItem);
    });

    act(() => {
      result.current.removeFromCart(newItem.id);
    });

    expect(result.current.cart).toHaveLength(0);
  });

  it('should update item quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const newItem = { id: '1', name: 'Item 1', price: 100, quantity: 1, size: 'M', color: 'red' };

    act(() => {
      result.current.addToCart(newItem);
    });

    act(() => {
      result.current.updateQuantity('1', 5);
    });

    expect(result.current.cart[0].quantity).toBe(5);
  });

  it('should clear the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const newItem1 = { id: '1', name: 'Item 1', price: 100, quantity: 1, size: 'M', color: 'red' };
    const newItem2 = { id: '2', name: 'Item 2', price: 200, quantity: 2, size: 'L', color: 'blue' };

    act(() => {
      result.current.addToCart(newItem1);
      result.current.addToCart(newItem2);
    });

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.cart).toHaveLength(0);
  });

  it('should add an item with a different size or color', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const item1 = { id: '1', name: 'Item 1', price: 100, quantity: 1, size: 'M', color: 'red' };
    const item2 = { id: '1', name: 'Item 1', price: 100, quantity: 1, size: 'L', color: 'blue' };

    act(() => {
      result.current.addToCart(item1);
      result.current.addToCart(item2);
    });

    expect(result.current.cart).toHaveLength(2);
    expect(result.current.cart).toEqual([item1, item2]);
  });

  it('should update quantity when adding identical item', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const item = { id: '1', name: 'Item 1', price: 100, quantity: 1, size: 'M', color: 'red' };

    act(() => {
      result.current.addToCart(item);
      result.current.addToCart({ ...item, quantity: 2 }); // Add the same item with an additional quantity
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].quantity).toBe(3); // Ensure the quantity is updated to 3
  });

  it('should not remove an item that does not exist in the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.removeFromCart('non-existent-id');
    });

    expect(result.current.cart).toHaveLength(0); // Ensure cart remains empty
  });

  it('should remove item when quantity is set to 0', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const item = { id: '1', name: 'Item 1', price: 100, quantity: 1, size: 'M', color: 'red' };

    act(() => {
      result.current.addToCart(item);
    });

    act(() => {
      result.current.updateQuantity('1', 0); // Set quantity to 0
    });

    expect(result.current.cart).toHaveLength(0); // Item should be removed from cart
  });

  it('should persist cart in local storage', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const newItem = { id: '1', name: 'Item 1', price: 100, quantity: 1, size: 'M', color: 'red' };

    act(() => {
      result.current.addToCart(newItem);
    });

    // Ensure localStorage has the correct data
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([newItem]));

    // Simulate reloading the cart from localStorage
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    expect(storedCart).toHaveLength(1);
    expect(storedCart[0]).toEqual(newItem);
  });

  it('should throw an error when used without CartProvider', () => {
    // This test should throw the defined error
    const { result } = renderHook(() => useCart());

    // Expect the result to throw an error with the message defined in useCart
    expect(result.error).toEqual(
      new Error('useCart must be used within a CartProvider')
    );
  });
});
