const express = require("express");
const routes = express.Router();
//import auth middileware
// const { verificationAuth } = require("../middilewares/auth");

//import user controller
const {
  signUpuser,
  loginUser,
  getListOfUser,
  Signout,
  getUserById,
} = require("../controllers/user.controller");

//import auth middleware
const verifyToken = require("../middleware/auth");
//add user api
routes.post("/sign-up", verifyToken, signUpuser);

//login user api
routes.get("/login", loginUser);

//get list of all user
routes.get("/getAllUser", verifyToken, getListOfUser);

//signout user
routes.get("/signout", verifyToken, Signout);

//get user by id
routes.get("/getUserById/", getUserById);

module.exports = routes;
