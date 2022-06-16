const express = require ('express');

const app = express();

//import config file
const db = require('./config/db.mongoose')

app.use(express.json());

//import user routes
const userRoutes = require('./routes/user.route')
const clientRoutes = require('./routes/client.route')
const orderRoutes = require('./routes/order.route')

  




app.use('/user' , userRoutes)
app.use('/client',clientRoutes)
app.use('/order' , orderRoutes)



//server connection
const PORT = process.env.PORT || 8080;

app.listen(PORT , ()=>{
    console.log(`Server is Up on Port ${PORT}`);
})