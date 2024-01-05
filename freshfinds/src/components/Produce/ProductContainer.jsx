import { useState } from "react";
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

const categoryData = {
  Fruit: fruitIcon,
  Vegetables: vegetablesIcon,
  Eggs: eggIcon,
  Beef: beefIcon,
  Chicken: chickenIcon,
  Pork: porkIcon,
};

const createRandomProduct = (index) => {
  const categories = Object.keys(categoryData);
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const randomRating = (Math.random() * 4 + 1).toFixed(1);

  return {
    name: `Product ${index + 1}`,
    seller: `Seller ${index + 3}`,
    icon: categoryData[randomCategory],
    rating: randomRating,
    image: `https://via.placeholder.com/150?text=Product+${index + 1}`,
    price: Math.floor(Math.random() * 10) + 1,
    quantity: Math.floor(Math.random() * 50) + 1,
    deliveryMethod: ["Shipping", "Pickup"][Math.floor(Math.random() * 2)],
    category: randomCategory,
  };
};

const products = Array.from({ length: 20 }, (_, index) => createRandomProduct(index));

const ProductContainer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedRating(null);
    setSearchTerm("");
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm = searchTerm && (product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.seller.toLowerCase().includes(searchTerm));
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesRating = selectedRating ? (selectedRating === "Any" || parseFloat(product.rating) >= parseInt(selectedRating.charAt(0))) : true;

    return (matchesSearchTerm || !searchTerm) && matchesCategory && matchesRating;
  });

  return (
    <div className="flex">
      <LeftNav
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
      />
      <div
        className="flex flex-col w-4/5 mr-10 ml-5 p-10 rounded-xl shadow-lg overflow-auto custom-scrollbar"
        style={{
           backgroundColor: "#FFEDC2", height: "85svh"}}
      >
        <div className="flex justify-start items-center mb-4">
          <SearchBar value={searchTerm} onChange={handleSearchChange} />
          <button onClick={clearFilters} className="text-medium font-semibold underline text-gray-600 ml-4">Clear Filter</button>
          {selectedCategory && <div className="bg-gray-200 px-2 py-1 ml-2 rounded-lg">{selectedCategory}</div>}
          {selectedRating && <div className="bg-gray-200 px-2 py-1 ml-2 rounded-lg">Rating: {selectedRating}</div>}
        </div>
        <div className="flex flex-row flex-wrap -mx-4">
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductContainer;
