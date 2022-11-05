const express = require("express");
const { addCatagory, getAllCatagories, updateCatagory, deleteCatagory } = require("../controllers/category");

const categoryRouter = express.Router();

categoryRouter.post("/add",addCatagory);
categoryRouter.get("/",getAllCatagories);
categoryRouter.put("/update",updateCatagory);
categoryRouter.delete("/delete",deleteCatagory);

module.exports = categoryRouter;
//a
