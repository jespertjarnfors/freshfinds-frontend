import { useState } from "react";
import { useUser } from "../../hooks/useUser";
import Modal from "../Modal";

const categories = ["Fruit", "Vegetables", "Eggs", "Beef", "Chicken", "Pork"];

const AddProductModal = ({ isOpen, closeModal }) => {
  const { user } = useUser();
  const [productData, setProductData] = useState({
    userId: "",
    username: user.username,
    productName: "",
    price: 0,
    quantity: 0,
    category: "",
    deliveryMethod: "",
    image: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    // Implement image upload logic and update the productData.image
    // This function will vary based on your specific image upload implementation
    const file = e.target.files[0];
    // Implement logic to upload the file and set the URL or file path in productData.image
  };

  // Validation function for productName
  const isValidProductName = (name) => /^[a-zA-Z\s]{1,18}$/.test(name);

  const handleAddProduct = async () => {
    setIsLoading(true);
  
    try {
      // Assuming userId, latitude, and longitude are stored in user context
      const userId = user.userId;
      const latitude = user.latitude;
      const longitude = user.longitude;
  
      if (!userId || !latitude || !longitude) {
        console.error("User information incomplete. Please make sure the user is logged in with location data.");
        return;
      }
  
      // Use the userId and location data in the request body
      const requestBody = {
        userId: userId,
        username: user.username, // Include other user-related data if needed
        productName: productData.productName,
        price: parseFloat(productData.price), // Parse to ensure it's a number
        quantity: parseInt(productData.quantity), // Parse to ensure it's an integer
        category: productData.category,
        deliveryMethod: productData.deliveryMethod,
        image: productData.image,
        location: {
          type: "Point",
          coordinates: [parseFloat(longitude), parseFloat(latitude)],
        },
        // Add other fields as needed
      };
  
      console.log("Request Body:", requestBody);
  
      // Make the POST request
      const response = await fetch("http://localhost:3000/api/products/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers as needed
        },
        body: JSON.stringify(requestBody),
      });
  
      if (response.ok) {
        console.log("Product added successfully");
        closeModal();
      } else {
        console.error("Failed to add product. Please try again.");
        console.log("Response Status:", response.status);
        console.log("Response Body:", await response.json());
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };  

  return (
    <Modal isOpen={isOpen} closeModal={closeModal} title="Add Product">
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
            value={productData.image}
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
            value={productData.productName}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full"
            maxLength={18} // Set maximum length
          />
          {!isValidProductName(productData.productName) && (
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
              value={productData.price}
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
              value={productData.quantity}
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
              value={productData.category}
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
              value={productData.deliveryMethod}
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
          {/* Add Product Button */}
          <button
            type="button"
            onClick={handleAddProduct}
            className={`btn-2 px-8 py-4 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Adding Product..." : "Confirm"}
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

export default AddProductModal;
