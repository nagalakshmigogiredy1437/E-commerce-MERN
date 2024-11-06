import React, { useContext } from "react";
import { tokenId } from "../App";
import { Link } from "react-router-dom";

const Nav = () => {
  const [token, setToken] = useContext(tokenId);
  console.log("token", token);

  return (
    <div>
      <img
        alt="logo"
        className="logo"
        src="https://cdn.shopify.com/s/files/1/0558/6413/1764/files/Code_Logo_Design_18_1024x1024.jpg?v=1683102335"
      ></img>

      {token ? (
        <>
          <ul className="nav-ul">
            <li>
              <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="/addProduct">Add Product</Link>
            </li>
            {/* <li>
              <Link to="/updateProduct">Update Product</Link>
            </li> */}
            <li>
              <Link to={`profile/${token.exist._id}`}>Profile</Link>
            </li>
            <li>
              <Link to="/logout" onClick={() => setToken(null)}>
                Logout ({token.exist.Name})
              </Link>
            </li>
          </ul>
        </>
      ) : (
        <>
          <ul className="nav-ul nav-right">
            <li>
              <Link to="/signUp">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default Nav;
