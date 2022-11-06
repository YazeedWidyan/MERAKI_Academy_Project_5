import React from "react";
import "./addnewproduct.style.css";
import axios from "axios";
import React, { useState, useEffect } from "react";


const AddNewProduct = () => {
  const [title, settitle] = useState('')
  const [descriptions, setdescriptions] = useState('')
  const [category_id, setcategory_id] = useState(0)
  const [img, setimg] = useState('')
  const [price,setprice]=useState(0)
  const addProduct=()=>{
    axios.post(`http://localhost:5000/product/add`,{
      title,
      descriptions,
      category_id,
      img,
      price
    }).then((result)=>{
      console.log(result.data);
    }).catch((err)=>{
      console.log(err);
    })
  }
  return <>
  <div>
    <p>new product</p>
    <br/>
    <input type={"text"}
  </div>
  </>;
};

export default AddNewProduct;
