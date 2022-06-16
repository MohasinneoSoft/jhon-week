const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.db)
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("error", err);
  });

module.exports = mongoose.connection;
