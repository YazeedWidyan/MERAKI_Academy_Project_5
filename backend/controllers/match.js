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

const getMatchById = (req, res) => {
 
  const id = req.params.id;

  const data = [id];
  const query = "SELECT * FROM matches WHERE id = $1";

  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Get match the with id",
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

const updateAMatchById = (req, res) => {
  const id = req.params.id;
  const { teamNumber, postionNumber } = req.body;

  const data = [id];

  const query = `UPDATE matches SET team${teamNumber}postion${postionNumber} = 1 WHERE id = $1`;

  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "updated the match",
        result: result,
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
const deleteAMatchById = (req, res) => {
  const id = req.params.id;
  const data = [id];
  const query = "DELETE FROM matches WHERE id = $1 ";

  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "the match is deleted",
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

module.exports = {
  createAMatch,
  getAllMatches,
  updateAMatchById,
  deleteAMatchById,
  getMatchById,
};
