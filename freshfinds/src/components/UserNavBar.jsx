import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useUser } from "../hooks/useUser";
import CartIcon from "./Products/CartIcon";
import Logo from "../assets/LogoMedium.png";
import "./UserNavBar.css";

const UserNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();
  const cartCount = cart.length;
  const { user, signOut } = useUser();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false); // Close the mobile menu on navigation
  };

  const handleSignOut = () => {
    signOut();
    navigate("/home");
  };

  return (
    <div>
      <nav className="user-navbar relative">
        <div className="px-6 py-4">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex items-center justify-between">
              <img
                className="h-10 2xl:h-14 md:ml-2 mb-2 xl:mb-0 cursor-pointer"
                src={Logo}
                alt=""
                onClick={() => handleNavigation("/home")}
              />
                {/* Conditional Mobile Menu Cart and Sign out */}
              <div className="ml-auto mr-2 flex flex-row lg:hidden mb-1 space-x-2">
              <button
                  onClick={handleSignOut}
                  className="mr-2 px-1.5 py-2 text-gray-700 font-bold bg-inherit rounded hover:text-red-600 underline-offset-2 underline"
                  style={{
                    fontSize: "0.75rem"
                  }}
                >
                  SIGN OUT
                </button>
                <CartIcon
                  cartCount={cartCount}
                  onClick={() => handleNavigation("/cart")}
                />
              </div>

              {/* Mobile menu toggle button */}
              <div className="lg:hidden md:mr-4 ml-2">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="text-gray-800 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                  aria-label="toggle menu"
                >
                  {isOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 8h16M4 16h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            <div
              className={`absolute inset-x-0 z-50 w-full px-6 py-4 transition-all duration-300 bg-orange-50 flex justify-center ease-in-out lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${
                isOpen
                  ? "translate-x-0 opacity-100 h-screen xl:h-12 text-3xl xl:text-base py-56"
                  : "opacity-0 -translate-x-full"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center font-medium">
                <p className="text-gray-600 mr-4 mt-2 hidden lg:block">
                  {user ? `Welcome, ${user.username}.` : "Welcome"}
                </p>
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
                <span className="hidden lg:flex">
                <button
                  onClick={handleSignOut}
                  className="mt-2 mr-12 px-1.5 py-2 text-gray-700 font-bold bg-inherit rounded hover:text-red-600 underline-offset-2 underline"
                  style={{
                    fontSize: "0.75rem"
                  }}
                >
                  SIGN OUT
                </button>
                <CartIcon
                  cartCount={cartCount}
                  onClick={() => handleNavigation("/cart")}
                />
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default UserNavBar;
