import React, { useState } from "react"; // Corrected capitalization for React
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [password, setPass] = useState("");

  const handleSubmit = () => {
    console.warn(Name, Email, password);
    axios
      .post("http://localhost:5001/signUp", { Name, Email, password }) // Corrected URL
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => {
        console.error(err); // Changed to console.error for errors
      });
  };

  return (
    <div className="register">
      <h2>Register</h2>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Name"
        value={Name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Email"
        value={Email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="inputBox"
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPass(e.target.value)}
      />
      <button onClick={handleSubmit} className="appButton" type="button">
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
