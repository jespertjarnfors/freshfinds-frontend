import { useState } from "react";
import { useCheckout } from "../../contexts/CheckoutContext";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

const PaymentForm = ({ onPaymentSubmit }) => {
  // Payment form states
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cardHolderName: "",
    cvv: "",
  });

  const [expirationMonth, setExpirationMonth] = useState("");
  const [expirationYear, setExpirationYear] = useState("");

  const { moveToConfirmation } = useCheckout();

  const validateInput = (name, value) => {
    switch (name) {
      case "cardNumber":
        return /^[0-9]{0,16}$/.test(value); // Only numbers, up to 16 digits
      case "cardHolderName":
        return /^[A-Za-z\s]*$/.test(value); // Only letters and spaces
      case "expirationDate":
        return /^(0[1-9]|1[0-2])\/?([0-9]{2})?$/.test(value); // Format MM/YY
      case "cvv":
        return /^[0-9]{0,3}$/.test(value); // Only 3 digits
      default:
        return true;
    }
  };

  const handleChange = (e) => {
    if (validateInput(e.target.name, e.target.value)) {
      setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // No need to process paymentDetails for this dummy setup
    moveToConfirmation(); // change the current step to 'confirmation'
  };

  return (
    <div
      className="p-4 shadow-xl rounded-lg"
      style={{ backgroundColor: "#FFEDC2" }}
    >
      <form onSubmit={handleSubmit}>
        {/* Card Number */}
        <div className="mb-4">
          <label
            htmlFor="cardNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={paymentDetails.cardNumber}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>

        {/* Card Holder Name */}
        <div className="mb-4">
          <label
            htmlFor="cardHolderName"
            className="block text-sm font-medium text-gray-700"
          >
            Card Holder Name
          </label>
          <input
            type="text"
            id="cardHolderName"
            name="cardHolderName"
            value={paymentDetails.cardHolderName}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="John Doe"
            required
          />
        </div>

        {/* Expiration Date and CVV */}
        <div className="grid grid-cols-2 gap-4">
          {/* Month Selector */}
          <div className="mb-4">
            <label
              htmlFor="expirationMonth"
              className="block text-sm font-medium text-gray-700"
            >
              Expiration Month
            </label>
            <select
              id="expirationMonth"
              name="expirationMonth"
              value={expirationMonth}
              onChange={(e) => setExpirationMonth(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
              required
            >
              <option value="">Month</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={month.toString().padStart(2, "0")}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          {/* Year Selector */}
          <div className="mb-4">
            <label
              htmlFor="expirationYear"
              className="block text-sm font-medium text-gray-700"
            >
              Expiration Year
            </label>
            <select
              id="expirationYear"
              name="expirationYear"
              value={expirationYear}
              onChange={(e) => setExpirationYear(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
              required
            >
              <option value="">Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* CVV Input Field */}
          <div className="mb-4">
            <label
              htmlFor="cvv"
              className="block text-sm font-medium text-gray-700"
            >
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={paymentDetails.cvv}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
              placeholder="123"
              required
            />
          </div>
        </div>

        {/* Complete Checkout Button */}
        <button
          type="submit"
          className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded w-full"
        >
          Complete Checkout
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
