//require jwt
const jwt = require("jsonwebtoken");

//jwt secret enviorment verible
const config = process.env.JWT_SECRET;

//create auth middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

//export middleware
module.exports = verifyToken;
