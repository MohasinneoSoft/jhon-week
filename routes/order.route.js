const express = require("express");
const routes = express.Router();
const {
  createOrder,
  getOrderById,
  getAllOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order.controller");

//auth middleware
const verifyToken = require("../middleware/auth");

//create order
routes.post("/createOrder", verifyToken, createOrder);

//get order by id
routes.get("/getOrderById", getOrderById);

//get all order of client
routes.get("/getAllOrder", getAllOrder);

//update order
routes.put("/updateOrder", verifyToken, updateOrder);

//delet order
routes.delete("/deleteOrder", verifyToken, deleteOrder);

module.exports = routes;
