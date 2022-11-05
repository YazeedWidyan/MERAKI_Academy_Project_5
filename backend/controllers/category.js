const { pool } = require("../models/db");
const getAllCatagories = (req, res) => {
  const query = `SELECT * FROM categories  WHERE is_deleted=0 ORDER BY 1;`;
  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        massage: "All the categories",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    });
};

const addCatagory = (req, res) => {
  const category = req.body.category;
  console.log(category);
  const values = [category];
  const query = `INSERT INTO categories (category) VALUES ($1)  RETURNING *;`;
  pool
    .query(query, values)
    .then((result) => {
      res.status(200).json({
        success: true,
        massage: "catagory created",
        result: result.rows[0],
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    });
};
const deleteCatagory = (req, res) => {
  const id = req.params.id;
  const query = `UPDATE categories SET is_deleted=1 WHERE id=$1;`;
  const values = [id];
  pool
    .query(query, values)
    .then((result) => {
      if (result.rowCount === 0) {
        res.status(404).json({
          success: false,
          massage: `The catagory: ${id} is not found`,
          err: err,
        });
      } else {
        res.status(200).json({
          success: true,
          massage: `Succeeded to delete catagory with id: ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    });
};
const updateCatagory = (req, res) => {
  const id = req.params.id;
  const category = req.body.category;
  const values = [category || null, id];
  const query = `UPDATE products SET category = COALESCE($1,category) WHERE id=$2 AND is_deleted = 0  RETURNING *;`;

  pool
    .query(query, values)
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          massage: `catagory: ${id} is not found`,
        });
      } else {
        res.status(200).json({
          success: true,
          massage: `Succeeded to updated catagory with id: ${id}`,
          result: result.rows[0],
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    });
};

module.exports = {
  getAllCatagories,
  addCatagory,
  deleteCatagory,
  updateCatagory,
};
