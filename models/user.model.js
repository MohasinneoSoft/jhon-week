//destructure schema from mongoose
const { Schema, model } = require("mongoose");

//create role
const role_enum = {
  ADMIN: "admin",
  PROCURMENTMANAGER: "procurment manager",
  INSPECTIONMANAGAER: "inspection manager",
};

//create user schema
const userSchema = new Schema(
  {
    First_name: {
      type: String,
      required: true,
    },

    Last_name: {
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
      required: true,
    },

    mobileNumber: [Number],

    Role: {
      type: String,
      enum: role_enum,
    },
  },
  { timestamps: true }
);

//convert to model
const userModel = model("users", userSchema);

//export model
module.exports = userModel;
