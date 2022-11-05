const express = require("express");
const { addProduct, deleteProduct, getAllProducts, updateProducts, searchProduct } = require("../controllers/product");

const productRouter = express.Router();

productRouter.post("/add",addProduct);
productRouter.get("/",getAllProducts);
productRouter.put("/",updateProducts);
productRouter.delete("/delete",deleteProduct);
productRouter.get("/:letter",searchProduct)

module.exports = productRouter;
//a
