const { clientModel } = require("../models/client.model");

//create a client

const createClient = async (req, res) => {
  const { First_name, Last_name, email, mobileNumber, address } = req.body;

  //Validation
  if (!First_name || !Last_name || !email || !mobileNumber || !address) {
    res.status(400).send("Please include all fields.");}

    const clientExists = await clientModel.findOne({ email });

    const numberExists = await clientModel.findOne({ mobileNumber });

    if (clientExists) {
      res.status(400).send("Email already exists");
    } else if (numberExists) {
      res.status(400).send("Number already exists");
    } else {
      //save client in db
      const client = new clientModel({
        First_name,
        Last_name,
        email,
        mobileNumber,
        address,
      });
      client.save((err, data) => {
        if (err) {
          return res.status(400).json({
            message: "not able to save user",
            err: err,
          });
        } else {
          return res.status(200).json({ msg: "client created", data: data });
        }
      });
    }
};

//get all client  list with paggination
const getlistOfClient = (req, res) => {
  let page = req.query.pageNo - 1;
  let limit = req.query.limit;
  let skip = page * limit;
  clientModel
    .find()
    .limit(limit)
    .skip(skip)
    .then((data) => {
      return res.status(200).json({
        total: data.length,
        msg: "successfully got all client",
        result: data,
      });
    })
    .catch((err) => {
      return res.status(400).json({ error: err, msg: "failed to get client" });
    });
};

//get client by id
const getClientById = (req, res) => {
  let id = req.query.id;
  clientModel
    .findById(id)
    .then((data) => {
      return res.status(200).json({
        total: data.length,
        msg: "successfully got client",
        result: data,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
        msg: "failed to get client",
      });
    });
};

module.exports = {createClient , getClientById , getlistOfClient}
