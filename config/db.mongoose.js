//require mongoose
const mongoose = require("mongoose");

//dotenv config
require("dotenv").config();

//mongoose conection
mongoose
  .connect(process.env.db)
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("error", err);
  });

//export mongoose
module.exports = mongoose.connection;
