import { useEffect, useState } from "react";
import axios from "axios";
import { useCheckout } from "../../contexts/CheckoutContext";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import ReviewForm from "../Reviews/ReviewForm";

const OrderConfirmation = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [sellerNames, setSellerNames] = useState({}); // To store seller usernames
  const { orderIds, moveToShipping } = useCheckout(); // Access orderIds from the CheckoutContext
  const [reviewFormVisibility, setReviewFormVisibility] = useState([]);
  const [reviewsCreated, setReviewsCreated] = useState(false); // Track if reviews have been created

  const navigate = useNavigate();
  const { user } = useUser();

  // Function to handle the "Start Over" button click
  const handleStartOver = () => {
    // Reset the CheckoutContext
    moveToShipping();
    navigate("/products");
  };

  // Function to the toggle visibility of the RevievForm
  const handleReviewSuccess = (index) => {
    // Create a copy of the visibility array
    const updatedVisibility = [...reviewFormVisibility];
    // Set the visibility state for the specific ReviewForm to false
    updatedVisibility[index] = false;
    // Update the state to hide the ReviewForm
    setReviewFormVisibility(updatedVisibility);
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

          const fetchedOrders = responses.map((res) => res.data.data);
          setOrderDetails(fetchedOrders);

          // Extract and store order items separately
          const items = fetchedOrders.map((order) => order.items);
          setOrderItems(items.flat()); // Flatten the array of items

          // Fetch seller usernames and store them
          const sellerIds = fetchedOrders.map((order) => order.sellerId);
          const uniqueSellerIds = [...new Set(sellerIds)]; // Remove duplicates if any
          const sellerNameData = {};
          for (const sellerId of uniqueSellerIds) {
            try {
              const sellerResponse = await axios.get(
                `http://localhost:3000/api/users/${sellerId}`
              );
              const sellerData = sellerResponse.data.data;
              sellerNameData[sellerId] = sellerData.username;
            } catch (error) {
              console.error("Error fetching seller data:", error);
            }
          }
          setSellerNames(sellerNameData);

          // Initialize reviewFormVisibility with true values for each order
          setReviewFormVisibility(Array(fetchedOrders.length).fill(true));
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

  // Separate useEffect to fetch and update product names
  useEffect(() => {
    const fetchProductNames = async () => {
      if (orderItems.length > 0) {
        const updatedOrderItems = [];
        for (const item of orderItems) {
          try {
            const productResponse = await axios.get(
              `http://localhost:3000/api/products/${item.productId}`
            );

            const productData = productResponse.data.data;
            const updatedItem = {
              ...item,
              productName: productData.productName,
            };
            updatedOrderItems.push(updatedItem);
          } catch (error) {
            console.error("Error fetching product data:", error);
          }
        }
        setOrderItems(updatedOrderItems);
      }
    };

    fetchProductNames();
  }, [orderItems]); // Fetch product names when orderItems change

  // useEffect to create a review based on the order data
  useEffect(() => {
    // Assigning default values for each order
    const createReviews = async () => {
      for (const order of orderDetails) {
        const userId = user.userId;
        const targetUserId = order.sellerId;
        const orderId = order._id;

        try {
          const response = await axios.post(
            `http://localhost:3000/api/reviews/create`,
            {
              userId,
              targetUserId,
              orderId,
              rating: 5, // Default rating
              status: "pending",
            }
          );

          console.log("Review created successfully:", response.data.data);
        } catch (error) {
          console.error("Error creating review:", error);
        }
      }
    };

    // Check if all required data is available before creating the reviews
    if (user && orderDetails.length > 0) {
      createReviews();
      // Once reviews are created, set the state to indicate it
      setReviewsCreated(true);
    }
  }, [user, orderDetails]);

  return (
    <div className="flex flex-row">
      <div className="max-w-3xl mx-auto p-8 shadow-xl bg-white border-2 border-gray-400 rounded-xl mt-10">
        <h1 className="text-3xl font-semibold mb-4">Order Confirmation</h1>
        <p className="mb-4">Your order has been confirmed.</p>

        {/* Conditionally display order details */}
        {orderDetails.length > 0 ? (
          orderDetails.map((order) => (
            <div key={order._id} className="border p-4 mb-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">
                Order ID: {order._id}
              </h2>
              <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
              <p>Seller: {sellerNames[order.sellerId]}</p>{" "}
              {/* Display seller username */}
            </div>
          ))
        ) : (
          <p>Loading order details...</p>
        )}

        {/* Display order items */}
        {orderItems.length > 0 ? (
          <div className="border p-4 mb-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Order Items</h2>
            {orderItems.map((item) => (
              <div key={item._id} className="flex justify-between">
                <p>
                  {item.quantity} x {item.productName || item.productId}
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

        {/* Start Over Button */}
        <div className="flex justify-center">
          <button className="btn" onClick={handleStartOver}>
            Start Over
          </button>
        </div>
      </div>

      {/* Conditionally display ReviewForm */}
      <div className="grid grid-cols-2 gap-2 mt-10">
        {reviewsCreated && // Only render ReviewForm components if new reviews have been created
          orderDetails.map(
            (order, index) =>
              reviewFormVisibility[index] && (
                <ReviewForm
                  key={order._id}
                  orderId={order._id}
                  onSuccess={() => handleReviewSuccess(index)}
                />
              )
          )}
      </div>
    </div>
  );
};

export default OrderConfirmation;
