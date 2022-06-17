//import express
const express = require ('express');

//dot env config
require("dotenv").config();

const app = express();

//import config file
const db = require('./config/db.mongoose')

//json middleware
app.use(express.json());

//import user routes
const userRoutes = require('./routes/user.route')

//import client routes
const clientRoutes = require('./routes/client.route')

//import order routes
const orderRoutes = require('./routes/order.route')

  
//user apis
app.use('/user' , userRoutes)

//client apis
app.use('/client',clientRoutes)

//order apis
app.use('/order' , orderRoutes)




//server port
const PORT = process.env.PORT || 8080;

////server connection
app.listen(PORT , ()=>{
    console.log(`Server is Up on Port ${PORT}`);
})