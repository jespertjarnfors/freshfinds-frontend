import { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import EditCartModal from "./EditCartModal";

const CartPage = () => {
  const { cart, removeFromCart, editCartItem } = useCart();
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);

  const openEditModal = (index) => {
    setEditingIndex(index);
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
    setEditingIndex(-1);
  };

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
              <p className="text-gray-600">Total Available Stock: {item.initialQuantity} kg</p>
              <p className="text-gray-600">Chosen Quantity: {item.quantity} kg</p>
              <p className="text-gray-600">Price per kg: ${item.unitPrice.toFixed(2)}</p>
              <p className="text-gray-600">Delivery: {item.deliveryMethod}</p>
              <p className="text-gray-700 font-medium">Total Price: ${item.totalPrice.toFixed(2)}</p>
            </div>
            <button onClick={() => openEditModal(index)} className="ml-4 px-8 py-2 text-white bg-gray-700 rounded hover:bg-gray-800">
              Edit
            </button>
            <button onClick={() => removeFromCart(index)} className="ml-4 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600">
              Remove
            </button>
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
  );
};

export default CartPage;
