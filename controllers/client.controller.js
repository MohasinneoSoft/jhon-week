const userModel = require("../models/user.model");

//create a client

const createClient = async (req, res) => {
  const { first_name, last_name, email, mobile_number, address } = req.body;

  //Validation
  if (!first_name || !last_name || !email || !mobile_number || !address) {
    res.status(400).send("Please include all fields.");
  }

  const clientExists = await userModel.findOne( {email,mobile_number});

  if (clientExists) {
    res.status(400).send("Email or mobile_number already exists");
  } else {
    //save client in db
    const client = new userModel({
      first_name,
      last_name,
      email,
      mobile_number,
      address,
      role: "client",
    });
    client.save((err, data) => {
      if (err) {
        return res.status(400).json({
          message: "not able to save user",
          err: err,
        });
      } else {
        return res.status(200).json({ msg: "client created", data });
      }
    });
  }
};

//get all client  list with paggination
const getlistOfClient = async (req, res) => {
  let page = req.query.pageNo - 1;
  let limit = req.query.limit;
  let skip = page * limit;
  const user = await userModel
    .find({ role: "client" })
    .limit(limit)
    .skip(skip)
    .then((data) => {
      return res.status(200).json({
        total: data.length,
        msg: "successfully got all client",
        data,
      });
    })
    .catch((err) => {
      return res.status(400).json({ error: err, msg: "failed to get client" });
    });
  console.log(user, "client");
};

//get client by id
const getClientById = async (req, res) => {
  const clientId = req.query.id;

  let client = await userModel.findById(clientId);

  if (client) {
    res.status(200).json({ msg: "got client details succesfully", client });
  } else {
    res.status(404).json({ msg: "unable to get client details" });
  }
};
module.exports = { createClient, getClientById, getlistOfClient };
