//destructure schema from mongoose
const { Schema, model } = require("mongoose");

//create order schema
const checklistSchema = new Schema(
  {
    order_id: {
      type: Schema.Types.ObjectId,
      ref: "orders",
    },
    vehical_type: {
      type: String,
    },
    vehical_image: {
      type: String,
    },
    client_requirment: {
      type: String,
      required: true,
    },
    vehical_details: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["checklist created", "inspected", "approved"],
      default: "checklist created",
    },
  },
  { timestamps: true }
);

//convert to model
const checklistModel = model("checklist", checklistSchema);

//export model
module.exports = checklistModel;
