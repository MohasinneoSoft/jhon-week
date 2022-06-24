//destructure schema from mongoose
const { Schema, model } = require("mongoose");

//create client schema
const clientSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },

    last_name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },

    mobileNumber: [Number],
  },
  { timestamps: true }
);

//convert to model
const clientModel = model("clients", clientSchema);

//export model
module.exports = { clientModel };
