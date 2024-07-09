import { useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";
import axios from "axios";

const OrdersContainer = () => {
  const { user } = useUser();
  const userId = user.userId;

  // States for orders, seller names, order items, and visibility of order details
  const [orders, setOrders] = useState([]);
  const [sellerNames, setSellerNames] = useState({});
  const [orderItems, setOrderItems] = useState([]);
  const [detailsVisible, setDetailsVisible] = useState({});

  // SVG component for the down arrow icon
  const DownArrowSVG = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
    </svg>
  );


  // Function to toggle the visibility of order details
  const toggleDetails = (orderId) => {
    setDetailsVisible(prev => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  // Function to calculate the total cost of an order
  const calculateTotalCost = (items) => {
    return items.reduce((total, item) => {
      const product = orderItems.find(orderItem => orderItem._id === item._id);
      return total + (product?.price || 0);
    }, 0).toFixed(2);
  };

  // Fetch user orders from the API
  const fetchUserOrders = async () => {
    try {
      const apiUrl = `https://freshfinds-backend.vercel.app/api/orders/user/${userId}`;
      const response = await axios.get(apiUrl);

      if (response.status === 200) {
        const orderData = response.data.data;

        let allOrderItems = [];
        // Sort orders by date (newest first) and map to process
        const processedOrders = orderData
          .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
          .map((order) => {
            allOrderItems = allOrderItems.concat(order.items);

            return {
              orderId: order._id,
              orderDate: order.orderDate,
              orderStatus: order.orderStatus,
              sellerId: order.sellerId,
              items: order.items,
            };
          });

        setOrders(processedOrders);
        setOrderItems(allOrderItems);

        // Fetch seller usernames based on unique seller IDs
        const uniqueSellerIds = [...new Set(processedOrders.map(order => order.sellerId))];
        const sellerData = {};
        await Promise.all(uniqueSellerIds.map(async (sellerId) => {
          try {
            const sellerResponse = await axios.get(`https://freshfinds-backend.vercel.app/api/users/${sellerId}`);
            sellerData[sellerId] = sellerResponse.data.data.username;
          } catch (error) {
            console.error("Error fetching seller data:", error);
          }
        }));
        setSellerNames(sellerData);
      } else {
        console.error("Failed to fetch user's orders");
      }
    } catch (error) {
      console.error("Error fetching user's orders:", error);
    }
  };

  // Fetch product names for order items
  const fetchProductNames = async () => {
    if (orderItems.length > 0) {
      const updatedOrderItems = await Promise.all(orderItems.map(async (item) => {
        try {
          const productResponse = await axios.get(`https://freshfinds-backend.vercel.app/api/products/${item.productId}`);
          return { ...item, productName: productResponse.data.data.productName };
        } catch (error) {
          console.error("Error fetching product data:", error);
          return item;
        }
      }));
      setOrderItems(updatedOrderItems);
    }
  };

  // useEffect hooks to fetch orders and product names
  useEffect(() => {
    fetchUserOrders();
  }, []);

  useEffect(() => {
    fetchProductNames();
  }, [orderItems]);

  return (
    <div className="flex flex-row md:w-4/5 mr-5 ml-5 md:ml-2 my-5 lg:my-0 lg:ml-5 lg:mr-10 p-10 xl:p-5 3xl:p-10 rounded-xl shadow-lg justify-between custom-scrollbar overflow-hidden"
         style={{ backgroundColor: "#FFEDC2", height: "85vh", overflowY: "auto" }}>
      <div className="w-full">
        <h1 className="text-2xl xl:text-xl font-bold text-gray-700 mb-4">Order History</h1>
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Mapping over the orders to distribute the relevant data */}
          {orders.map((order) => (
            <div key={order.orderId} className="shadow-md rounded-lg p-4"
            style={{ backgroundColor: "#FFF9EB" }}
            >
              
              <p>Date: {new Date(order.orderDate).toLocaleString()}</p>
              <p>Seller: {sellerNames[order.sellerId]}</p>
              <button onClick={() => toggleDetails(order.orderId)} className="text-blue-400 font-medium hover:text-blue-500 flex items-center">
                {detailsVisible[order.orderId] ? <span>Hide Details <DownArrowSVG /></span> : <span>Show Details <DownArrowSVG /></span>}
              </button>
              {detailsVisible[order.orderId] && (
                <div>
                  <div className="mt-2">
                    {order.items.map(item => {
                      const product = orderItems.find(orderItem => orderItem._id === item._id);
                      return (
                        <p key={item._id}>
                          {item.quantity} x {product?.productName || item.productId} - ${product?.price ? product.price.toFixed(2) : "Price not available"}
                        </p>
                      );
                    })}
                  </div>
                  <p>Total Cost: ${calculateTotalCost(order.items)}</p>
                  <p>Order Status: {order.orderStatus}</p>
                  <p className="text-md">Order ID: {order.orderId}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersContainer;
