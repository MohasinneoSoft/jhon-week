const express = require("express");
const routes = express.Router();
const {createOrder,getOrderById,getAllOrder} = require('../controllers/order.controller')

routes.post('/createOrder' , createOrder)
routes.get('/getOrderById' , getOrderById)
routes.get('/getAllOrder' , getAllOrder)


module.exports = routes
