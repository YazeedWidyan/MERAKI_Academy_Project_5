const express = require("express");
const {
  getCountUsers,
  getCountProducts,
  getCountOrders,
} = require("../controllers/webstatus");

const webstatusRouter = express.Router();

console.log("aa");
webstatusRouter.get("/users", getCountUsers);
webstatusRouter.get("/products", getCountProducts);
webstatusRouter.get("/orders", getCountOrders);
webstatusRouter.get("/");

module.exports = webstatusRouter;
//a
