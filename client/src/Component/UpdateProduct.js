import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { tokenId } from "../App";

const UpdateProduct = () => {
  const [token] = useContext(tokenId);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    GetProductDetails();
  }, []);

  const GetProductDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/product/${id}`);
      console.log("response", response);
      // Check if data exists and set the product details in state
      if (response.data) {
        setName(response.data.name);
        setPrice(response.data.price);
        setCategory(response.data.category);
        setCompany(response.data.company);
      } else {
        console.log("Product not found");
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const HandleUpdateProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return;
    }

    try {
      await axios.post(`http://localhost:5000/updateProduct/${id}`, {
        name,
        price,
        category,
        company,
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  if (!token) {
    navigate("/login");
  }

  return (
    <div className="product">
      <h1>Update Product</h1>
      <input
        type="text"
        placeholder="Product Name"
        className="inputBox"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {error && !name && (
        <span className="invalid-input">Enter a valid Name</span>
      )}

      <input
        type="text"
        placeholder="Product Price"
        className="inputBox"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      {error && !price && (
        <span className="invalid-input">Enter a valid Price</span>
      )}

      <input
        type="text"
        placeholder="Product Category"
        className="inputBox"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      {error && !category && (
        <span className="invalid-input">Enter a valid Category</span>
      )}

      <input
        type="text"
        placeholder="Product Company"
        className="inputBox"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      {error && !company && (
        <span className="invalid-input">Enter a valid Company</span>
      )}

      <button className="appButton" onClick={HandleUpdateProduct}>
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
