const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./models/db");
console.log("test");

//routers
const wishlistRouter = require("./routes/wishlist");

const app = express();

app.use(express.json());
app.use(cors());

// router middleware

app.use("/wishlist", wishlistRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
