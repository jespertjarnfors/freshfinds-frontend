import { useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";
import axios from "axios";

const OrdersContainer = () => {
  const { user } = useUser();
  const userId = user.userId;

  const [orders, setOrders] = useState([]);
  const [sellerNames, setSellerNames] = useState({});
  const [orderItems, setOrderItems] = useState([]);

  const fetchUserOrders = async () => {
    try {
      const apiUrl = `http://localhost:3000/api/orders/user/${userId}`;
      const response = await axios.get(apiUrl);

      if (response.status === 200) {
        const orderData = response.data.data;

        let allOrderItems = [];
        const processedOrders = orderData.map((order) => {
          allOrderItems = allOrderItems.concat(order.items); // Collect all order items

          return {
            orderId: order._id,
            orderDate: order.orderDate,
            orderStatus: order.orderStatus,
            sellerId: order.sellerId,
            items: order.items,
          };
        });

        setOrders(processedOrders);
        setOrderItems(allOrderItems); // Update order items for product name fetching

        // Fetch seller usernames
        const uniqueSellerIds = [
          ...new Set(processedOrders.map((order) => order.sellerId)),
        ];
        const sellerData = {};
        await Promise.all(
          uniqueSellerIds.map(async (sellerId) => {
            try {
              const sellerResponse = await axios.get(
                `http://localhost:3000/api/users/${sellerId}`
              );
              sellerData[sellerId] = sellerResponse.data.data.username;
            } catch (error) {
              console.error("Error fetching seller data:", error);
            }
          })
        );
        setSellerNames(sellerData);
      } else {
        console.error("Failed to fetch user's orders");
      }
    } catch (error) {
      console.error("Error fetching user's orders:", error);
    }
  };

  const fetchProductNames = async () => {
    if (orderItems.length > 0) {
      const updatedOrderItems = await Promise.all(
        orderItems.map(async (item) => {
          try {
            const productResponse = await axios.get(
              `http://localhost:3000/api/products/${item.productId}`
            );
            return {
              ...item,
              productName: productResponse.data.data.productName,
            };
          } catch (error) {
            console.error("Error fetching product data:", error);
            return item; // Return the original item if there's an error
          }
        })
      );
      setOrderItems(updatedOrderItems);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  useEffect(() => {
    fetchProductNames();
  }, [orderItems]);

  return (
    <div
      className="flex flex-row w-4/5 mr-10 p-10 rounded-xl shadow-lg justify-between custom-scrollbar overflow-hidden"
      style={{ backgroundColor: "#FFEDC2", height: "85vh", overflowY: "auto" }}
    >
      <div className="w-full">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Order History</h1>
        <div className="grid grid-cols-3 gap-4">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="bg-white shadow-md rounded-lg p-4"
            >
              <p className="text-xl font-semibold">Order ID: {order.orderId}</p>
              <p>Date: {new Date(order.orderDate).toLocaleString()}</p>
              <p>Seller: {sellerNames[order.sellerId]}</p>
              <p>
                Products:{" "}
                {order.items.map(item => {
                  const product = orderItems.find(oi => oi._id === item._id);
                  const productName = product?.productName || item.productId;
                  const productPrice = product?.price ? `$${product.price.toFixed(2)}` : "Price not available";
                  return `${item.quantity} x ${productName} (${productPrice})`;
                }).join(", ")}
              </p>
              <p>Order Status: {order.orderStatus}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
};

export default OrdersContainer;
