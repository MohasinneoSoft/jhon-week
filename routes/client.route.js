const express = require("express");
const routes = express.Router();
const {
  createClient,
  getlistOfClient,
  getClientById,
} = require("../controllers/client.controller");

const verifyToken = require("../middleware/auth");
//create client
routes.post("/createClient", verifyToken, createClient);

//get all client
routes.get("/getAllClient", verifyToken, getlistOfClient);

//get client by id
routes.get("/getClientById", verifyToken, getClientById);

module.exports = routes;
