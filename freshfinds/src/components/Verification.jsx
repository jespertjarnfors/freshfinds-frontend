import { useState, useContext } from "react";
import { CognitoUser } from 'amazon-cognito-identity-js';
import UserPool from './AWS/UserPool';
import { UserContext } from '../contexts/UserContext';

const Verification = () => {
  const { user } = useContext(UserContext);
  const [verificationCode, setVerificationCode] = useState("");

  const handleInputChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleConfirmClick = () => {
    const cognitoUser = new CognitoUser({ Username: user.username, Pool: UserPool });

    cognitoUser.confirmRegistration(verificationCode, true, function(err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      console.log('call result: ' + result);
    });
  };

  return (
    <div className="shadow-md w-64 m-auto p-4 flex flex-col space-y-2">
      <label htmlFor="username">Username:</label>
      <p>{user.username}</p>
      <label htmlFor="verificationCode">Verification Code:</label>
      <input
        className="bg-slate-100"
        type="text"
        id="verificationCode"
        value={verificationCode}
        onChange={handleInputChange}
      />
      <button className="bg-indigo-500 text-white" onClick={handleConfirmClick}>Confirm</button>
    </div>
  );
};

export default Verification;