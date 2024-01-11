import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import UserPool from "../components/AWS/UserPool";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
 
  const [user, setUser] = useState(null);  // State to store the current user's data
  const [loginTrigger, setLoginTrigger] = useState(false); // State to trigger useEffect


  // Load user attributes from Cognito on component mount if user is already signed in
  useEffect(() => {
    console.log("Before setting user:", user);
    const idToken = localStorage.getItem("id_token");
    if (idToken) {
      const decodedToken = jwtDecode(idToken);
      const userDetails = {
        cognitoId: decodedToken.sub, // Assuming 'sub' is the cognitoId in the decoded token
        username: decodedToken["cognito:username"],
        email: decodedToken.email,
        address: decodedToken.address ? decodedToken.address.formatted : "",
        isProducer: decodedToken["custom:isProducer"],
        latitude: decodedToken["custom:latitude"],
        longitude: decodedToken["custom:longitude"],
      };
      setUser(userDetails); // Update the user data in state
      console.log("After setting user:", userDetails);
    } else {
      setUser(null); // Handle case where there is no token (user is not logged in)
      console.log("No id_token found, user set to null");
    }
  }, [loginTrigger]); // useEffect triggered by changes in loginTrigger

  // Function to sign out a user
  const signOut = () => {
    const cognitoUser = UserPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
      localStorage.removeItem("id_token");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      setUser(null);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, signOut, setLoginTrigger }}>
      {children}
    </UserContext.Provider>
  );
};
