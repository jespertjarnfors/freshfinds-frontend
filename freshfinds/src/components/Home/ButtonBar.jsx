import "./ButtonBar.css"
import { useNavigate } from "react-router-dom";

// ButtonBar component provides navigation buttons for Login and Sign Up.
const ButtonBar = () => {

  // Navigates to the Register page
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/register');
  };

  // Navigates to the Login page
  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="space-x-6 flex">
        <button
        className="btn px-10"
        onClick={handleLoginClick}
      >
        Login
      </button>
      <button
        className="btn"
        onClick={handleSignUpClick}
      >
        Sign Up
      </button>
    </div>
  );
};

export default ButtonBar;