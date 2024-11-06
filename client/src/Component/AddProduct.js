import react, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { tokenId } from "../App";
import axios from "axios";

const AddProduct = () => {
  const [token] = useContext(tokenId);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [Error, setError] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const HandleAddProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }

    const userId = token.exist._id;
    await axios
      .post("http://localhost:5000/addProduct", {
        name,
        price,
        category,
        userId,
        company,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="product">
      <h1>Add Product</h1>
      <input
        type="text"
        placeholder="Product Name"
        className="inputBox"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      {Error && !name && (
        <span className="invalid-input">Enter a valid Name</span>
      )}
      <input
        type="text"
        placeholder="Product Price"
        className="inputBox"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      ></input>
      {Error && !price && (
        <span className="invalid-input">Enter a valid Price</span>
      )}
      <input
        type="text"
        placeholder="Product Category"
        className="inputBox"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      ></input>
      {Error && !category && (
        <span className="invalid-input">enter a valid Category</span>
      )}
      <input
        type="text"
        placeholder="Product Company"
        className="inputBox"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      ></input>
      {Error && !company && (
        <span className="invalid-input">Enter a valid Company </span>
      )}
      <button className="appButton" onClick={HandleAddProduct}>
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
