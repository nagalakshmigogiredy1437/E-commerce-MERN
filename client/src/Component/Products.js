import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { tokenId } from "../App";

const Products = () => {
  const [token] = useContext(tokenId);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/products");
      console.log(res.data);
      setProducts(res.data);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    console.log(id);
    try {
      await axios.delete(`http://localhost:5000/deletedProduct/${id}`);
      alert("Product Deleted");
      setProducts(products.filter((product) => product._id !== id)); // Remove the deleted product from the state
      //   navigate("/");
    } catch (error) {
      console.log("Error deleting product:", error);
    }
  };
  const SearchHandler = async (event) => {
    let key = event.target.value;
    if (key) {
      await axios
        .get(`http://localhost:5000/search/${key}`)
        .then((res) => {
          setProducts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getProducts();
    }
  };
  if (!token) {
    navigate("/login");
  }

  return (
    <div className="product-list">
      <h1>Products List</h1>
      <input
        type=""
        className="search-product-box"
        placeholder="search product name"
        onChange={SearchHandler}
      ></input>
      <ul>
        <li>S.No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Operation</li>
      </ul>
      {products.length > 0 ? (
        products.map((product, index) => (
          <ul key={product._id}>
            <li>{index + 1}</li>
            <li>{product.name}</li>
            <li>{product.price}</li>
            <li>{product.category}</li>
            <li>{product.company}</li>
            <li>
              <div className="button-container">
                <button
                  className="button-link"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  Delete
                </button>
                <Link
                  to={`updateProduct/${product._id}`}
                  className="button-link button-link-update"
                >
                  Update
                </Link>
              </div>
            </li>
          </ul>
        ))
      ) : (
        <h1>No Data Found</h1>
      )}
    </div>
  );
};

export default Products;
