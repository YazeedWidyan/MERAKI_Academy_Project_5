const express = require("express");

const webstatusRouter = express.Router();

webstatusRouter.post("/");
webstatusRouter.get("/");
webstatusRouter.put("/");
webstatusRouter.delete("/");

module.exports = webstatusRouter;
//a
