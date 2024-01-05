import { useCart } from "../../contexts/CartContext";

const CartPage = () => {
  const { cart, removeFromCart } = useCart(); // Use removeFromCart from the CartContext

  return (
    <div className="p-6">
      <h2 className="text-2xl text-gray-700 font-bold mb-4">Your Cart</h2>
      {cart.length > 0 ? (
        cart.map((item, index) => (
          <div key={index} className="flex items-center border-b border-gray-300 py-4">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover mr-6" />
            <div className="flex-grow">
              <h3 className="text-md font-semibold">{item.name}</h3>
              <p className="text-gray-600">Seller: {item.seller}</p>
              <p className="text-gray-600">Quantity: {item.quantity} kg</p>
              <p className="text-gray-600">Delivery: {item.deliveryMethod}</p>
              <p className="text-gray-700 font-medium">Total Price: ${item.totalPrice.toFixed(2)}</p>
            </div>
            <button 
              onClick={() => removeFromCart(index)}
              className="ml-4 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition-colors duration-200 ease-in-out"
            >
              Remove
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-600">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
