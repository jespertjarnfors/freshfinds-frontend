import { useState, useEffect } from "react";
import Modal from "../Modal";

const categories = ["Fruit", "Vegetables", "Eggs", "Beef", "Chicken", "Pork"];

const EditProductModal = ({
  isOpen,
  productId,
  closeModal,
  productData,
}) => {

  const [editedProductData, setEditedProductData] = useState({
    productName: productData.name,
    price: productData.price,
    quantity: productData.quantity,
    category: productData.category,
    deliveryMethod: productData.deliveryMethod,
    image: productData.image,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Update editedProductData when productData changes
    setEditedProductData({
      productName: productData.name,
      price: productData.price,
      quantity: productData.quantity,
      category: productData.category,
      deliveryMethod: productData.deliveryMethod,
      image: productData.image,
    });
  }, [productData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProductData({
      ...editedProductData,
      [name]: value,
    });
  };

  // Validation functions
  const isValidProductName = (name) => /^[a-zA-Z\s]{1,18}$/.test(name);

  const handleEditProduct = async () => {
    setIsLoading(true);

    try {
      // Validate and prepare data for PUT request
      const requestBody = {
        productName: editedProductData.productName,
        price: parseFloat(editedProductData.price),
        quantity: parseInt(editedProductData.quantity),
        category: editedProductData.category,
        deliveryMethod: editedProductData.deliveryMethod,
        image: editedProductData.image,
      };

      console.log("Request Body:", requestBody);

      // Make the PUT request to update the product
      const response = await fetch(
        `http://localhost:3000/api/products/update/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        alert("Product updated successfully");
        closeModal();
      } else {
        console.error("Failed to update product. Please try again.");
        console.log("Response Status:", response.status);
        console.log("Response Body:", await response.json());
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal} title="Edit Product">
      <form>
        {/* Image URL */}
        <div className="mb-2">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={editedProductData.image}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* Product Name */}
        <div className="mb-4">
          <label
            htmlFor="productName"
            className="block text-sm font-medium text-gray-700"
          >
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={editedProductData.productName}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full"
            maxLength={18} // Set maximum length
          />
          {!isValidProductName(editedProductData.productName) && (
            <p className="text-red-500 text-sm mt-1">
              Invalid product name. Only letters allowed, max 18 characters.
            </p>
          )}
        </div>

        {/* Price and Quantity */}
        <div className="flex mb-4">
          <div className="w-1/2 pr-2">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price (per kg)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={editedProductData.price}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div className="w-1/2 pl-2">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Quantity (kgs)
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={editedProductData.quantity}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
        </div>

        {/* Category and Delivery Method */}
        <div className="flex mb-4">
          <div className="w-1/2 pr-2">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={editedProductData.category}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
            >
              <option value="" disabled>
                Select category
              </option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/2 pl-2">
            <label
              htmlFor="deliveryMethod"
              className="block text-sm font-medium text-gray-700"
            >
              Delivery Method
            </label>
            <select
              id="deliveryMethod"
              name="deliveryMethod"
              value={editedProductData.deliveryMethod}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
            >
              <option value="" disabled>
                Select delivery method
              </option>
              <option value="Delivery">Delivery</option>
              <option value="Shipping">Shipping</option>
              <option value="Pick-up">Pick-up</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-2 flex flex-row justify-center space-x-4">
          {/* Edit Product Button */}
          <button
            type="button"
            onClick={handleEditProduct}
            className={`btn-2 px-8 py-4 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Updating Product..." : "Confirm"}
          </button>

          {/* Close button */}
          <button type="button" className="btn px-12" onClick={closeModal}>
            Exit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditProductModal;
