const express = require("express");
const routes = express.Router();

//import checklist controller
const {
  createChecklist,
  updateChecklist,
  deleteChecklist
} = require("../controllers/checklist.controller");

//import auth middleware
const {
  verifyToken,
  isAdminOrProcurement,
  isAdminOrProcurementOrInspectore,
} = require("../middleware/auth");

//create checklist
routes.post("/createChecklist",verifyToken,isAdminOrProcurement,createChecklist);

//update checklist by id 
routes.patch("/updateChecklist/:id",verifyToken,isAdminOrProcurementOrInspectore,updateChecklist);

//delete checklist by id
routes.delete("/deleteChecklist/:id",verifyToken,isAdminOrProcurement,deleteChecklist)

module.exports = routes;
