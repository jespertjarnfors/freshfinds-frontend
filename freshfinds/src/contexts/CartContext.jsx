import { createContext, useState, useContext } from "react";

const CartContext = createContext();

// Hook for easy access to the CartContext
export const useCart = () => useContext(CartContext);

// Provides cart-related functionalities and state to its children components
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Adds a new item to the cart with additional product details
  const addToCart = (product, quantity, productId) => {
    const cartItem = {
      productId,
      seller: product.seller,
      name: product.name,
      quantity,
      initialQuantity: product.quantity, // Save the initial available quantity
      unitPrice: product.price, // Save the unit price
      totalPrice: quantity * product.price, // Calculate total price
      deliveryMethod: product.deliveryMethod,
      icon: product.icon,
      image: product.image,
    };
    setCart([...cart, cartItem]);
  };

  // Removes an item from the cart by its index
  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  // Edits the quantity of an existing cart item and updates the total price
  const editCartItem = (index, newQuantity) => {
    setCart((currentCart) =>
      currentCart.map((item, i) => {
        if (i === index && newQuantity <= item.initialQuantity) {
          return {
            ...item,
            quantity: newQuantity,
            totalPrice: newQuantity * item.unitPrice,
          };
        }
        return item;
      })
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, removeFromCart, editCartItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
