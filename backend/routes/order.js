const express = require("express");
const {
  addNewOrder,
  getAllOrders,
  deleteOrder,
  updateOrder
} = require("../controllers/order");
const authentication = require("../middlewares/authentication");
const orderRouter = express.Router();

orderRouter.post("/", authentication, addNewOrder);
orderRouter.get("/", getAllOrders);
orderRouter.put("/:id",authentication , updateOrder);
orderRouter.delete("/:id", deleteOrder);

module.exports = orderRouter;
console.log('test');

//a
