import React, { createContext, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Nav from "./Component/Nav";
import Footer from "./Component/Footer";
import SignUp from "./Component/SignUp";
import SignIn from "./Component/SignIn";
import "./App.css";
import Profile from "./Component/Profile";
import UpdateProduct from "./Component/UpdateProduct";
import AddProduct from "./Component/AddProduct";
import Products from "./Component/Products";

export const tokenId = createContext();

function App() {
  const [token, setToken] = useState(null);

  return (
    <div className="App">
      <tokenId.Provider value={[token, setToken]}>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/updateProduct/:id" element={<UpdateProduct />} />
            <Route path="/logout" element={<h1>Logout</h1>} />
            <Route path="/profile/:id" element={<Profile />} />

            <Route path="/login" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </tokenId.Provider>
      <Footer />
    </div>
  );
}

export default App;
