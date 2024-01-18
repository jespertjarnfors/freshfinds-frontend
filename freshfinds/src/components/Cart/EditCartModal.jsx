import { useState } from 'react';

const EditCartModal = ({ item, index, editCartItem, closeModal }) => {

  // State to manage the new quantity for the item
  const [newQuantity, setNewQuantity] = useState(item.quantity);

  const handleConfirm = () => {
     // Check if the new quantity is valid (greater than 0 and within initial stock)
    if (newQuantity > 0 && newQuantity <= item.initialQuantity) {
        // Update the cart item with the new quantity
      editCartItem(index, newQuantity);
      closeModal();
    } else {
      alert('Please enter a valid quantity within the available stock.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Edit Quantity</h3>
        <input
          type="number"
          value={newQuantity}
          onChange={(e) => setNewQuantity(parseInt(e.target.value, 10))}
          className="border p-2 rounded w-full mb-4"
        />
        <div className="flex justify-end">
          <button onClick={handleConfirm} className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-5 rounded mr-2">
            Confirm
          </button>
          <button onClick={closeModal} className="bg-red-500 hover:bg-gray-400 text-white font-bold py-2 px-8 rounded">
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCartModal;
