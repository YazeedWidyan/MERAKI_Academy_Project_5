const express = require("express");
const {
  createNewRole,
  createNewPermission,
  createNewRolePermission,
} = require("../controllers/role");

const roleRouter = express.Router();

roleRouter.post("/", createNewRole);
roleRouter.post("/permission", createNewPermission);
roleRouter.post("/role_permission", createNewRolePermission);
roleRouter.get("/");
roleRouter.put("/");
roleRouter.delete("/");

module.exports = roleRouter;
