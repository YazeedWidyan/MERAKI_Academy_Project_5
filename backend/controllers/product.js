const { pool } = require("../models/db");

const getAllProducts = (req, res) => {
  console.log("yaa");
  const query = `SELECT products.id, img, category, title, category_id, descriptions, price, in_stock FROM products FULL OUTER JOIN categories ON products.category_id = categories.id WHERE is_deleted=0 ORDER BY 1;`;
  pool
    .query(query)
    .then((result) => {
      console.log(result.rows);
      res.status(200).json({
        success: true,
        massage: "All the products",
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
const searchProduct = (req, res) => {
  const letter = req.params.letter;
  const query = `SELECT * FROM products
    WHERE title LIKE '%${letter}%'`;
  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        massage: " the product",
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
const addProduct = (req, res) => {
  const { title, descriptions, category_id, img, price } = req.body;
  const values = [title, descriptions, category_id, img, price];
  const query = `INSERT INTO products (title,descriptions,category_id,img,price) VALUES ($1,$2,$3,$4,$5) RETURNING *;`;
  pool
    .query(query, values)
    .then((result) => {
      res.status(200).json({
        success: true,
        massage: "product created",
        result: result.rows[0],
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    });
};
const deleteProduct = (req, res) => {
  const id = req.params.id;
  const query = `UPDATE products SET is_deleted=1 WHERE id=$1;`;
  const values = [id];
  pool
    .query(query, values)
    .then((result) => {
      if (result.rowCount === 0) {
        res.status(404).json({
          success: false,
          massage: `The product: ${id} is not found`,
          err: err,
        });
      } else {
        res.status(200).json({
          success: true,
          massage: `Succeeded to delete product with id: ${id}`,
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
const updateProducts = (req, res) => {
  const id = req.params.id;
  const { title, descriptions, category_id, img, price } = req.body;
  const query = `UPDATE products SET title = COALESCE($1,title), description = COALESCE($2, description),catagory_id=COALESCE($3, catagory_id),img=COALESCE($4, img),price=COALESCE($5, price) WHERE id=$6 AND is_deleted = 0  RETURNING *;`;
  const values = [
    title || null,
    descriptions || null,
    category_id || null,
    img || null,
    price || null,
    id,
  ];
  pool
    .query(query, values)
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          massage: `The product: ${id} is not found`,
        });
      } else {
        res.status(200).json({
          success: true,
          massage: `Succeeded to updated product with id: ${id}`,
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
const getProductByCatagory = (req, res) => {
  const category_id = req.params.category_id;
  // console.log(category_id);
  const query = `SELECT products.id, img, category, title, category_id, descriptions, price, in_stock FROM products FULL OUTER JOIN categories ON products.category_id = categories.id WHERE is_deleted=0 AND category_id=${category_id};`;
  pool
    .query(query)
    .then((result) => {
      console.log(result.rows);
      res.status(200).json({
        success: true,
        massage: "All the products by their catagories",
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

const getProductById = (req, res) => {
  const id = req.params.id;
  const data = [id];
  const query = "SELECT * FROM products WHERE id = $1";

  pool
    .query(query, data)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "The product is not found",
        });
      }
      res.status(200).json({
        success: true,
        message: `The product with id ${id}`,
        product: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        Error: err.message,
      });
    });
};

module.exports = {
  getAllProducts,
  addProduct,
  deleteProduct,
  updateProducts,
  searchProduct,
  getProductByCatagory,
  getProductById,
};
