import { useEffect } from 'react';
import UserNavBar from '../components/UserNavBar';
import ShippingForm from '../components/Checkout/ShippingForm';
import ProgressBar from '../components/Checkout/ProgressBar';
import PaymentForm from '../components/Checkout/PaymentForm';
import OrderSummary from '../components/Checkout/OrderSummary';
import OrderConfirmation from '../components/Checkout/OrderConfirmation';
import { useCheckout } from '../contexts/CheckoutContext';

const CheckoutContent = () => {
    // Get the current step from the CheckoutContext
    const { currentStep } = useCheckout();

    // Render the appropriate component based on the current step
    switch (currentStep) {
        case 'shipping':
            return <ShippingForm />;
        case 'payment':
            return <PaymentForm />;
        case 'confirmation':
            return <OrderConfirmation />;
        default:
            return null;
    }
};

const Checkout = () => {
    const { currentStep, moveToShipping } = useCheckout();

    useEffect(() => {
        return () => {
            // Reset checkout to 'shipping' when the Checkout component unmounts and currentStep is 'confirmation'
            if (currentStep === 'confirmation') {
                moveToShipping();
            }
        };
    }, [currentStep]);

    return (
        <div>
                <UserNavBar />
                <ProgressBar />
                <div className="flex flex-col xl:flex-row justify-center">
                    <div className="mt-4 w-4/5 flex flex-col justify-center xl:flex-row mx-auto xl:ml-0">
                        <CheckoutContent />
                        {currentStep !== 'confirmation' && (
                        <div className="hidden md:block ml-2">
                            <OrderSummary />
                        </div>
                    )}
                    </div>
                </div>
        </div>
    );
};

export default Checkout;
