const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

//Sign Up user
const signUpuser = async (req, res) => {
  const { first_name, last_name, email, password, mobile_number, role } =
    req.body;
    console.log("hi")

  //Validation
  if (
    !first_name ||
    !last_name ||
    !email ||
    !password ||
    !mobile_number ||
    !role
  ) {
    res.status(400).send("Please include all fields.");
  }else{

  //Find the user already exists
  const userExists = await userModel.findOne({ email , mobile_number  });

  if (userExists) {
    res.status(400).send("Email already exists");
  } else {
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //save user in db
    const user = new userModel({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      mobile_number,
      role,
      token: "",
    });
    user.save((err, user) => {
      if (err) {
        return res.status(400).json({
          message: "not able to save user",
         err
        });
      } else {
        return res.status(200).json({
          user
        });
      }
    });
  }}
};

//login api of user with jwt
const loginUser = async (req, res) => {
  const { mobile_number, email, password } = req.body;
  
  const userEmail = await userModel.findOne({ email});

  const userMobile = await userModel.findOne({mobile_number});

  
  const user = userEmail || userMobile

  console.log(user);

  const ComparePass = await bcrypt.compare(password, user.password);

  // check user & password match
  if (user && ComparePass) {

    console.log({ _id: user._id , role : user.role  });
    const token = generateToken({ _id: user._id , role : user.role  });

    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });
    res.status(200).json({
      _id: user._id,
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      role: user.role,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    res.status(401).send("Invalid Credentials");
  }
};

//singout user
const Signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "user signout succesfully",
  });
};

//get all user  list with paggination
const getListOfUser = (req, res) => {
  let page = req.query.pageNo - 1;
  let limit = req.query.limit;
  let skip = page * limit;
  userModel
    .find()
    .limit(limit)
    .skip(skip)
    .then((data) => {
      return res.status(200).json({
        total: data.length,
        msg: "successfully got all user",
        result: data,
      });
    })
    .catch((err) => {
      return res.status(400).json({ error: err, msg: "failed to get user" });
    });
};

//get user by id
const getUserById = (req, res) => {
  let id = req.query.id;
  userModel
    .findById(id)
    .then((data) => {
      return res.status(200).json({
        total: data.length,
        msg: "successfully got user",
        result: data,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
        msg: "failed to get user",
      });
    });
};

// Generate token
const generateToken = (_id) => {
  return jwt.sign(_id, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = {
  signUpuser,
  loginUser,
  getListOfUser,
  Signout,
  getUserById,
};
