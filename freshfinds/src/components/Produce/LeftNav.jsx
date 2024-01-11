import { useState } from "react";
import AccordionItem from "./AccordionItem";
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

const categories = ["Fruit", "Vegetables", "Eggs", "Beef", "Chicken", "Pork"];
const ratings = [{ name: "4+", icon: starIcon }, { name: "3+", icon: starIcon }, { name: "Any", icon: starIcon }];
const distances = ["10km", "25km", "50km"];
const deliveryMethods = [
  { name: "Delivery", icon: deliveryIcon },
  { name: "Shipping", icon: shippingIcon },
  { name: "Pick-up", icon: pickupIcon },
];

const categoryIcons = {
  "Fruit": fruitIcon,
  "Vegetables": vegetablesIcon,
  "Eggs": eggIcon,
  "Beef": beefIcon,
  "Chicken": chickenIcon,
  "Pork": porkIcon,
};

const LeftNav = ({ selectedCategory, setSelectedCategory, selectedRating, setSelectedRating, selectedDeliveryMethod, setSelectedDeliveryMethod }) => {
  const [distance, setDistance] = useState("25km");
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [ratingsOpen, setRatingsOpen] = useState(false);
  const [deliveryMethodOpen, setDeliveryMethodOpen] = useState(false);

  const categoryItems = categories.map(category => ({
    name: category,
    icon: categoryIcons[category],
    onClick: () => setSelectedCategory(category)
  }));

  const ratingItems = ratings.map(rating => ({
    name: rating.name,
    icon: rating.icon,
    onClick: () => setSelectedRating(rating.name)
  }));

  const deliveryMethodItems = deliveryMethods.map(method => ({
    name: method.name,
    icon: method.icon,
    onClick: () => setSelectedDeliveryMethod(method.name)
  }));

  return (
    <div className="ml-10 p-4 rounded-xl shadow-lg w-1/6" style={{ backgroundColor: "#FFEDC2" }}>
      <div className="px-2 mb-2">
        <label htmlFor="distance" className="text-lg font-semibold">Distance</label>
        <select
          id="distance"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          className="mt-1 px-3 py-2 rounded-md w-full"
          style={{ backgroundColor: "#FFF9EB" }}
        >
          {distances.map((d, index) => (
            <option key={index} value={d}>{d}</option>
          ))}
        </select>
      </div>
      <AccordionItem
        title="Categories"
        items={categoryItems}
        isOpen={categoriesOpen}
        setIsOpen={setCategoriesOpen}
      />
      <AccordionItem
        title="Seller Rating"
        items={ratingItems}
        isOpen={ratingsOpen}
        setIsOpen={setRatingsOpen}
      />
      <AccordionItem
        title="Delivery Method"
        items={deliveryMethodItems}
        isOpen={deliveryMethodOpen}
        setIsOpen={setDeliveryMethodOpen}
      />
    </div>
  );
};

export default LeftNav;