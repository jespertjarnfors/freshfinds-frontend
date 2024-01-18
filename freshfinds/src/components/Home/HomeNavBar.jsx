import { useState } from "react";
import Logo from "../../assets/LogoMedium.png";
import Tomato from "../../assets/Tomato.png";
import {useNavigate} from 'react-router-dom';
import './HomeNavBar.css';

const HomeNavBar = () => {

  // State for the mobile menu
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Navigate to the home page
  const handleHomeClick = () => {
    navigate("/home");
  };

  return (
    <div>
      <nav className="home-navbar relative">
        <div className="px-6 py-4">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex items-center justify-between">
              
                <img className="w-auto h-32 sm:h-12 ml-2" src={Logo} alt="" onClick={handleHomeClick}/>
              

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
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "opacity-0 -translate-x-full"
              }`}
            >
                <div className="w-10 h-8 mr-6 overflow-hidden rounded-full">
                  <img
                    src={Tomato}
                    className="object-cover w-full h-full"
                    alt="avatar"
                  />
                </div>
              
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HomeNavBar;
