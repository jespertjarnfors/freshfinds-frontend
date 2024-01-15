import { useCallback } from "react";
import { useCart } from "../contexts/CartContext";
import axios from "axios";
import { useUser } from "./useUser";

const useCheckoutProcess = () => {
  const { cart } = useCart();
  const { user } = useUser();
  const userId = user.userId;

  /* Groups cart items by seller, returning an array where each element 
    represents a seller and the items the user is purchasing off them */
  const groupCartItemsBySeller = (cart) => {
    const grouped = cart.reduce((groupedItems, item) => {
      groupedItems[item.seller] = [...(groupedItems[item.seller] || []), item];
      return groupedItems;
    }, {});
    return Object.entries(grouped).map(([seller, items]) => ({
      seller,
      items,
    }));
  };

  /* Fetches the userId associated with a seller's username.
    Used to retrieve seller details needed for order creation. */
  const fetchSellerUserId = async (sellerUsername) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/users/username/${sellerUsername}`
      );
      return response.data.data._id; // This is the format of the API response
    } catch (error) {
      console.error("Error fetching seller's user ID:", error);
      throw error;
    }
  };

  const createOrder = async (sellerGroup) => {
    const orderData = {
        userId: userId,
        items: sellerGroup.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.totalPrice,
        })),
        sellerId: sellerGroup.sellerId,
        orderStatus: "Pending", // Include orderStatus with default value
    };
    
    // POST request to create an order for each seller
    const response = await axios.post("http://localhost:3000/api/orders/create", orderData);

    // Extract the orderId from the response
    const orderId = response.data.data[0]._id;

    return orderId;
};

/* Processes checkout by creating orders and updating product quantities.
   This function defines the entire checkout process:
   - Groups cart items by seller
   - Fetches seller IDs for each group
   - Creates orders for each seller group
   - Updates product quantities after order creation
   - Handles errors if anyduring the process */
   const processCheckout = useCallback(async () => {
    
    const groupedItems = groupCartItemsBySeller(cart);
    let orderIds = []; // Array to store order IDs
  
    for (const group of groupedItems) {
      try {
        const sellerId = await fetchSellerUserId(group.seller);
        group.sellerId = sellerId; // Update group to include sellerId
  
        // Call createOrder function to handle order creation
        const orderId = await createOrder(group);
        orderIds.push(orderId); // Store the returned orderId
  
        // Update product quantities
        for (const item of group.items) {
          const newQuantity = item.initialQuantity - item.quantity;
          await axios.put(
            `http://localhost:3000/api/products/update/${item.productId}`,
            { quantity: newQuantity }
          );
        }
      } catch (error) {
        console.error("Error in processing checkout:", error);
        // Handle the error appropriately
      }
    }
  
    return orderIds; // Return the array of order IDs
  }, [cart, user.userId]);
  
  return processCheckout;
  
};

export default useCheckoutProcess;
