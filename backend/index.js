const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./models/db");
console.log("testyazeed");
//routers
const wishlistRouter = require("./routes/wishlist");
const paymentRouter = require("./routes/payment");
const matchRouter = require("./routes/match");
const cartRouter = require("./routes/cart");
const productRouter = require("./routes/product");
const loginRouter = require("./routes/login");
const categoryRouter = require("./routes/category");
const webstatusRouter = require("./routes/webstatus");
const roleRouter = require("./routes/role");
const userRouter = require("./routes/users");
const orderRouter = require("./routes/order");

const app = express();
console.log("aa");
app.use(express.json({ limit: "50mb" }));
app.use(cors());

// router middleware
app.use("/wishlist", wishlistRouter);
app.use("/payment", paymentRouter);
app.use("/cart", cartRouter);
app.use("/product", productRouter);
app.use("/login", loginRouter);
app.use("/category", categoryRouter);
app.use("/webstatus", webstatusRouter);
app.use("/role", roleRouter);
app.use("/match", matchRouter);
app.use("/user", userRouter);
app.use("/order", orderRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
