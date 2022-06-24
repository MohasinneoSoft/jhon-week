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
const {
  verifyToken,
  isAdmin,
  isAdminOrProcurement,
  isAdminOrProcurementOrInspectore,
} = require("../middleware/auth");

//create order
routes.post("/createOrder", verifyToken, isAdminOrProcurement, createOrder);

//get order by id
routes.get("/getOrderById", getOrderById);

//get all order of client
routes.get("/getAllOrder", getAllOrder);

//update order
routes.patch(
  "/updateOrder/:id",
  verifyToken,
  isAdminOrProcurementOrInspectore,
  updateOrder
);

//delet order
routes.delete("/deleteOrder/:id", verifyToken, isAdminOrProcurement, deleteOrder);

module.exports = routes;
