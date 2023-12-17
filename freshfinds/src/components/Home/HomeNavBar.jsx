import { useState } from "react";
import Logo from "../../assets/LogoMedium.png";
import Tomato from "../../assets/Tomato.png";

const HomeNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <nav className="relative bg-white shadow">
        <div className="px-6 py-4">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex items-center justify-between">
              <a href="#">
                <img className="w-auto h-32 sm:h-12" src={Logo} alt="" />
              </a>

              {/* Mobile menu button */}
              <div className="flex lg:hidden">
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
              className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${
                isOpen ? "translate-x-0 opacity-100" : "opacity-0 -translate-x-full"
              }`}
            >
              <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
             
                <a href="#" className="px-3 py-2 mx-3 mt-2 text-gray-800 transition-colors duration-300 transform rounded-md lg:mt-0 hover:bg-gray-100">
                  Home
                </a>
                <a href="#" className="px-3 py-2 mx-3 mt-2 text-gray-800 transition-colors duration-300 transform rounded-md lg:mt-0 hover:bg-gray-100">
                  About
                </a>
                <a href="#" className="px-3 py-2 mx-3 mt-2 text-gray-800 transition-colors duration-300 transform rounded-md lg:mt-0 hover:bg-gray-100">
                  Contact
                </a>
              </div>

              <div className="flex items-center mt-4 lg:mt-0">
                <button
                  className="hidden mx-4 text-gray-800 transition-colors duration-300 transform lg:block hover:text-gray-700 focus:text-gray-700 focus:outline-none"
                  aria-label="show notifications"
                >
                </button>
                 <div className="w-10 h-8 overflow-hidden rounded-full">
                    <img
                      src={Tomato}
                      className="object-cover w-full h-full"
                      alt="avatar"
                    />
                  </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HomeNavBar;