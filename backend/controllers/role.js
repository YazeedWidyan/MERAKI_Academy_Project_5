const { pool } = require("../models/db");

const createNewRole = (req, res) => {
  const { role } = req.body;
  const data = [role];
  const query = "INSERT INTO roles (role) VALUES ($1) RETURNING *;";
  pool
    .query(query, data)
    .then((result) => {
      console.log(result);
      res.status(201).json({
        success: true,
        message: "Success role created",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Sever error",
        err: err,
      });
    });
};

const createNewPermission = (req, res) => {
  const { permission } = req.body;
  const data = [permission];
  const query = "INSERT INTO permissions (permission) VALUES($1) RETURNING *;";
  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Success permission created",
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
  const createNewRolePermission = (req, res) => {
    const { role_id, permission_id } = req.body;
    const data = [role_id, permission_id];
    const query =
      "INSERT INTO role_permission(role_id, permission_id)VALUES($1, $2) RETURNING *;";
    pool.query(query, data).then((result) => {
      res.status(201).json({
        success: true,
        message: "Success role_permission created",
        result: result.rows,
      })
      .catch((err)=>{
        res.status(500).json({
            success:false,
            message: 'Server error',
            err
        })
      })
    });
 
};

module.exports = {
  createNewRole,
  createNewPermission,
  createNewRolePermission,
};
