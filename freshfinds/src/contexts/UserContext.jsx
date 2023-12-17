import { createContext, useState } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import UserPool from '../UserPool';

// Create a context
export const UserContext = createContext();

// UserContext component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");

  const signIn = async (username, password) => {
    try {
      const cognitoUser = await signInUser(username, password);
      const userData = await getUserAttributes(cognitoUser);
      setUser(userData);
    } catch (err) {
      console.error(err);
      // Handle sign-in errors here
    }
  };

  const signUp = (username) => {
    setUser({ username });
  };

  return (
    <UserContext.Provider value={{ user, signIn, signUp }}>
      {children}
    </UserContext.Provider>
  );
};

const signInUser = (username, password) => {
  return new Promise((resolve, reject) => {
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: UserPool,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session) => resolve(cognitoUser),
      onFailure: (err) => reject(err),
    });
  });
};

const getUserAttributes = (cognitoUser) => {
  return new Promise((resolve, reject) => {
    cognitoUser.getUserAttributes((err, attributes) => {
      if (err) {
        reject(err);
      } else {
        const userData = attributes.reduce((acc, attribute) => {
          acc[attribute.getName()] = attribute.getValue();
          return acc;
        }, {});
        resolve(userData);
      }
    });
  });
};