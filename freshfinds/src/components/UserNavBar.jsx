import { useState } from "react";
import Logo from "../assets/LogoMedium.png";
import { useNavigate } from 'react-router-dom';
import './UserNavBar.css'; 
import CartIcon from "./Produce/CartIcon";
import { useCart } from "../contexts/CartContext";

const UserNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart(); // Use cart from CartContext
  const cartCount = cart.length; // Cart count is the length of the cart array
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false); // Close the mobile menu on navigation
  };

  return (
    <div>
      <nav className="user-navbar relative">
        <div className="px-6 py-4">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex items-center justify-between">
              <img className="w-auto h-32 sm:h-12 ml-2" src={Logo} alt="" onClick={() => handleNavigation("/home")}/>
              <div className="flex lg:hidden">
                {/* ... Mobile menu toggle button ... */}
              </div>
            </div>

            <div
              className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${
                isOpen ? "translate-x-0 opacity-100" : "opacity-0 -translate-x-full"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center font-medium">
                {/* Navigation Links */}
                <a href="#" className="px-6 py-2 mt-2 text-gray-800" onClick={() => handleNavigation("/produce")}>Buy Produce</a>
                <a href="#" className="px-6 py-2 mt-2 text-gray-800" onClick={() => handleNavigation("/map")}>Map</a>
                <a href="#" className="px-6 py-2 mt-2 mr-5 text-gray-800" onClick={() => handleNavigation("/account")}>Account</a>
                
                {/* Cart Icon with count */}
                <CartIcon cartCount={cartCount} onClick={() => handleNavigation("/cart")}/>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default UserNavBar;
