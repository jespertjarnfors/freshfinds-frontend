import { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import starIcon from "../../assets/icons/star.svg";

const ProductCard = ({ product, productId }) => {
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const numericQuantity = parseInt(quantity, 10);
    if (numericQuantity > 0 && numericQuantity <= product.quantity) {
      addToCart(product, numericQuantity, productId);
      setQuantity(""); // Reset quantity after adding to cart
      setError(""); // Clear any previous error
    } else {
      setError(
        "Invalid quantity. Please enter a value between 1 and the available stock."
      );
    }
  };

  // Check if the product quantity is greater than 0 before rendering
  if (product.quantity <= 0) {
    return null; // Returning null to prevent rendering
  }

  return (
    <div
      className="w-64 md:w-60 lg:w-60 xl:w-56 2xl:w-64 2xl:mx-2 3xl:mx-3 rounded-xl shadow-xl m-2"
      style={{ backgroundColor: "#FFF9EB", alignSelf: "start" }}
      key={Date.now()}
    >
      <div className="px-4 pt-2 pb-1 flex justify-between items-center">
        <div className="font-semibold text-md xl:text-sm 2xl:text-base flex items-center">
          {product.seller}
          <img src={starIcon} alt="Star Icon" className="ml-1 h-5 w-5" />
          <span className="ml-1">{product.rating}</span>
        </div>
        <img src={product.icon} alt="category icon" className="h-8 w-8" />
      </div>
      <img
        className="w-full h-36 object-cover object-center"
        src={product.image}
        alt={product.name}
      />
      <div className="px-4 py-2">
        <div
          className="font-semibold md:text-sm xl:text-sm 2xl:text-base mb-1 text-gray-800 flex justify-between items-center"
          style={{ fontFamily: "Satoshi, sans-serif" }}
        >
          {product.name}{" "}
          <span className="bg-green-50 rounded-md p-1 text-gray-700 text-sm mt-1 font-semibold inline-block">
            ${product.price}/kg
          </span>
        </div>
        <p className="text-gray-700 text-sm">
          Category: <span className="font-semibold">{product.category}</span>
        </p>
      </div>
      <div className="px-4 py-1">
        <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-1 mb-1">
          {product.quantity} kg
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-1 mb-1">
          {product.deliveryMethod}
        </span>
      </div>
      <div className="px-4 pt-2 pb-1">
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="quantity" className="mr-1.5 font-semibold text-sm xl:text-sm">
            Quantity (in kg):
          </label>
          <input
            id="quantity"
            key={Date.now()}
            className="shadow appearance-none border rounded py-1 px-2 w-14 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            min="1"
            max={product.quantity}
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(0, parseInt(e.target.value, 10) || 0))
            }
          />
        </div>
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <button
          onClick={handleAddToCart}
          className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-1 px-2 rounded text-sm w-full mb-1"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
