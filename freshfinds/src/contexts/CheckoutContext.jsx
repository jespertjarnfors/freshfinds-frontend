import { createContext, useState, useContext } from 'react';

const CheckoutContext = createContext();

export const useCheckout = () => useContext(CheckoutContext);

export const CheckoutProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState('shipping');
  const [orderIds, setOrderIds] = useState([]); // Add this state variable for order IDs

  const moveToShipping = () => {
    setCurrentStep('shipping');
  };

  const moveToPayment = () => {
    setCurrentStep('payment');
  };

  const moveToConfirmation = (orderIds) => { // Update moveToConfirmation to accept orderIds
    setOrderIds(orderIds); // Set the order IDs in the context
    setCurrentStep('confirmation');
  };

  return (
    <CheckoutContext.Provider value={{ currentStep, moveToShipping, moveToPayment, moveToConfirmation, orderIds }}>
      {children}
    </CheckoutContext.Provider>
  );
};
