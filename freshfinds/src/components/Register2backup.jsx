import { useState } from "react";
import UserPool from "./AWS/UserPool";
import { useUser } from '../hooks/useUser';
import "../index.css";

const Register = () => {
  const { signUp } = useUser();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    UserPool.signUp(username, password, [
      { Name: 'email', Value: email },
      { Name: 'given_name', Value: givenName },
      { Name: 'family_name', Value: familyName },
      { Name: 'address', Value: address },
    ], null, (err, data) => {
      if (err) console.error(err);
      console.log(data);
      if (data) {
        signUp(username);
      }
    });
  };

  return (
    <div className="shadow-md w-64 m-auto p-4">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <label htmlFor="email">Email</label>
        <input
          className="bg-slate-100"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label htmlFor="username">Username</label>
        <input
          className="bg-slate-100"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <label htmlFor="givenName">First Name</label>
        <input
          className="bg-slate-100"
          value={givenName}
          onChange={(e) => setGivenName(e.target.value)}
        ></input>
        <label htmlFor="familyName">Surname</label>
        <input
          className="bg-slate-100"
          value={familyName}
          onChange={(e) => setFamilyName(e.target.value)}
        ></input>
        <label htmlFor="address">Address</label>
        <input
          className="bg-slate-100"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></input>
        <label htmlFor="password">Password</label>
        <input
          className="bg-slate-100"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button className="bg-indigo-500 text-white" type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;