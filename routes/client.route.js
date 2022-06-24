const express = require("express");
const routes = express.Router();
const {
  createClient,
  getlistOfClient,
  getClientById,
} = require("../controllers/client.controller");

const {
  verifyToken,
  isAdminOrProcurement,
  isAdminOrProcurementOrInspectore,
} = require("../middleware/auth");
//create client
routes.post("/createClient", verifyToken, isAdminOrProcurement, createClient);

// //get all client
routes.get("/getAllClient", verifyToken, isAdminOrProcurement, getlistOfClient);

//get client by id
routes.get(
  "/getClientById",
  verifyToken,
  isAdminOrProcurementOrInspectore,
  getClientById
);

module.exports = routes;
