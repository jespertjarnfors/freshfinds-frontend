/* eslint-disable no-unused-vars */

import { useState } from "react";
import { useUser } from "../../hooks/useUser";
import AccordionItem from "./AccordionItem";
import AddProductModal from "./AddProductModal";
import beefIcon from "../../assets/icons/beef.svg";
import chickenIcon from "../../assets/icons/chicken.svg";
import eggIcon from "../../assets/icons/egg.svg";
import fruitIcon from "../../assets/icons/fruit.svg";
import porkIcon from "../../assets/icons/pork.svg";
import vegetablesIcon from "../../assets/icons/vegetables.svg";
import starIcon from "../../assets/icons/star.svg";
import shippingIcon from "../../assets/icons/shipping.svg";
import deliveryIcon from "../../assets/icons/delivery.svg";
import pickupIcon from "../../assets/icons/pickup.svg";

// Define categories, ratings, distances, and delivery methods
const categories = ["Fruit", "Vegetables", "Eggs", "Beef", "Chicken", "Pork"];
const ratings = [
  { name: "4+", icon: starIcon },
  { name: "3+", icon: starIcon },
  { name: "Any", icon: starIcon },
];
const distances = ["10km", "25km", "50km"];
const deliveryMethods = [
  { name: "Delivery", icon: deliveryIcon },
  { name: "Shipping", icon: shippingIcon },
  { name: "Pick-up", icon: pickupIcon },
];

// Map category names to corresponding icon images
const categoryIcons = {
  Fruit: fruitIcon,
  Vegetables: vegetablesIcon,
  Eggs: eggIcon,
  Beef: beefIcon,
  Chicken: chickenIcon,
  Pork: porkIcon,
};

const LeftNav = ({
  // Props for filtering products
  selectedCategory,
  setSelectedCategory,
  selectedRating,
  setSelectedRating,
  selectedDeliveryMethod,
  setSelectedDeliveryMethod,
  selectedDistance,
  setSelectedDistance,
}) => {
  // Filtering states
  const [distance, setDistance] = useState("25km");
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [ratingsOpen, setRatingsOpen] = useState(false);
  const [deliveryMethodOpen, setDeliveryMethodOpen] = useState(false);

  const [isAddProductModalOpen, setAddProductModalOpen] = useState(false); // State to manage modal visibility
  const { user } = useUser();

  // Categories to items with name, icon, and onClick handler
  const categoryItems = categories.map((category) => ({
    name: category,
    icon: categoryIcons[category],
    onClick: () => setSelectedCategory(category),
  }));

  // Ratings to items with name, icon, and onClick handler
  const ratingItems = ratings.map((rating) => ({
    name: rating.name,
    icon: rating.icon,
    onClick: () => setSelectedRating(rating.name),
  }));

  // Delivery methods to items with name, icon, and onClick handler
  const deliveryMethodItems = deliveryMethods.map((method) => ({
    name: method.name,
    icon: method.icon,
    onClick: () => setSelectedDeliveryMethod(method.name),
  }));

  // Handle distance change
  const handleDistanceChange = (e) => {
    setSelectedDistance(e.target.value);
  };

  // Function to open the Add Product modal
  const openAddProductModal = () => {
    setAddProductModalOpen(true);
  };

  return (
    <div
      className="ml-10 p-4 rounded-xl shadow-lg w-1/6"
      style={{ backgroundColor: "#FFEDC2" }}
    >
      <div className="px-2 mb-2">
        {/* Distance Dropdown */}
        <label htmlFor="distance" className="text-lg font-semibold">
          Distance
        </label>
        <select
          id="distance"
          value={selectedDistance}
          onChange={handleDistanceChange}
          className="mt-1 px-3 py-2 rounded-md w-full"
          style={{ backgroundColor: "#FFF9EB" }}
        >
          {distances.map((d, index) => (
            <option key={index} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {/* Categories Accordion */}
      <AccordionItem
        title="Categories"
        items={categoryItems}
        isOpen={categoriesOpen}
        setIsOpen={setCategoriesOpen}
      />

      {/* Seller Rating Accordion */}
      <AccordionItem
        title="Seller Rating"
        items={ratingItems}
        isOpen={ratingsOpen}
        setIsOpen={setRatingsOpen}
      />

      {/* Delivery Method Accordion */}
      <AccordionItem
        title="Delivery Method"
        items={deliveryMethodItems}
        isOpen={deliveryMethodOpen}
        setIsOpen={setDeliveryMethodOpen}
      />

      {/* "Add Product" Button (Conditionally rendered for producers) */}
      <div className="flex justify-center">
        {user.isProducer === "true" && (
          <button onClick={openAddProductModal} className="btn mt-4 px-4 py-2">
            Add Product
          </button>
        )}
      </div>

      {/* AddProductModal */}
      <AddProductModal
        isOpen={isAddProductModalOpen}
        closeModal={() => setAddProductModalOpen(false)}
      />
    </div>
  );
};

export default LeftNav;
