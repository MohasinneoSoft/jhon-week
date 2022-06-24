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
    order_image: {
      type: String,
    },

    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
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
