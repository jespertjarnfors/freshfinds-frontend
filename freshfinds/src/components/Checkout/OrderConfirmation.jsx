import { useEffect, useState } from "react";
import axios from "axios";
import { useCheckout } from "../../contexts/CheckoutContext";
import { useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const { orderIds, moveToShipping } = useCheckout(); // Access orderIds from the CheckoutContext
  const navigate = useNavigate();

  // Function to handle the "Start Over" button click
  const handleStartOver = () => {
    // Reset the CheckoutContext
    moveToShipping();
    navigate("/products"); 
  };

  useEffect(() => {
    const maxRetries = 3;
    let retryCount = 0;

    const fetchData = async () => {
      if (orderIds && orderIds.length > 0) {
        try {
          const responses = await Promise.all(
            orderIds.map((orderId) =>
              axios.get(`http://localhost:3000/api/orders/${orderId}`)
            )
          );

          console.log("Responses from API:", responses);
          const fetchedOrders = responses.map((res) => res.data.data);
          setOrderDetails(fetchedOrders);

          // Extract and store order items separately
          const items = fetchedOrders.map((order) => order.items);
          setOrderItems(items.flat()); // Flatten the array of items
        } catch (error) {
          console.error("Error fetching order details:", error);
          if (retryCount < maxRetries) {
            // Retry the fetch after a delay (e.g., 1 second)
            console.log("Retrying fetch...");
            setTimeout(() => {
              retryCount++;
              fetchData();
            }, 1000);
          }
        }
      }
    };

    fetchData(); // Start the initial fetch
  }, [orderIds]);

  return (
    <div className="max-w-3xl mx-auto p-8 shadow-xl bg-white border-2 border-gray-400 rounded-xl mt-10">
      <h1 className="text-3xl font-semibold mb-4">Order Confirmation</h1>
      <p className="mb-4">Your order has been confirmed.</p>

      {/* Conditionally display order details */}
      {orderDetails.length > 0 ? (
        orderDetails.map((order) => (
          <div key={order._id} className="border p-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">
              Order ID: {order._id}
            </h2>
            <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
            <p>Seller: {order.sellerId}</p>
          </div>
        ))
      ) : (
        <p>Loading order details...</p>
      )}

      {/* Display order items */}
      {orderItems.length > 0 ? (
        <div className="border p-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">Order Items</h2>
          {orderItems.map((item) => (
            <div key={item._id} className="flex justify-between">
              <p>
                {item.quantity} x {item.productId}
              </p>
              <p>
                ${item.price ? item.price.toFixed(2) : "Price not available"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No order items available</p>
      )}
       <button className="btn" onClick={handleStartOver}>Start Over</button>
    </div>
  );
};

export default OrderConfirmation;
