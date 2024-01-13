import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useUser } from "../hooks/useUser";
import CartIcon from "./Products/CartIcon";
import Logo from "../assets/LogoMedium.png";
import "./UserNavBar.css";

const UserNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart(); // Use cart from CartContext
  const cartCount = cart.length; // Cart count is the length of the cart array
  const { user, signOut } = useUser();
  const navigate = useNavigate();
  

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false); // Close the mobile menu on navigation
  };

  const handleSignOut = () => {
    signOut(); // Sign out the user
    navigate("/home"); // Navigate to the home page after sign out
  };

  return (
    <div>
      <nav className="user-navbar relative">
        <div className="px-6 py-4">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex items-center justify-between">
              <img
                className="w-auto h-32 sm:h-12 ml-2"
                src={Logo}
                alt=""
                onClick={() => handleNavigation("/home")}
              />
              <div className="flex lg:hidden">
                {/* ... Mobile menu toggle button ... */}
              </div>
            </div>

            <div
              className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "opacity-0 -translate-x-full"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center font-medium">
               
                <p className="text-gray-600 mr-4 mt-2">
                  {user ? `Welcome, ${user.username}.` : "Welcome"}
                </p>

                {/* Navigation Links */}
                <a
                  href="#"
                  className="px-6 py-2 mt-2 text-gray-800"
                  onClick={() => handleNavigation("/products")}
                >
                  Buy Produce
                </a>
                <a
                  href="#"
                  className="px-6 py-2 mt-2 text-gray-800"
                  onClick={() => handleNavigation("/map")}
                >
                  Map
                </a>
                <a
                  href="#"
                  className="px-6 py-2 mt-2 mr-6 text-gray-800"
                  onClick={() => handleNavigation("/account")}
                >
                  Account
                </a>

                
                <button
                  onClick={handleSignOut}
                  className="mt-2 mr-3 px-1.5 py-2 text-gray-700 font-bold bg-inherit rounded hover:text-red-600 underline-offset-2 underline"
                  style={{
                    fontSize: "0.75rem"
                  }}
                >
                  SIGN OUT
                </button>

                {/* Cart Icon with count */}
                <CartIcon
                  cartCount={cartCount}
                  onClick={() => handleNavigation("/cart")}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default UserNavBar;
