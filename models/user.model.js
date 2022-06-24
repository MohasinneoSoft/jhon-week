//destructure schema from mongoose
const { Schema, model } = require("mongoose");

//create role
const role_enum = {
  ADMIN: "admin",
  PROCUREMENTMANAGER: "procurement manager",
  INSPECTIONMANAGAER: "inspection manager",
  CLIENT: "client",
};

//create user schema
const userSchema = new Schema(
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

    password: {
      type: String,
    },

    mobile_number: {
      type: Number,
      unique: true,
      required: true,
      
    },

    role: {
      type: String,
      enum: role_enum,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

//convert to model
const userModel = model("users", userSchema);

//export model
module.exports = userModel;
