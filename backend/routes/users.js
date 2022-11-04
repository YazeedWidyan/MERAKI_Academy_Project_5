const express = require("express");

const { register } = require("../controllers/users");

const userRouter = express.Router();

userRouter.post("/", register);

module.exports = userRouter;
