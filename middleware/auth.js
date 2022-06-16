const jwt = require("jsonwebtoken");

const config = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  console.log("req", req.headers.authorization);

  const token = req.headers.authorization.split(" ")[1];
  console.log("token", token);

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    console.log("hii");
    const decoded = jwt.verify(token, config);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
