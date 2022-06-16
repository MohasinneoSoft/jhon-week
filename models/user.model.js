const { Schema, model } = require("mongoose");

//role
const role_enum = {
  ADMIN: "admin",
  PROCURMENTMANAGER: "procurment manager",
  INSPECTIONMANAGAER: "inspection manager",
};

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

const userModel = model("users", userSchema);

module.exports = userModel;
