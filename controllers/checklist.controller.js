const checklistModel = require("../models/checklist.model");

const createChecklist = async (req, res) => {
  const { order_id, vehical_type, client_requirment, vehical_details } =
    req.body;

  //Validation
  if (!order_id || !vehical_type || !client_requirment || !vehical_details) {
    res.status(400).send("Please include all fields.");
  } else {
    //save order in db
    const order = new checklistModel({
      order_id,
      vehical_type,
      client_requirment,
      vehical_details,
    });
    order.save((err, data) => {
      if (err) {
        return res.status(400).json({
          message: "not able to save checklist",
          err: err,
        });
      } else {
        return res.status(200).json({ msg: "checklist created", data });
      }
    });
  }
};

//delete checklist by id
const deleteChecklist = async (req, res) => {
  const checklistId = req.params.id;

  const order = await checklistModel
    .findOneAndDelete({ _id: checklistId })
    .then((data) => {
      return res.status(200).json({ msg: "checklist deleted", data });
    })
    .catch((err) => {
      return res.status(400).json({ msg: "unable to delete checklist", err });
    });
};

//update order by id
const updateChecklist = (req, res) => {
  let checklistId = req.params.id;

  let dataToUpdate = req.body;

  //1 where , 2 set : what to update
  checklistModel.findOneAndUpdate(
    { _id: checklistId },
    dataToUpdate,
    (err, data) => {
      if (err) {
        return res
          .status(400)
          .json({
            error,
            msg: "Your request could not be processed. Please try again.",
          });
      } else {
        return res
          .status(200)
          .json({ msg: "checklist has been updated successfully!", data });
      }
    }
  );
};

module.exports = { createChecklist, updateChecklist, deleteChecklist };
