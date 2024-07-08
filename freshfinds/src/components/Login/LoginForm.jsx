import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../auth";
import { useUser } from "../../hooks/useUser"; // Import useUser hook
import Logo from "../../assets/LogoMedium.png";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser, setLoginTrigger } = useUser(); // Access setUser and setLoginTrigger from the UserContext
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const handleLoginSuccess = (decodedToken) => {
      setUser(decodedToken); // Update user context
      setLoginTrigger((prev) => !prev); // Toggle loginTrigger to update the context
    };

    try {
      await logIn(username, password, handleLoginSuccess);
      navigate("/products");
    } catch (err) {
      console.error(err);
      alert("Password or Username is incorrect. Please try again.");
      setPassword("");
    }
  };

  return (
    <div
      className="flex items-center justify-center"
      style={{
        minHeight: "85vh",
      }}
    >
      <div className="rounded-md md:w-2/3 xl:w-1/3 p-8">
        <div className="hidden md:flex flex-col justify-center items-center">
          <img src={Logo} alt="logo" className="w-96 pb-4" />
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 border-2 border-spacing-4 p-8 rounded-2xl shadow-xl"
        >
          <div className="flex flex-col space-y-2">
            <label htmlFor="username" className="text-gray-700 font-medium">
              Username
            </label>
            <input
              id="username"
              className="bg-white p-4 rounded-md text-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="password" className="text-gray-700 font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="bg-white p-4 rounded-md text-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-gray-500 font-medium text-left mb-4 ml-2 text-sm">
            <p className="text-gray-700">Demo</p>
            <p>Username: Test</p>
            <p>Password: Test1234</p>
          </div>
          <div className="flex justify-center space-x-10 pt-4">
            <button className="btn-2" type="submit">
              Login
            </button>
            <button
              className="btn px-4"
              type="button"
              onClick={handleRegisterClick}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
