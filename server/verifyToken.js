const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    let token = req.header("x-token");
    if (!token) {
      return res.status(400).send("authentication error");
    }
    let decode = jwt.verify(token, "jwtsecure");
    req.user = decode.user;
    next();
  } catch (e) {
    return res.status(500).send("Invalid token");
  }
};
