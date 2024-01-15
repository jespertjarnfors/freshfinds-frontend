import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

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
      image: product.image
    };
    setCart([...cart, cartItem]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const editCartItem = (index, newQuantity) => {
    setCart(currentCart => 
      currentCart.map((item, i) => {
        if (i === index && newQuantity <= item.initialQuantity) {
          return { 
            ...item, 
            quantity: newQuantity, 
            totalPrice: newQuantity * item.unitPrice 
          };
        }
        return item;
      })
    );
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, editCartItem }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
