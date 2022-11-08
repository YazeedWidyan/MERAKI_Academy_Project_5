const { pool } = require("../models/db");

const authorization = (string) => {
  return async (req, res, next) => {
    const role = req.token.role;

    const query =
      "SELECT * FROM role_permissions INNER JOIN permissions ON permissions.id = role_permission.permission_id WHERE role_id = $1";

    const result = await pool.query(query, [role]);

    const finalResult = result.rows.map((role) => {
      return role.permission;
    });

    if (!finalResult.includes(string)) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }
    next();
  };
};

module.exports = authorization;
