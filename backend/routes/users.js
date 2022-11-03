const express = require("express");

const { register } = require("../controllers/users");

const registerRouter = express.Router();

registerRouter.post("/", register);

module.exports = registerRouter;
