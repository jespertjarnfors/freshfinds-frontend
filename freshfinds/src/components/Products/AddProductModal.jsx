import { useState } from "react";
import { useUser } from "../../hooks/useUser";
import { useProductsUpdated } from "../../contexts/ProductsUpdatedContext";
import Modal from "../Modal";

const categories = ["Fruit", "Vegetables", "Eggs", "Beef", "Chicken", "Pork"];

const AddProductModal = ({ isOpen, closeModal }) => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const { setProductsUpdated } = useProductsUpdated();

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  /* Attach image, yet to be done
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
  }; 
  
  */

  // Validation function for productName
  const isValidProductName = (name) => /^[a-zA-Z\s]{1,18}$/.test(name);

  // Function to add the product
  const handleAddProduct = async () => {
    setIsLoading(true);

    try {
      // userId, latitude, and longitude are stored in user context
      const userId = user.userId;
      const latitude = user.latitude;
      const longitude = user.longitude;

      if (!userId || !latitude || !longitude) {
        console.error(
          "User information incomplete. Please make sure the user is logged in with location data."
        );
        return;
      }

      // Use the userId and location data in the request body
      const requestBody = {
        userId: userId,
        username: user.username,
        productName: productData.productName,
        price: parseFloat(productData.price), // Parsing to ensure it's a number
        quantity: parseInt(productData.quantity), // Parsing to ensure it's an integer
        category: productData.category,
        deliveryMethod: productData.deliveryMethod,
        image: productData.image,
        location: {
          type: "Point",
          coordinates: [parseFloat(longitude), parseFloat(latitude)],
        },
      };

      // Function to reset the form fields
      const resetFormFields = () => {
        setProductData({
          userId: "",
          username: user.username,
          productName: "",
          price: 0,
          quantity: 0,
          category: "",
          deliveryMethod: "",
          image: "",
        });
      };

      // Function to validate all form fields
      const areAllFieldsValid = () => {
        return (
          isValidProductName(productData.productName) &&
          productData.price > 0 &&
          productData.quantity > 0 &&
          productData.category &&
          productData.deliveryMethod &&
          productData.image
        );
      };

      // Make the POST request
      const response = await fetch(
        "http://localhost:3000/api/products/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        console.log("Product added successfully");
        setProductsUpdated(true);
        resetFormFields(); // Reset form fields after successful addition
        closeModal();
      } else {
        console.error("Failed to add product. Please try again.");
        alert("Failed to add product. Please fill out all the fields correctly.");
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
