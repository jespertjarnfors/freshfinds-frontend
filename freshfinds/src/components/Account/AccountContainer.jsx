import { useState } from "react";
import Lottie from "lottie-react";
import ProfileAnimation from "../../assets/ProfileAnimation.json";
import Modal from "./Modal";
import PlacesAutocomplete from "../Google Maps/PlacesAutoComplete";

const AccountContainer = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);

  // Placeholder user data
  const userData = {
    username: "User123",
    email: "user123@example.com",
    address: "123 Main St, Anytown, Neverland",
    // Password isn't typically fetched from the server for display
  };

  const handlePasswordChange = (event) => {
    event.preventDefault();
    setShowPasswordModal(true);
  };

  const handleAddressChange = (event) => {
    event.preventDefault();
    setShowAddressModal(true);
  };

  const closeModal = () => {
    setShowPasswordModal(false);
    setShowAddressModal(false);
  };

  // Placeholder functions for confirming changes
  const handlePasswordChangeConfirm = (newPassword, confirmPassword) => {
    // Logic to handle password change
    console.log("New password:", newPassword);
    console.log("Confirm password:", confirmPassword);
    setShowPasswordModal(false);
  };

  const handleAddressChangeConfirm = (newAddress) => {
    // Logic to handle address change
    console.log("New address:", newAddress);
    setShowAddressModal(false);
  };

  return (
    <div
      className="flex flex-col w-1/5 ml-10 mr-5 p-10 rounded-xl shadow-lg"
      style={{ backgroundColor: "#FFEDC2", height: "85vh" }}
    >
      <h1 className="text-2xl text-center font-bold text-gray-700 mb-4">
        Account Details
      </h1>
      <Lottie
        animationData={ProfileAnimation}
        className="w-full h-64 rounded-xl shadow-lg"
        style={{ backgroundColor: "#FFF9EB" }}
      />

      {/* User Details */}
      <div className="my-4 space-y-2">
        <div className="font-bold text-gray-600">
          Username:
          <div
            className="py-2 px-1 font-medium mt-1 rounded-md text-md text-gray-900"
            style={{ backgroundColor: "#FFF9EB" }}
          >
            {userData.username}
          </div>
        </div>
        <div className="font-bold text-gray-600">
          Email:
          <div
            className="py-2 px-1 font-medium mt-1 rounded-md text-md text-gray-900"
            style={{ backgroundColor: "#FFF9EB" }}
          >
            {userData.email}
          </div>
        </div>
        <div className="font-bold text-gray-600">
          Password:
          <div
            className="py-2 px-1 font-medium my-1 rounded-md text-md text-gray-900"
            style={{ backgroundColor: "#FFF9EB" }}
          >
            ********
          </div>
          <a
            href="#"
            onClick={handlePasswordChange}
            className="text-blue-400 underline underline-offset-2 hover:text-blue-500"
          >
            Change Password
          </a>
        </div>
        <div className="font-bold text-gray-600">
          Address:
          <div
            className="py-2 px-1 font-medium my-1 rounded-md text-md text-gray-900"
            style={{ backgroundColor: "#FFF9EB" }}
          >
            {userData.address}
          </div>
          <a
            href="#"
            onClick={handleAddressChange}
            className="text-blue-400 underline underline-offset-2 hover:text-blue-500"
          >
            Change Address
          </a>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
         <Modal isOpen={showPasswordModal} onClose={closeModal}>
          <div>
            <h3 className="text-xl text-center font-semibold mb-6">Change Password</h3>
            <div className="flex flex-col items-center space-y-2">
            <input id="passwordModal" className="p-3 rounded-md" type="password" placeholder="New Password" />
            <div>
            <input id="confirmPasswordModal" className="p-3 rounded-md" type="password" placeholder="Confirm Password" />
            </div>
            </div>
            <div className="mt-6 flex flex-row justify-center space-x-4">
            <button className="btn-2"
              onClick={() =>
                handlePasswordChangeConfirm("newPassword", "confirmPassword")
              }
            >
              Confirm
            </button>
            <button className="btn px-12" onClick={() => setShowPasswordModal(false)}>Exit</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Address Change Modal */}
      {showAddressModal && (
         <Modal isOpen={showAddressModal} onClose={closeModal}>
          <div>
            <h3 className="text-xl font-semibold mb-6">Change Address</h3>
            <PlacesAutocomplete />
            <div className="mt-6 flex flex-row justify-center space-x-4">
            <button className="btn-2" onClick={() => handleAddressChangeConfirm("newAddress")}>
              Confirm
            </button>
            <button className="btn px-12" onClick={() => setShowAddressModal(false)}>Exit</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AccountContainer;
