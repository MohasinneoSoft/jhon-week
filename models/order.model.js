//destructure schema from mongoose
const { Schema, model } = require("mongoose");

//create order schema
const orderSchema = new Schema(
  {
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "clients",
    },

    order_type: {
      type: String,
      required: true,
    },

    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    vehical_details: {
      type: String,
    },

    status: {
      type: String,
      enum: [
        "order created",
        "inspected",
        "approved",
        "load",
        "shipped",
        "unload",
        "deliverd",
      ],
      default: "order created",
    },
  },
  { timestamps: true }
);

//convert to model
const orderModel = model("order", orderSchema);

//export model
module.exports = orderModel;
