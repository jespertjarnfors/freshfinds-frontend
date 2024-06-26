import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import UserPool from "../AWS/UserPool";
import PlacesAutocomplete from "../Google Maps/PlacesAutoComplete";
import RegisterHeading from "./RegisterHeading";
import "./RegisterForm.css";

const RegisterForm = () => {
  // Form input
  const { signUp } = useUser();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [isProducer, setIsProducer] = useState("false"); // "false" for consumer, "true" for producer

  // Error states
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // For navigation
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/home");
  };

  // Prevent site reload on form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation critera
    const emailRegex = /^\S+@\S+\.\S+$/;
    const nameRegex = /^[A-Za-z]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    // Validation functions for all fields
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email.");
    } else {
      setEmailError("");
    }

    if (!nameRegex.test(firstName) || !nameRegex.test(surname)) {
      setNameError("Name and Surname can only contain letters.");
    } else {
      setNameError("");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long."
      );
    } else {
      setPasswordError("");
    }

    if (coordinates.lat === null || coordinates.lng === null) {
      console.error("Please select an address.");
      return;
    }

    // Convert the form data into an object to pass to the AWS Cognito API
    UserPool.signUp(
      username,
      password,
      [
        { Name: "email", Value: email },
        { Name: "given_name", Value: firstName },
        { Name: "family_name", Value: surname },
        { Name: "address", Value: address },
        { Name: "custom:latitude", Value: coordinates.lat.toFixed(6) },
        { Name: "custom:longitude", Value: coordinates.lng.toFixed(6) },
        { Name: "custom:isProducer", Value: isProducer }, // Pass isProducer as a number
      ],
      null,
      (err, data) => {
        if (err) console.error(err);
        console.log(data);
        if (data) {
          signUp(username);
          navigate("/verification");
          // Clear any validations errors if user successfully signed up
          setEmailError("");
          setNameError("");
          setPasswordError("");
          setConfirmPasswordError("");
        }
      }
    );
  };

  return (
    <div
      className="flex items-center justify-center"
      style={{
        minHeight: "85svh",
      }}
    >
      <div className="rounded-md w-4/5 text-sm md:text-lg lg:w-1/2 xl:w-2/5 2xl:w-1/3">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-1 p-8 rounded-2xl shadow-xl"
        >
          <RegisterHeading></RegisterHeading>
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-gray-700 font-medium 2xl:text-sm 3xl:text-lg">
              Email
            </label>
            {emailError && <div className="text-red-500">{emailError}</div>}
            <input
              className="bg-white p-2 xl:p-0.5 2xl:p-2 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="username" className="text-gray-700 font-medium 2xl:text-sm 3xl:text-lg">
              Username
            </label>
            <input
              className="bg-white p-2 xl:p-0.5 2xl:p-2 rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="flex flex-col w-full space-y-2">
              <label htmlFor="givenName" className="text-gray-700 font-medium 2xl:text-sm 3xl:text-lg">
                First Name
              </label>
              {nameError && <div className="text-red-500">{nameError}</div>}
              <input
                className="bg-white p-2 xl:p-0.5 2xl:p-2 rounded-md"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></input>
            </div>
            <div className="flex flex-col w-full space-y-2">
              <label htmlFor="familyName" className="text-gray-700 font-medium 2xl:text-sm 3xl:text-lg">
                Surname
              </label>
              <input
                className="bg-white p-2 xl:p-0.5 2xl:p-2 rounded-md"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="flex flex-col w-full space-y-2">
              <label htmlFor="password" className="text-gray-700 font-medium 2xl:text-sm 3xl:text-lg">
                Password
              </label>
              {passwordError && (
                <div className="text-red-500">{passwordError}</div>
              )}
              <input
                type="password"
                className="bg-white p-2 xl:p-0.5 2xl:p-2 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div className="flex flex-col w-full space-y-2">
              <label
                htmlFor="confirmPassword"
                className="text-gray-700 font-medium 2xl:text-sm 3xl:text-lg"
              >
                Confirm Password
              </label>
              {confirmPasswordError && (
                <div className="text-red-500">{confirmPasswordError}</div>
              )}
              <input
                type="password"
                className="bg-white p-2 xl:p-0.5 2xl:p-2 rounded-md"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="address" className="text-gray-700 font-medium 2xl:text-sm 3xl:text-lg">
              Address
            </label>
            <PlacesAutocomplete
              onAddressChange={setAddress}
              onSelect={setCoordinates}
            />
          </div>
          <div className="flex flex-col space-y-3">
            <label className="text-gray-700 font-medium 2xl:text-sm 3xl:text-lg">
              Are you wanting to sell or buy produce?
            </label>
            <div className="flex items-center space-x-4">
              <div>
                <label className="custom-radio-container text-gray-700 font-medium 2xl:text-sm 3xl:text-lg">
                  Buy
                  <input
                    type="radio"
                    id="buy"
                    name="isProducer"
                    value="false"
                    checked={isProducer === "false"}
                    onChange={() => setIsProducer("false")}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div>
                <label className="custom-radio-container text-gray-700 font-medium 2xl:text-sm 3xl:text-lg">
                  Sell
                  <input
                    type="radio"
                    id="sell"
                    name="isProducer"
                    value="true"
                    checked={isProducer === "true"}
                    onChange={() => setIsProducer("true")}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-center pt-2 md:pt-1 space-x-5 md:space-x-10">
            <button className="btn-2 px-5" type="submit">
              Sign Up
            </button>
            <button
              className="btn md:px-10"
              type="button"
              onClick={handleBackClick}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
