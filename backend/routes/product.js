const express = require("express");
const { addProduct, deleteProduct, getAllProducts, updateProducts, searchProduct, getProductByCatagory } = require("../controllers/product");

const productRouter = express.Router();

productRouter.post("/add",addProduct);
productRouter.get("/",getAllProducts);
productRouter.put("/",updateProducts);
productRouter.delete("/delete",deleteProduct);
productRouter.get("/:letter",searchProduct)
productRouter.get("/catgory/:category_id",getProductByCatagory)

module.exports = productRouter;
//a
