import { useState } from "react";
import AccordionItem from "./AccordionItem";
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

const categories = ["Fruit", "Vegetables", "Eggs", "Beef", "Chicken", "Pork"];

const ratings = [
  { name: "5", icon: fiveStar },
  { name: "4", icon: fourStar },
  { name: "3", icon: threeStar },
  { name: "2", icon: twoStar },
  { name: "Any", icon: oneStar },
];

const distances = ["10km", "25km", "50km"];

const categoryIcons = {
  "Fruit": fruitIcon,
  "Vegetables": vegetablesIcon,
  "Eggs": eggIcon,
  "Beef": beefIcon,
  "Chicken": chickenIcon,
  "Pork": porkIcon,
};

const LeftNav = () => {
  const [distance, setDistance] = useState("25km");
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [ratingsOpen, setRatingsOpen] = useState(false);

  const categoryItems = categories.map(category => ({
    name: category,
    icon: categoryIcons[category],
  }));

  return (
    <div className="ml-10 p-4 rounded-xl shadow-lg w-1/3" style={{ backgroundColor: "#FFEDC2" }}>
      <div className="px-2 mb-2">
        <label htmlFor="distance" className="text-lg font-semibold">Distance</label>
        <select
          id="distance"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          className="mt-1 p-2 rounded-md w-full"
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
        icon={null}
      />
      <AccordionItem
        title="Seller Rating"
        items={ratings}
        isOpen={ratingsOpen}
        setIsOpen={setRatingsOpen}
      />
    </div>
  );
};

export default LeftNav;
