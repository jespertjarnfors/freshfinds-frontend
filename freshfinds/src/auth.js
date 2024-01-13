import { jwtDecode } from "jwt-decode";

import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";
import { cognitoConfig } from "./cognitoConfig";

const userPool = new CognitoUserPool({
  UserPoolId: cognitoConfig.UserPoolId,
  ClientId: cognitoConfig.ClientId,
});

export function logIn(username, password, onContextUpdate) {
  return new Promise((resolve, reject) => {
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        // Clear existing tokens from local storage
        localStorage.removeItem("id_token");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        // Debugging log to ensure the token has been cleared
        console.log(localStorage.getItem("id_token"));

        // Store the new id token in the local storage and decode
        const idToken = result.getIdToken().getJwtToken();
        const decodedToken = jwtDecode(idToken);

        // Log the decoded token to the console
        console.log(decodedToken);

        // Update the user context
        onContextUpdate(decodedToken);

        // Store remaining tokens in localStorage
        const accessToken = result.getAccessToken().getJwtToken();
        const refreshToken = result.getRefreshToken().getToken();

        localStorage.setItem("id_token", idToken);
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);

        resolve(decodedToken);
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
}

export const changePassword = (oldPassword, newPassword) => {
  return new Promise((resolve, reject) => {
    const cognitoUser = userPool.getCurrentUser();
    if (!cognitoUser) {
      return reject("User not found");
    }

    cognitoUser.getSession((err, session) => {
      if (err || !session.isValid()) {
        return reject("User is not authenticated");
      }

      cognitoUser.changePassword(oldPassword, newPassword, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  });
};

export const updateUserAddress = async (
  cognitoId,
  newAddress,
  newLatitude,
  newLongitude
) => {
  try {
    // Step 1: Update AWS Cognito User Attributes
    await updateCognitoUserAttributes(
      cognitoId,
      newAddress,
      newLatitude,
      newLongitude
    );

    // Step 2: Update MongoDB Record
    const response = await fetch(
      `http://localhost:3000/api/users/cognito/update/${cognitoId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: newAddress,
          latitude: newLatitude,
          longitude: newLongitude,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update user address in MongoDB");
    }

    const updatedUserData = await response.json();
    return updatedUserData;
  } catch (error) {
    console.error("Error updating user address:", error);
    throw error;
  }
};

const updateCognitoUserAttributes = async (
  cognitoId,
  newAddress,
  newLatitude,
  newLongitude
) => {
  const cognitoUser = userPool.getCurrentUser();

  if (!cognitoUser) {
    throw new Error("User not found");
  }

  // Ensure the user is authenticated before updating attributes
  return new Promise((resolve, reject) => {
    cognitoUser.getSession((err, session) => {
      if (err || !session.isValid()) {
        reject(new Error("User session is not valid"));
        return;
      }

      // Prepare new attribute values
      const attributes = [
        { Name: "address", Value: newAddress },
        { Name: "custom:latitude", Value: newLatitude },
        { Name: "custom:longitude", Value: newLongitude },
      ];

      // Update the user's attributes in Cognito
      cognitoUser.updateAttributes(attributes, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  });
};

export function forgotPassword(username) {
  // Forgot password implementation
}

// Function to sign out a user
export const signOut = () => {
  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser) {
    cognitoUser.signOut();
    localStorage.removeItem("id_token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    console.log("Sign out successful.");
  }
};

export function getCurrentUser() {
  // Get current user implementation
}

export function getSession() {
  // Get session implementation
}
