import { useState } from "react";
import Lottie from "lottie-react";
import ProfileAnimation from "../../assets/ProfileAnimation.json";
import Modal from "./Modal";
import PlacesAutocomplete from "../Google Maps/PlacesAutoComplete";
import { useUser } from "../../hooks/useUser";
import { changePassword, updateUserAddress } from "../../auth";

const AccountContainer = () => {
  // States to handle modal visibility
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);

  // States to handle new address and coordinates
  const [newAddress, setNewAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  const { user, setUser } = useUser(); // Access user data from UserContext

  // Check if the user data is available
  if (!user) {
    // Display a loading message or handle the case accordingly
    return <div>Loading user details...</div>;
  } // Check if the user data is available

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

  // Function to handle password change confirmation
  const handlePasswordChangeConfirm = async (
    oldPassword,
    newPassword,
    confirmPassword
  ) => {
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    try {
      await changePassword(oldPassword, newPassword);
      alert("Password changed successfully");
      closeModal();
    } catch (error) {
      console.error("Error changing password:", error);
      alert(
        "Failed to change password. Make sure your old password is correct."
      );
    }
  };

  // Function to handle address change confirmation
  const handleAddressChangeConfirm = async () => {
    if (coordinates.lat === null || coordinates.lng === null) {
      alert("Please select an address.");
      return;
    }

    try {
      await updateUserAddress(
        user.cognitoId,
        newAddress,
        coordinates.lat.toString(),
        coordinates.lng.toString()
      );
      alert("Address updated successfully");
      closeModal();

       // Update the user context with the new address
       setUser({
        ...user,
        address: newAddress,
        latitude: coordinates.lat.toString(),
        longitude: coordinates.lng.toString()
      });

    } catch (error) {
      console.error("Error updating address:", error);
      alert("Failed to update address");
    }
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
            className="py-2 px-2 font-medium mt-1 rounded-md text-md text-gray-900"
            style={{ backgroundColor: "#FFF9EB" }}
          >
            {user.username} {/* Updated to use user data from context */}
          </div>
        </div>
        <div className="font-bold text-gray-600">
          Email:
          <div
            className="py-2 px-2 font-medium mt-1 rounded-md text-md text-gray-900"
            style={{ backgroundColor: "#FFF9EB" }}
          >
            {user.email} {/* Updated to use user data from context */}
          </div>
        </div>
        <div className="font-bold text-gray-600">
          Password:
          <div
            className="py-2 px-2 font-medium my-1 rounded-md text-md text-gray-900"
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
            className="py-2 px-2 font-medium my-1 rounded-md text-md text-gray-900"
            style={{ backgroundColor: "#FFF9EB" }}
          >
            {user.address} {/* Updated to use user data from context */}
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
            <h3 className="text-xl text-center font-semibold mb-6">
              Change Password
            </h3>
            <div className="flex flex-col items-center space-y-2">
              <input
                id="oldPasswordModal"
                className="p-3 rounded-md"
                type="password"
                placeholder="Old Password"
              />
              <input
                id="newPasswordModal"
                className="p-3 rounded-md"
                type="password"
                placeholder="New Password"
              />
              <input
                id="confirmPasswordModal"
                className="p-3 rounded-md"
                type="password"
                placeholder="Confirm New Password"
              />
            </div>
            <div className="mt-6 flex flex-row justify-center space-x-4">
              <button
                className="btn-2"
                onClick={() => {
                  const oldPassword =
                    document.getElementById("oldPasswordModal").value;
                  const newPassword =
                    document.getElementById("newPasswordModal").value;
                  const confirmPassword = document.getElementById(
                    "confirmPasswordModal"
                  ).value;
                  handlePasswordChangeConfirm(
                    oldPassword,
                    newPassword,
                    confirmPassword
                  );
                }}
              >
                Confirm
              </button>
              <button
                className="btn px-12"
                onClick={() => setShowPasswordModal(false)}
              >
                Exit
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Address Change Modal */}
      {showAddressModal && (
        <Modal isOpen={showAddressModal} onClose={closeModal}>
          <div>
            <h3 className="text-xl font-semibold mb-6">Change Address</h3>
            <PlacesAutocomplete
              onAddressChange={(address) => setNewAddress(address)}
              onSelect={({ lat, lng }) => setCoordinates({ lat, lng })}
            />
            <div className="mt-6 flex flex-row justify-center space-x-4">
              <button
                className="btn-2"
                onClick={() => handleAddressChangeConfirm()}
              >
                Confirm
              </button>
              <button
                className="btn px-12"
                onClick={() => setShowAddressModal(false)}
              >
                Exit
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AccountContainer;
