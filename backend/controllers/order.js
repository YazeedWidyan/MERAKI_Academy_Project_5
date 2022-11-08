const { pool } = require("../models/db");

const addNewOrder = (req, res) => {
  const { order_date, ship_date, street, city, country } = req.body;
  const userId = req.token.userId;
  const data = [userId, order_date, ship_date, street, city, country];
  const query =
    "INSERT INTO orders(user_id, order_date, ship_date, street, city, country) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;";
  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Success order created",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};

const getAllOrders = (req, res) => {
  const id = req.token.userId;
  const data = [id];
  const query =
    "SELECT * FROM orders INNER JOIN users WHERE orders.user_id = $1";
  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "All orders",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err,
      });
    });
};
const deleteOrder = (req, res) => {
  const id = req.params.id;
  const data = [id];
  const query = "DELETE FROM orders WHERE id = $1";
  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Order is deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err,
      });
    });
};
const updateOrder = (req, res) => {
  const id = req.params.id;
  const { order_date, ship_date, street, city, country } = req.body;
  const data = [order_date, ship_date, street, city, country, id];
  const query = `UPDATE orders SET order_date = $1, ship_date = $2, street = $3, city = $4, country = $5 WHERE id = $6 RETURNING *;`;
  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Order is updated",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err,
      });
    });
};

module.exports = {
  addNewOrder,
  getAllOrders,
  deleteOrder,
  updateOrder,
};
