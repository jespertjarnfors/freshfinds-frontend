import { useState, useEffect } from "react";
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonResponse = await response.json();
        const transformedProducts = jsonResponse.data.map((product) => ({
          key: product._id, // Using the MongoDB unique ID as key
          name: product.productName,
          seller: product.username,
          icon: categoryIcons[product.category], // Assign icon based on category
          rating: "4.2", // Generalized rating for now
          image: product.image,
          price: product.price,
          quantity: product.quantity,
          deliveryMethod: product.deliveryMethod,
          category: product.category,
        }));
        setProducts(transformedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedRating(null);
    setSelectedDeliveryMethod(null);
    setSearchTerm("");
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm = searchTerm
      ? product.productName.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.username.toLowerCase().includes(searchTerm)
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
