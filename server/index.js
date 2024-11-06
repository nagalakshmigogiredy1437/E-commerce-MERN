const express = require("express");
const con = require("./db/Config");
const cors = require("cors");
const users = require("./db/User");
const jwt = require("jsonwebtoken");
const Product = require("./db/Product");
const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.post("/signUp", async (req, res) => {
  let user = new users(req.body);
  let data = await user.save();
  res.send(data);
});

app.get("/signIn", async (req, res) => {
  let user = new users(req.body);
  let data = await user.save();
  res.send(data);
});

app.post("/signIn", async (req, res) => {
  try {
    console.log("data", req.body);
    const exist = await users.findOne({ email: req.body.email });
    if (!exist) {
      return res.status(400).send("user not exist");
    }
    if (exist.password !== req.body.password) {
      return res.status(400).send("password is not matching");
    }
    let payload = {
      user: {
        id: exist.id,
      },
    };

    // Sign the JWT token
    jwt.sign(payload, "jwtsecure", { expiresIn: 3600000 }, (err, token) => {
      if (err) {
        return res.status(400).send({ err });
      }
      return res.status(200).send({ exist });
    });
  } catch (e) {
    return res.status(500).send("server error");
  }
});

app.post("/addProduct", async (req, res) => {
  let product = new Product(req.body);
  let data = await product.save();
  res.send(data);
});

app.get("/products", async (req, res) => {
  let products = await Product.find();
  if (products.length >= 0) {
    res.send(products);
  } else {
    res.send({ result: "No data Found" });
  }
});

app.delete("/deletedProduct/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const deletedProduct = await Product.deleteOne({ _id: req.params.id });
    console.log("deletedProduct", deletedProduct);
    if (deletedProduct.deletedCount === 0) {
      return res.status(404).send("Product not found");
    }
    res.send(deletedProduct);
  } catch (error) {
    res.status(500).send("Error deleting the product");
  }
});

app.post("/updateProduct/:id", async (req, res) => {
  console.log(req.body);
  const { name, price, category, company } = req.body;
  const updatedProduct = await Product.updateOne(
    { _id: req.params.id },
    { $set: { name, price, category, company } }
  );
  if (updatedProduct.deletedCount === 0) {
    return res.status(404).send("Product not found");
  }
  res.send(updatedProduct);
});

app.get("/product/:id", async (req, res) => {
  const productid = await Product.findById(req.params.id);
  console.log("product id", productid);
  if (!productid) {
    return res.status(404).send("Product not found");
  }
  res.send(productid);
});

app.get("/search/:key", async (req, res) => {
  console.log(req.params);
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { price: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  console.log(result);
  res.send(result);
});

app.get("/profile/:id", async (req, res) => {
  console.log(req.params);
  const profileData = await users.findById(req.params.id);
  res.send(profileData);
});

app.listen(5000, () => {
  console.log("app listening on the server 5000");
});
