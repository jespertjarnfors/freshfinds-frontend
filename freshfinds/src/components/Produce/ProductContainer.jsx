import { useState } from "react";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";
import "./ProductContainer.css";
import beefIcon from "../../assets/icons/beef.svg";
import chickenIcon from "../../assets/icons/chicken.svg";
import eggIcon from "../../assets/icons/egg.svg";
import fruitIcon from "../../assets/icons/fruit.svg";
import porkIcon from "../../assets/icons/pork.svg";
import vegetablesIcon from "../../assets/icons/vegetables.svg";
import oneStar from "../../assets/icons/oneStar.svg";
import twoStar from "../../assets/icons/twoStar.svg";
import threeStar from "../../assets/icons/threeStar.svg";
import fourStar from "../../assets/icons/fourStar.svg";
import fiveStar from "../../assets/icons/fiveStar.svg";

const categoryData = {
  "Fruit": fruitIcon,
  "Vegetables": vegetablesIcon,
  "Eggs": eggIcon,
  "Beef": beefIcon,
  "Chicken": chickenIcon,
  "Pork": porkIcon,
};

const ratingIcons = [oneStar, twoStar, threeStar, fourStar, fiveStar];

const createRandomProduct = (index) => {
  const categories = Object.keys(categoryData);
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const randomRating = ratingIcons[Math.floor(Math.random() * ratingIcons.length)];

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="flex flex-col mr-10 ml-5 p-10 rounded-xl shadow-lg overflow-auto custom-scrollbar"
         style={{ backgroundColor: "#FFEDC2", height: "85vh" }}>
      <SearchBar value={searchTerm} onChange={handleSearchChange} />
      <div className="flex flex-row flex-wrap -mx-4">
        {filteredProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductContainer;
