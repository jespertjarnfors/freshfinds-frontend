import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
    const cartItem = {
      seller: product.seller,
      name: product.name,
      quantity,
      totalPrice: quantity * product.price, // Price is per kg
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

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
