const { pool } = require("../models/db");

const createAMatch = (req, res) => {
  const { title, descriptions, place, dates, timeduration, ticketPrice } =
    req.body;

  const query =
    "INSERT INTO matches(title, descriptions, place, dates, timeduration, ticketPrice) VALUES($1, $2, $3, $4, $5, $6)";

  const data = [title, descriptions, place, dates, timeduration, ticketPrice];

  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "The match has been created successfully",
        result: result,
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

const getAllMatches = (req, res) => {
  const query = "SELECT * FROM matches";

  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All the Matches",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};

module.exports = { createAMatch, getAllMatches };
