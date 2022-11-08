import React from "react";
import "./addnewproduct.style.css";
import axios from "axios";
import { useState, useEffect } from "react";

const AddNewProduct = () => {
  const [title, settitle] = useState("");
  const [descriptions, setdescriptions] = useState("");
  const [category_id, setcategory_id] = useState(0);
  const [img, setimg] = useState("");
  const [price, setprice] = useState(0);
  const addProduct = () => {
    axios
      .post(`http://localhost:5000/product/add`, {
        title,
        descriptions,
        category_id,
        img,
        price,
      })
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadImg = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setimg(base64);
  };
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  return (
    <>
      <div className="add">
        <p>new product</p>
        <br />
        <input
          onChange={(e) => {
            settitle(e.target.value);
          }}
          type="text"
          placeholder="title"
        />
        <textarea
          onChange={(e) => {
            setdescriptions(e.target.value);
          }}
          type="text"
          placeholder="description"
        />
        <input
          onChange={(e) => {
            setcategory_id(e.target.value);
          }}
          type="number"
          placeholder="catagory"
        />
        <label>Img:</label>
        <br />
        <input
          className="image-input-field"
          type="file"
          required
          onChange={(e) => {
            uploadImg(e);
          }}
        />
        <input
          onChange={(e) => {
            setprice(e.target.value);
          }}
          type="number"
          placeholder="price"
        />
        <button
          onClick={() => {
            addProduct();
          }}
        >
          ADD
        </button>
      </div>
    </>
  );
};

export default AddNewProduct;
