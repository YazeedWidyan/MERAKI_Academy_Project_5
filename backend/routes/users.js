const express = require("express");

const { register, googleRegister } = require("../controllers/users");

const userRouter = express.Router();

userRouter.post("/", register);
userRouter.post("/google",googleRegister)

module.exports = userRouter;
//a
