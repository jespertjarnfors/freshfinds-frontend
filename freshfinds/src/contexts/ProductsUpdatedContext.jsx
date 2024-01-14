import { useState, createContext, useContext } from 'react';

const ProductsUpdatedContext = createContext();

export const useProductsUpdated = () => useContext(ProductsUpdatedContext);

export const ProductsUpdatedProvider = ({ children }) => {
  const [productsUpdated, setProductsUpdated] = useState(false);

  return (
    <ProductsUpdatedContext.Provider value={{ productsUpdated, setProductsUpdated }}>
      {children}
    </ProductsUpdatedContext.Provider>
  );
};
