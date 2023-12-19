import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/LogoMedium.png";
import { signIn } from "../../auth";

const LoginForm = () => {

  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
  };

  // State variables for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await signIn(username, password);
      console.log(result);
      // Handle successful login here
    } catch (err) {
      console.error(err);
      // Handle login error here
    }
  };

  return (
    <div
      className="flex items-center justify-center"
      style={{
        minHeight: "85svh",
      }}
    >
      <div className="rounded-md w-1/3 p-8">
        <div className="flex flex-col justify-center items-center">
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
              className="bg-white p-4 rounded-md text-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="password" className="text-gray-700 font-medium">
              Password
            </label>
            <input
              type="password"
              className="bg-white p-4 rounded-md text-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="flex justify-center space-x-10 pt-4">
            <button className="btn-2" type="submit">
              Login
            </button>
            <button className="btn px-10" type="button" onClick={handleRegisterClick}>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
