import { createContext, useState, useContext } from 'react';

const CheckoutContext = createContext();

export const useCheckout = () => useContext(CheckoutContext);

export const CheckoutProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState('shipping');
  const [shippingData, setShippingData] = useState({});
  const [paymentData, setPaymentData] = useState({});

  const moveToPayment = (data) => {
    setShippingData(data);
    setCurrentStep('payment');
  };

  const moveToConfirmation = (data) => {
    setPaymentData(data);
    setCurrentStep('confirmation');
  };

  return (
    <CheckoutContext.Provider value={{ currentStep, moveToPayment, moveToConfirmation, shippingData, paymentData }}>
      {children}
    </CheckoutContext.Provider>
  );
};
