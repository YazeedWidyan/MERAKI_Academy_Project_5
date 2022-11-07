const express = require("express");
const {
  addProduct,
  deleteProduct,
  getAllProducts,
  updateProducts,
  searchProduct,
  getProductByCatagory,
  getProductById,
} = require("../controllers/product");

const productRouter = express.Router();

productRouter.post("/add", addProduct);
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.put("/update/:id", updateProducts);
productRouter.delete("/delete/:id", deleteProduct);
productRouter.get("/search/product", searchProduct);
productRouter.get("/catgory/:category_id", getProductByCatagory);

module.exports = productRouter;
//a
