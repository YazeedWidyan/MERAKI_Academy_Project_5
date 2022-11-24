const { pool } = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = parseInt(process.env.SALT);

const register = async (req, res) => {
  const { firstName, lastName, age, country, email, password, role_id } =
    req.body;
  const enPassword = await bcrypt.hash(password, saltRounds);
  const values = [
    firstName,
    lastName,
    age,
    country,
    email.toLowerCase(),
    enPassword,
    role_id,
  ];

  const query = `INSERT INTO users (firstName, lastName, age, country, email, password, role_id) VALUES ($1,$2,$3,$4,$5,$6,$7)`;
  pool
    .query(query, values)
    .then((result) => {
      res.status(200).json({
        success: true,
        massage: "Account Created Successfully",
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        massage: "The email already exists",
        err,
      });
    });
};
const googleRegister = async (req, res) => {
  console.log(req.body);

  const { firstName, lastName, email } = req.body;

  const values1 = [email.toLowerCase()];
  const query1 = `SELECT * FROM users WHERE email = $1`;
  pool
    .query(query1, values1)
    .then(async (result) => {
      if (result.rowCount === 1) {
        console.log("first result", result);
        const payload = {
          userId: result.rows[0].id,
          country: result.rows[0].country,
          role: result.rows[0].role_id,
        };
        const options = { expiresIn: "1d" };
        const token = await jwt.sign(payload, process.env.SECRET, options);
        res.status(201).json({
          userId: result.rows[0].id,
          token,
          role: result.rows[0].role_id,
        });
      } else {
        const values2 = [firstName, lastName, email.toLowerCase(), 123, 1];
        const query2 = `INSERT INTO users (firstName, lastName, email, password, role_id) VALUES ($1,$2,$3,$4,$5) RETURNING *;`;
        pool
          .query(query2, values2)
          .then(async (result) => {
            console.log("second result", result);
            const payload = {
              userId: result.rows[0].id,
              country: result.rows[0].country,
              role: result.rows[0].role_id,
            };
            const options = { expiresIn: "1d" };
            const token = await jwt.sign(payload, process.env.SECRET, options);
            res.status(201).json({
              userId: result.rows[0].id,
              token,
              role: result.rows[0].role_id,
            });
          })
          .catch((err) => {
            res.status(500).json({
              success: false,
              message: "Server error",
              err: err.message,
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};

module.exports = {
  register,
  googleRegister,
};
