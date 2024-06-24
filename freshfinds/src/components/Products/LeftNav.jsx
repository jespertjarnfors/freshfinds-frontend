/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useUser } from "../../hooks/useUser";
import { useProductsUpdated } from "../../contexts/ProductsUpdatedContext";
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
  showLeftNav,
  toggleLeftNav, // Props for controlling visibility
  resetSelections, // Props for resetting highlighted selections for Mobile
  setResetSelections,
}) => {
  // Filtering states
  const [distance, setDistance] = useState("25km");
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [ratingsOpen, setRatingsOpen] = useState(false);
  const [deliveryMethodOpen, setDeliveryMethodOpen] = useState(false);

  const [isAddProductModalOpen, setAddProductModalOpen] = useState(false); // State to manage modal visibility
  const { setProductsUpdated } = useProductsUpdated();
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
      className={`absolute inset-x-0 z-20 w-full h-full px-6 py-4 transition-all duration-300 ease-in-out shadow-none md:shadow-xl ${
        showLeftNav ? "block" : "hidden md:block"
      } md:relative md:w-1/4 lg:w-1/6 md:transition-none rounded-xl md:ml-10 md:h-auto`}
      style={{ backgroundColor: "#FFEDC2" }}
    >
      <button
        onClick={toggleLeftNav}
        className="absolute top-0 right-0 m-4 text-gray-600 block md:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="px-2 mb-2">
        {/* Distance Dropdown */}
        <label
          htmlFor="distance"
          className="xl:text-base 2xl:text-lg font-semibold"
        >
          Distance
        </label>
        <select
          id="distance"
          value={selectedDistance}
          onChange={handleDistanceChange}
          className="mt-1 xl:text-sm 2xl:text-base px-1 py-1 2xl:px-3 2xl:py-2 rounded-md w-full"
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
        resetSelections={resetSelections}
      />

      {/* Seller Rating Accordion */}
      <AccordionItem
        title="Seller Rating"
        items={ratingItems}
        isOpen={ratingsOpen}
        setIsOpen={setRatingsOpen}
        resetSelections={resetSelections}
      />

      {/* Delivery Method Accordion */}
      <AccordionItem
        title="Delivery Method"
        items={deliveryMethodItems}
        isOpen={deliveryMethodOpen}
        setIsOpen={setDeliveryMethodOpen}
        resetSelections={resetSelections}
      />

      {/* "Add Product" Button (Conditionally rendered for producers) */}
      <div className="flex justify-center">
        {user.isProducer === "true" && (
          <button
            onClick={openAddProductModal}
            className="btn mt-4 2xl:mt-2 3xl:mt-4 px-4 py-2"
          >
            Add Product
          </button>
        )}
      </div>

      {/* AddProductModal */}
      <AddProductModal
        isOpen={isAddProductModalOpen}
        closeModal={() => {
          setAddProductModalOpen(false);
          setTimeout(() => setProductsUpdated(false), 500);
        }}
      />
    </div>
  );
};

export default LeftNav;
