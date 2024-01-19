import { useCheckout } from "../../contexts/CheckoutContext";

const ProgressBar = () => {
    // Access the currentStep from the CheckoutContext
    const { currentStep } = useCheckout();

    // Function to determine if the step is the current step
    const isCurrent = (step) => {
      return currentStep === step;
    };

    // Function to determine the width of the connecting line, and how it progresses for each step
    const lineClass = () => {
      if (currentStep === 'payment') return 'w-1/2';
      if (currentStep === 'confirmation') return 'w-full';
      return 'w-0';
    };

    return (
        <div className="mt-8 flex flex-col items-center">
            <div className="flex justify-between w-2/4 mb-2 relative">
                {/* Connecting Line */}
                <div className="absolute top-16 translate-y-1/2 left-0 w-full h-1 bg-gray-300"></div>
                <div className={`absolute top-16 translate-y-1/2 left-0 ${lineClass()} h-1 bg-gray-800 transition-all duration-300 ease-in-out`}></div>

                {/* Steps */}
                {/* Shipping Details */}
                <div className="flex flex-col items-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${isCurrent("shipping") ? "bg-gray-800" : "bg-gray-400"}`}>
                        <span className="text-white">1</span>
                    </div>
                    <span className={`font-medium text-md mt-1 ${isCurrent("shipping") ? "text-gray-800" : "text-gray-400"}`}>
                        Shipping Details
                    </span>
                </div>
                {/* Payment Details */}
                <div className="flex flex-col items-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${isCurrent("payment") ? "bg-gray-800" : "bg-gray-400"}`}>
                        <span className="text-white">2</span>
                    </div>
                    <span className={`font-medium text-md mt-1 ${isCurrent("payment") ? "text-gray-800" : "text-gray-400"}`}>
                        Payment Details
                    </span>
                </div>
                {/* Order Confirmation */}
                <div className="flex flex-col items-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${isCurrent("confirmation") ? "bg-gray-800" : "bg-gray-400"}`}>
                        <span className="text-white">3</span>
                    </div>
                    <span className={`font-medium text-md mt-1 ${isCurrent("confirmation") ? "text-gray-800" : "text-gray-400"}`}>
                        Order Confirmation
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;
