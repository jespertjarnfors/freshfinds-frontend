import Logo from "../../assets/LogoMedium.png";
import Tomato from "../../assets/Tomato.png";
import { useNavigate } from "react-router-dom";
import './HomeNavBar.css';

const HomeNavBar = () => {
  const navigate = useNavigate();

  // Navigate to the home page
  const handleHomeClick = () => {
    navigate("/home");
  };

  return (
    <div>
      <nav className="home-navbar relative">
        <div className="px-6 py-4">
          <div className="flex lg:items-center justify-center md:justify-between">
            <div className="flex items-center justify-center md:justify-between">
              <img className="h-16 md:h-24 lg:h-14 md:ml-2" src={Logo} alt="" onClick={handleHomeClick} />
            </div>
            {/* Tomato Item */}
            <div className="hidden md:block md:mt-2 md:w-16 md:h-20 lg:w-8 lg:h-12 mr-6 overflow-hidden rounded-full">
              <img
                src={Tomato}
                className="object-cover w-full h-full"
                alt="Tomato"
              />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HomeNavBar;
