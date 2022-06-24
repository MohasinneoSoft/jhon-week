const orderModel = require("../models/order.model");

//creat order
const createOrder = async (req, res) => {
  const { clientId, order_type, from, to } = req.body;

  //Validation
  if (!clientId || !order_type || !from || !to) {
    res.status(400).send("Please include all fields.");
  } else {
    //save order in db
    const order = new orderModel({
      clientId,
      order_type,
      from,
      to,
    });
    order.save((err, data) => {
      if (err) {
        return res.status(400).json({
          message: "not able to save order",
          err: err,
        });
      } else {
        return res.status(200).json({ msg: "order created", data });
      }
    });
  }
};

//get order by id
const getOrderById = async (req, res) => {
  const orderId = req.params.id;

  let order = await orderModel.findOne({ id: orderId });

  if (order) {
    res.status(200).json({ msg: "got order details succesfully", data: order });
  } else {
    res.status(404).json({ msg: "unable to get order details" });
  }
};

//get all order of one client
const getAllOrder = async (req, res) => {
  const clientId = req.query.id;

  let orders = await orderModel.find({ clientId });

  if (orders) {
    res
      .status(200)
      .json({ msg: "got order details succesfully", data: orders });
  } else {
    res.status(404).json({ msg: "unable to get order details" });
  }
};

//delete order by id
const deleteOrder = async (req, res) => {
  const orderId = req.params.id;

  const order = await orderModel
    .findOneAndDelete({ _id: orderId })
    .then((data) => {
      return res.status(200).json({ msg: "order deleted", data });
    })
    .catch((err) => {
      return res.status(400).json({ msg: "unable to delete order", err });
    });
};

//update order by id 
const updateOrder = (req , res )=>{
  let orderId = req.params.id
  console.log(orderId);
  let dataToUpdate = req.body
  console.log(dataToUpdate);
  //1 where , 2 set : what to update
      orderModel.findOneAndUpdate(  { _id : orderId } , dataToUpdate , (err , data)=>{
          if(err)
      {
          return res.status(400).json({error : err , msg : "Your request could not be processed. Please try again."})
      }else{
              return res.status(200).json({ msg : "order has been updated successfully!",data})
        
         
      }
  })
} 



module.exports = {
  getOrderById,
  createOrder,
  getAllOrder,
  updateOrder,
  deleteOrder,
};
