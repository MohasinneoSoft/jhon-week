const express = require("express");
const routes = express.Router();
const {createClient,getlistOfClient,getClientById} = require("../controllers/client.controller");


//create client 
routes.post('/createClient' , createClient)

//get all client 
routes.get('/getAllClient' , getlistOfClient)

//get client by id 
routes.get('/getClientById' , getClientById)




module.exports = routes;