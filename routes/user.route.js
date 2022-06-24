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
const {
  verifyToken,
  isAdmin,
  isAdminOrProcurement,
} = require("../middleware/auth");
//add user api
routes.post("/sign-up", verifyToken, isAdminOrProcurement, signUpuser);

//login user api
routes.get("/login", loginUser);

//get list of all user
routes.get("/getAllUser", verifyToken, isAdmin, getListOfUser);

//signout user
routes.get("/signout", verifyToken, Signout);

//get user by id
routes.get("/getUserById/", verifyToken, isAdminOrProcurement, getUserById);

module.exports = routes;
