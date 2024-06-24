import { useCart } from "../../contexts/CartContext";

const OrderSummary = () => {
    const { cart } = useCart();

    // Calculate total cost
    const totalCost = cart.reduce((acc, item) => acc + item.totalPrice, 0);

    // Count distinct items in the cart
    const totalItems = cart.length;

    // Count items per delivery method
    const deliveryCounts = cart.reduce((acc, item) => {
      acc[item.deliveryMethod] = (acc[item.deliveryMethod] || 0) + 1;
      return acc;
    }, {});

    return (
        <div className="p-4 shadow-md rounded-lg w-52 mt-2 bg-gray-800 border-2 border-gray-200 text-white">
            <h3 className="text-lg font-semibold text-white">Order Summary</h3>
            <p>Total Items: {totalItems}</p>
            <div>
                {Object.entries(deliveryCounts).map(([method, count]) => (
                    <p key={method}>{`${method} (${count})`}</p>
                ))}
            </div>
            <div className="mt-2">
                {/* Total cost here */}
                <div className="flex justify-between mt-2">
                    <span>Total:</span>
                    <span className="font-semibold">${totalCost.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
