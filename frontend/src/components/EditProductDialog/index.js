import React, { useState } from "react";
import "./EditProductDialog.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { getToken } from "../../redux/selectors/auth.selectors";

//this is componet for edit popup product
const EditProductDialog = ({
  productDetails,
  setIsEdit,
  products,
  setProducts,
}) => {
  const [title, setTitle] = useState(productDetails.title);
  const [price, setPrice] = useState(productDetails.price);
  const [img, setImg] = useState(productDetails.img);
  const [descriptions, setDescriptions] = useState(productDetails.descriptions);
  const [in_stock, setin_stock] = useState(productDetails.in_stock);
  const token = useSelector(getToken);

  const handleSubmit = (e) => {
    axios
      .put(
        `http://localhost:5000/product/${productDetails.id}`,
        {
          title,
          price,
          img,
          descriptions,
          in_stock,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const newProducts = products.map((product) => {
          if (product.id == productDetails.id) {
            product.title = res.data.product.title;
            product.price = res.data.product.price;
            product.img = res.data.product.img;
            product.descriptions = res.data.product.descriptions;
            product.in_stock = res.data.product.in_stock;
          }
          return product;
        });
        setProducts(newProducts);
        setIsEdit(false);
      })
      .catch((err) => {
        console.log(err);
        setIsEdit(false);
      });
    e.preventDefault();
  };

  return (
    <>
      <div className="edit-dialog">
        <div className="edit-dialog-content">
          <span onClick={() => setIsEdit(false)} className="close-edit-dialog">
            &times;
          </span>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="product-form-wrapper">
              <div className="product-form-left">
                <label>Tilte:</label>
                <br />
                <input
                  className="input-field"
                  type="text"
                  value={title}
                  required
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <br />
                <label>Price:</label>
                <br />
                <input
                  className="input-field"
                  type="text"
                  value={price}
                  required
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
                <br />
                <label>descriptions:</label>
                <br />
                <textarea
                  className="input-textarea"
                  type="text"
                  value={descriptions}
                  required
                  onChange={(e) => {
                    setDescriptions(e.target.value);
                  }}
                />
                <br />
                <label>
                  <input
                    type="checkbox"
                    checked={in_stock}
                    onChange={() => {
                      setin_stock(!in_stock);
                    }}
                  />
                  in Stock
                </label>
                <br />
              </div>
              <div className="product-form-right">
                <label>Img:</label>
                <br />
                <input
                  className="input-field"
                  type="text"
                  value={img}
                  required
                  onChange={(e) => {
                    setImg(e.target.value);
                  }}
                />
                <br />{" "}
              </div>
            </div>
            <input className="update-btn" type="submit" value="Update" />
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProductDialog;
