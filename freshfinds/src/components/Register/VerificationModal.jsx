import { useState, useContext } from "react";
import { CognitoUser } from 'amazon-cognito-identity-js';
import UserPool from '../AWS/UserPool';
import { UserContext } from '../../contexts/UserContext';
import { useNavigate } from "react-router-dom";

const VerificationModal = () => {

  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const [verificationCode, setVerificationCode] = useState("");

  const handleInputChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleBackClick = () => {
    navigate('/register');
  }

  const handleConfirmClick = () => {
    const cognitoUser = new CognitoUser({ Username: user.username, Pool: UserPool });
  
    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(verificationCode, true, function(err, result) {
        if (err) {
          alert(err.message || JSON.stringify(err));
          reject(err);
        } else {
          alert('Successfully verified!');
          console.log('call result: ' + result);
          resolve(result);
        }
      });
    })
    .then(() => {
      navigate('/login');
    })
    .catch((err) => {
      console.error(err);
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="rounded-md w-1/3 p-8">
        <form className="flex flex-col space-y-4 p-8 rounded-2xl shadow-xl"
          onSubmit={(event) => event.preventDefault()}
        >
          <h3 className="text-gray-700 font-medium">A code has been sent to your email.</h3>
          <div className="flex flex-col space-y-2">
            <label htmlFor="verificationCode" className="text-gray-700 font-medium">Verification Code:</label>
            <input
              className="bg-white p-4 rounded-md text-lg"
              type="text"
              id="verificationCode"
              value={verificationCode}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex justify-center space-x-10 pt-4">
            <button className="btn-2" type="button" onClick={handleConfirmClick}>Confirm</button>
            <button className="btn px-10" type="button" onClick={handleBackClick}>Back</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerificationModal;