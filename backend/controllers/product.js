const {pool}= require("../models/db");

const getAllProducts=(req,res)=>{
const query=`SELECT * FROM products  WHERE is_deleted=0 ORDER BY 1;`;
pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        massage: "All the products",
        result: result.rows,
       
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    });
}
const searchProduct=(req,res)=>{
    const letter=req.params.letter
    const query=`SELECT * FROM products
    WHERE title LIKE '%${letter}%'`;
    pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        massage: " the product",
        result: result.rows,
       
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    });
}
const addProduct=(req,res)=>{
    const {title,descriptions,catagory_id,img,price}=req.body
    const values =[title,descriptions,catagory_id,img,price]
    const query=`INSERT INTO products (title,descriptions,catagory_id,img,price) VALUES ($1,$2,$3,$4,$5) RETURNING *;`;
    pool
    .query(query, values)
    .then((result) => {
      res.status(200).json({
        success: true,
        massage: "product created",
        result: result.rows[0],
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    });
}
const deleteProduct=(req,res)=>{
    const id = req.params.id;
    const query = `UPDATE products SET is_deleted=1 WHERE id=$1;`;
    const values = [id];
    pool
    .query(query, values)
    .then((result) => {
      if (result.rowCount === 0) {
        res.status(404).json({
          success: false,
          massage: `The product: ${id} is not found`,
          err: err,
        });
      } else {
        res.status(200).json({
          success: true,
          massage: `Succeeded to delete product with id: ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    });
}
const updateProducts=(req,res)=>{
    const id = req.params.id;
    const { title,descriptions,catagory_id,img,price } = req.body;
    const query=`UPDATE products SET title = COALESCE($1,title), description = COALESCE($2, description),catagory_id=COALESCE($3, catagory_id),img=COALESCE($4, img),price=COALESCE($5, price) WHERE id=$6 AND is_deleted = 0  RETURNING *;`;
    const values=[title||null,descriptions||null,catagory_id||null,img||null,price||null,id];
    pool
    .query(query, values)
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          massage: `The product: ${id} is not found`,
        });
      } else {
        res.status(200).json({
          success: true,
          massage: `Succeeded to updated product with id: ${id}`,
          result: result.rows[0],
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    });

}

module.exports={getAllProducts,addProduct,deleteProduct,updateProducts,searchProduct}
