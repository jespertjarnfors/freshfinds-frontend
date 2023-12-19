import "./ButtonBar.css"
import { useNavigate } from "react-router-dom";

const ButtonBar = () => {

  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/register');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="space-x-6 flex">
      <button
        className="btn"
        onClick={handleSignUpClick}
      >
        Sign Up
      </button>
      <button
        className="btn"
        onClick={handleLoginClick}
      >
        Login
      </button>
    </div>
  );
};

export default ButtonBar;