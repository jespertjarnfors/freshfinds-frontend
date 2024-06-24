import { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import EditCartModal from "./EditCartModal";

const CartPage = () => {
  const { cart, removeFromCart, editCartItem } = useCart();
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const navigate = useNavigate();

  // Calculate the total cost of the cart
  const totalCost = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  // Open and close the edit modal
  const openEditModal = (index) => {
    setEditingIndex(index);
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
    setEditingIndex(-1);
  };

  // Handle the checkout button click
  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="p-6 flex flex-col h-screen">
      <div className="flex-grow overflow-auto pr-4 custom-scrollbar">
        <h2 className="text-2xl text-gray-700 font-bold mb-4">Your Cart</h2>
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <div
              key={index}
              className="flex items-center border-b border-gray-300 py-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-28 h-24 md:w-32 md:h-32 object-cover mr-6"
              />
              <div>
              <div className="flex flex-col">
                <h3 className="text-md font-semibold">{item.name}</h3>
                <p className="text-gray-600 hidden md:block">Seller: {item.seller}</p>
                <p className="text-gray-600">
                  Available Stock: {item.initialQuantity} kg
                </p>
                <p className="text-gray-600">
                  Chosen Quantity: {item.quantity} kg
                </p>
                <p className="text-gray-600 hidden md:block">
                  Price per kg: ${item.unitPrice.toFixed(2)}
                </p>
                <p className="text-gray-600">Delivery Type: {item.deliveryMethod}</p>
                <p className="text-gray-700 font-medium">
                  Total Price: ${item.totalPrice.toFixed(2)}
                </p>
              </div>
              <div className="mt-2 space-x-1">
              <button
                onClick={() => openEditModal(index)}
                className="px-5 md:px-7 md:py-2 text-white bg-gray-700 rounded hover:bg-gray-800"
              >
                Edit
              </button>
              <button
                onClick={() => removeFromCart(index)}
                className="px-2 md:ml-4 md:px-4 md:py-2 text-white bg-red-500 rounded hover:bg-red-600"
              >
                Remove
              </button>
              </div>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}

        {isEditing && editingIndex >= 0 && (
          <EditCartModal
            item={cart[editingIndex]}
            index={editingIndex}
            editCartItem={editCartItem}
            closeModal={closeEditModal}
          />
        )}
      </div>

      {/* Order Summary and Checkout Button */}
      <div className="mt-6 sticky bottom-0 p-6 pt-10">
        <div className="flex justify-between items-center font-bold text-lg">
          <span>Total Cost:</span>
          <span>${totalCost.toFixed(2)}</span>
        </div>
        <button
          onClick={handleCheckout}
          className="w-full mt-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-900"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
