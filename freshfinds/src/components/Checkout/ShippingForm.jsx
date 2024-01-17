import { useState } from "react";
import { useCheckout } from "../../contexts/CheckoutContext";

const ShippingForm = () => {

// Form state for shipping details
  const [shippingDetails, setShippingDetails] = useState({
    fullName: "",
    addressLine1: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    contactNumber: "",
  });

  const { moveToPayment } = useCheckout();

  // Validation for input fields
  const validateInput = (name, value) => {
    switch (name) {
      case "fullName":
      case "city":
      case "state":
      case "country":
        return /^[A-Za-z\s]*$/.test(value); // Letters and spaces
      case "addressLine1":
        return /^[A-Za-z0-9\s,.-]*$/.test(value); // Letters, numbers, spaces, commas, periods, hyphens
      case "zipCode":
        return /^[A-Za-z0-9]*$/.test(value); // Alphanumeric (for international zip codes)
      case "contactNumber":
        return /^[0-9+()\s-]*$/.test(value); // Numeric, plus sign, parentheses, spaces, hyphens
      default:
        return true;
    }
  };

  const handleChange = (e) => {
    if (validateInput(e.target.name, e.target.value)) {
      setShippingDetails({
        ...shippingDetails,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    moveToPayment(shippingDetails);
  };

  return (
    <div
      className="p-4 shadow-xl rounded-lg mt-2"
      style={{ backgroundColor: "#FFEDC2" }}
    >
      <form onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={shippingDetails.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>

        {/* Address Line 1 */}
        <div className="mb-4">
          <label
            htmlFor="addressLine1"
            className="block text-sm font-medium text-gray-700"
          >
            Address Line 1
          </label>
          <input
            type="text"
            id="addressLine1"
            name="addressLine1"
            value={shippingDetails.addressLine1}
            onChange={handleChange}
            placeholder="1234 Main St"
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>

        {/* City, State , Zip Code */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4">
          {/* City */}
          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={shippingDetails.city}
              onChange={handleChange}
              placeholder="Wellington"
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          {/* State/Province */}
          <div className="mb-4">
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700"
            >
              State/Province
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={shippingDetails.state}
              onChange={handleChange}
              placeholder="Wellington"
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>

          {/* Zip Code */}
          <div className="mb-4">
            <label
              htmlFor="zipCode"
              className="block text-sm font-medium text-gray-700"
            >
              Zip Code
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={shippingDetails.zipCode}
              onChange={handleChange}
              placeholder="6011"
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
        </div>

        {/* Country */}
        <div className="mb-4">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={shippingDetails.country}
            onChange={handleChange}
            placeholder="New Zealand"
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>

        {/* Contact Number */}
        <div className="mb-4">
          <label
            htmlFor="contactNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Contact Number
          </label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            value={shippingDetails.contactNumber}
            onChange={handleChange}
            placeholder="0211234567"
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded w-full"
        >
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default ShippingForm;
