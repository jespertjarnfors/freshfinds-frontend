import UserNavBar from '../components/UserNavBar';
import ShippingForm from '../components/Checkout/ShippingForm';
import ProgressBar from '../components/Checkout/ProgressBar';
import PaymentForm from '../components/Checkout/PaymentForm';
import OrderSummary from '../components/Checkout/OrderSummary';
import OrderConfirmation from '../components/Checkout/OrderConfirmation';
import { CheckoutProvider, useCheckout } from '../contexts/CheckoutContext';

const CheckoutContent = () => {
    const { currentStep } = useCheckout();

    switch (currentStep) {
        case 'shipping':
            return <ShippingForm />;
        case 'payment':
            return <PaymentForm />;
        case 'confirmation':
            return <OrderConfirmation />;
        default:
            return null; // Or some default component
    }
};

const Checkout = () => {
    const { currentStep } = useCheckout();

    return (
        <div>
                <UserNavBar />
                <ProgressBar />
                <div className="flex flex-row justify-center space-x-2">
                    <div className="mt-4">
                        <CheckoutContent />
                    </div>
                    {currentStep !== 'confirmation' && (
                        <div className="mt-4">
                            <OrderSummary />
                        </div>
                    )}
                </div>
        </div>
    );
};

export default Checkout;
