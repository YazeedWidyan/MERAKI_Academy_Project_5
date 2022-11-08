const { pool } = require("../models/db");
const getCountUsers = (req, res) => {
  const query = "SELECT COUNT(*) FROM users";

  pool
    .query(query)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "All users count",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: "something went wrong",
        err: err.message,
      });
    });
};

const getCountOrders = (req, res) => {
  const query = "SELECT COUNT(*) FROM orders";

  pool
    .query(query)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "All orders count",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: "something went wrong",
        err: err.message,
      });
    });
};

const getCountProducts = (req, res) => {
  const query = "SELECT COUNT(*) FROM products";

  pool
    .query(query)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "All products count",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: "something went wrong",
        err: err.message,
      });
    });
};

module.exports = { getCountUsers, getCountProducts, getCountOrders };
