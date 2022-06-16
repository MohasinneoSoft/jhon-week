const { Schema, model } = require("mongoose");

const clientSchema = new Schema(
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
    address : {
        type : String,
        required : true
    },

    mobileNumber: [Number],

  },
  { timestamps: true }
);

const clientModel = model("clients", clientSchema);

module.exports = { clientModel};
