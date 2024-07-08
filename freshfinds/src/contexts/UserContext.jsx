import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { signOut as signOutFromAuth } from "../auth";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to store the current user's data
  const [loginTrigger, setLoginTrigger] = useState(false); // State to trigger useEffect

  // Load user attributes from Cognito on component mount if the user is already signed in
  useEffect(() => {

    const idToken = localStorage.getItem("id_token");

    const fetchUserIdFromMongoDB = async (cognitoId) => {
      try {
        const response = await fetch(
          `https://freshfinds-backend.vercel.app/api/users/cognito/${cognitoId}`
        );
        const userData = await response.json();

        if (response.ok) {
          // Add userId to user details
          const userDetailsWithUserId = {
            ...userDetails,
            userId: userData.data._id,
          };
          setUser(userDetailsWithUserId);
        } else {
          console.error("Failed to fetch userId from MongoDB");
        }
      } catch (error) {
        console.error("Error fetching userId from MongoDB:", error);
      }
    };

    let userDetails = null;

    // Check if idToken exists, then decodes it
    if (idToken) {
      const decodedToken = jwtDecode(idToken);
      userDetails = {
        cognitoId: decodedToken.sub,
        username: decodedToken["cognito:username"],
        email: decodedToken.email,
        address: decodedToken.address ? decodedToken.address.formatted : "",
        isProducer: decodedToken["custom:isProducer"],
        latitude: decodedToken["custom:latitude"],
        longitude: decodedToken["custom:longitude"],
      };
      setUser(userDetails); // Update the user data in state
      // Fetch userId from MongoDB
      fetchUserIdFromMongoDB(decodedToken.sub);
    } else {
      setUser(null); // Handle the case where there is no token (user is not logged in)
    }
  }, [loginTrigger]); // useEffect triggered by changes in loginTrigger

  const signUp = (username) => {
    setUser({ username });
  };

  // signOut function that uses signOut from auth.js
  const signOut = () => {
    signOutFromAuth();
    setUser(null); // Update user state to reflect sign out
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, signUp, signOut, setLoginTrigger }}
    >
      {children}
    </UserContext.Provider>
  );
};
