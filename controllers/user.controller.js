const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

//Sign Up user
const signUpuser = async (req, res) => {
  const { First_name, Last_name, email, password, mobileNumber, Role } =
    req.body;

  //Validation
  if (
    !First_name ||
    !Last_name ||
    !email ||
    !password ||
    !mobileNumber ||
    !Role
  ) {
    res.status(400).send("Please include all fields.");
  }

  //Find the user already exists
  const userExists = await userModel.findOne({ email });

  const numberExists = await userModel.findOne({ mobileNumber });

  if (userExists) {
    res.status(400).send("Email already exists");
  } else if (numberExists) {
    res.status(400).send("Number already exists");
  } else {
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //save user in db
    const user = new userModel({
      First_name,
      Last_name,
      email,
      password: hashedPassword,
      mobileNumber,
      Role,
      token: "",
    });
    user.save((err, user) => {
      if (err) {
        return res.status(400).json({
          message: "not able to save user",
          rr: err,
        });
      } else {
        return res.status(200).json({
          data: user,
        });
      }
    });
  }
};

//login api of user with jwt
const loginUser = async (req, res) => {
  const { mobileNumber, email, password } = req.body;

  const numberExists = await userModel.findOne({ mobileNumber });
  const user = await userModel.findOne({ email });

  const ComparePass = await bcrypt.compare(password, user.password);

  // check user & password match
  if (numberExists || (user && ComparePass)) {
    const token = generateToken({ _id: user._id });

    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });
    res.status(200).json({
      _id: user._id,
      name: `${user.First_name} ${user.Last_name}`,
      email: user.email,
      Role: user.Role,
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
