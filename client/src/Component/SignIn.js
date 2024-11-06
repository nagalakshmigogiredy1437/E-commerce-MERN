import react, { useState, useContext } from "react";
import axios from "axios";
import { tokenId } from "../App";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [token, setToken] = useContext(tokenId);
  const [Email, setEmail] = useState("");
  const [password, setPass] = useState("");

  const handleSubmit = () => {
    console.warn(Email, password);
    axios
      .post("http://localhost:5000/signIn", { Email, password }) // Corrected URL
      .then((res) => {
        console.log(res.data.token);
        console.log(res.data);
        setToken(res.data);
        return navigate("/");
      })
      .catch((err) => {
        alert("please enter correct details"); // Changed to console.error for errors
      });
  };
  return (
    <div className="register">
      <h2>Sign In</h2>
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
        Sign In
      </button>
    </div>
  );
};

export default SignIn;
