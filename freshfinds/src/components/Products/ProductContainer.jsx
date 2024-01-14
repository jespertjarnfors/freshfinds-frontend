import { useState, useEffect } from "react";
import { useUser } from "../../hooks/useUser";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";
import LeftNav from "./LeftNav";
import "./ProductContainer.css";
import beefIcon from "../../assets/icons/beef.svg";
import chickenIcon from "../../assets/icons/chicken.svg";
import eggIcon from "../../assets/icons/egg.svg";
import fruitIcon from "../../assets/icons/fruit.svg";
import porkIcon from "../../assets/icons/pork.svg";
import vegetablesIcon from "../../assets/icons/vegetables.svg";

// Mapping category names to corresponding icon images
const categoryIcons = {
  Fruit: fruitIcon,
  Vegetables: vegetablesIcon,
  Eggs: eggIcon,
  Beef: beefIcon,
  Chicken: chickenIcon,
  Pork: porkIcon,
};

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(null);
  const [selectedDistance, setSelectedDistance] = useState("25km");

  const { user } = useUser();

// Fetch products data from the API on component mount
useEffect(() => {
  const fetchProducts = async () => {
    try {
      // Check if latitude and longitude are defined
      if (user && user.latitude && user.longitude) {
        // Convert selectedDistance to a number (e.g., "25km" becomes 25)
        const distanceInKm = parseInt(selectedDistance.replace('km', ''));

        const response = await fetch(
          `http://localhost:3000/api/products/distance?lat=${user.latitude}&lng=${user.longitude}&distance=${distanceInKm}`
        );

        if (response.ok) {
          const jsonResponse = await response.json();
          // Transforming the API response to a suitable format for rendering
          const transformedProducts = jsonResponse.data.map((product) => ({
            key: product._id, // MongoDB unique ID
            name: product.productName,
            seller: product.username,
            icon: categoryIcons[product.category], // Assigning icon based on category
            rating: "4.2", // Placeholder rating for now
            image: product.image,
            price: product.price,
            quantity: product.quantity,
            deliveryMethod: product.deliveryMethod,
            category: product.category,
          }));
          setProducts(transformedProducts);
        } else {
          console.error("Error fetching products by distance:", response.statusText);
        }
      } else {
        console.log("Latitude or longitude undefined. Skipping fetchProducts.");
      }
    } catch (error) {
      console.error("Error fetching products by distance:", error);
    }
  };

  // Call fetchProducts initially and whenever user's location changes
  fetchProducts();
}, [selectedDistance, user?.latitude, user?.longitude]);

  // Handling search input changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Function to clear all filters
  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedRating(null);
    setSelectedDeliveryMethod(null);
    setSearchTerm("");
  };

  // Filtering products based on search term, category, rating, and delivery method
  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm = searchTerm
      ? product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.seller.toLowerCase().includes(searchTerm)
      : true;

    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;

    const matchesRating = selectedRating
      ? selectedRating === "Any" ||
        parseFloat(product.rating) >= parseInt(selectedRating.charAt(0))
      : true;

    const matchesDeliveryMethod = selectedDeliveryMethod
      ? product.deliveryMethod === selectedDeliveryMethod
      : true;

    return (
      matchesSearchTerm &&
      matchesCategory &&
      matchesRating &&
      matchesDeliveryMethod
    );
  });

  return (
    <div className="flex">
      <LeftNav
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
        selectedDeliveryMethod={selectedDeliveryMethod}
        setSelectedDeliveryMethod={setSelectedDeliveryMethod}
        selectedDistance={selectedDistance}
        setSelectedDistance={setSelectedDistance}
      />
      <div
        className="flex flex-col w-4/5 mr-10 ml-5 p-10 rounded-xl shadow-lg overflow-auto custom-scrollbar"
        style={{ backgroundColor: "#FFEDC2", height: "85vh" }}
      >
        <div className="flex justify-start items-center mb-4">
          <SearchBar value={searchTerm} onChange={handleSearchChange} />
          <button
            onClick={clearFilters}
            className="text-medium font-semibold underline text-gray-600 ml-4"
          >
            Clear Filter
          </button>
          {selectedCategory && (
            <div className="bg-gray-200 px-2 py-1 ml-2 rounded-lg">
              {selectedCategory}
            </div>
          )}
          {selectedRating && (
            <div className="bg-gray-200 px-2 py-1 ml-2 rounded-lg">
              Rating: {selectedRating}
            </div>
          )}
          {selectedDeliveryMethod && (
            <div className="bg-gray-200 px-2 py-1 ml-2 rounded-lg">
              Delivery: {selectedDeliveryMethod}
            </div>
          )}
        </div>
        <div className="flex flex-row flex-wrap -mx-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.key} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductContainer;
