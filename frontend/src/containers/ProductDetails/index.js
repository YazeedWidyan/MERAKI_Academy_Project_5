import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaHeart,
  FaMinus,
  FaPlus,
  FaRegHeart,
} from "react-icons/fa";
import "./productDetails.style.css";
import { getToken, getUserId } from "../../redux/selectors/auth.selectors";
import { useSelector } from "react-redux";
import { getWishlist } from "../../redux/selectors/wishlist.selectors";
import axios from "axios";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const loading = false;
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [inWishlist, setInWishlist] = useState(false);
  const token = useSelector(getToken);

  // const userId = useSelector(getUserId);
  const wishlist = useSelector(getWishlist);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/${location.state}`)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data.product.rows[0]);
      })
      .catch((err) => {
        console.log(err);
      });

    const foundInWish = wishlist.find((item) => {
      return item.id === location.state;
    });

    setInWishlist(foundInWish);
  }, [location, wishlist]);

  const addToWishList = () => {
    console.log("sdas");
    if (!token) return navigate("/login");
    const data = {
      product_id: product.id,
    };

    axios
      .post(`http://localhost:5000/wishlist`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const increament = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreament = () => {
    if (quantity === 1) return;
    setQuantity((prev) => prev - 1);
  };

  const deleteFromWishList = (id) => {
    console.log(id);
    axios
      .delete(`http://localhost:5000/wishlist/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <div className="title-header">
          <div className="inner-container">
            <div className="current-name">{product.title}</div>
          </div>
        </div>
        <div className="cards">
          <div className="card align-image-center">
            <img className="product-image" src={product.img} alt="dummy" />
          </div>
          <div className="card">
            <div className="title-product">{product.title}</div>
            <div className="product-price">{product.price}</div>
            <div>
              <div className="specs-wrapper">
                <div className="specs-name">Brand:</div>
                <div className="specs-name">Apple</div>
              </div>
              <div className="specs-wrapper">
                <div className="specs-name">Availability:</div>
                <div className="specs-name">In Stock</div>
              </div>
            </div>
            <div className="product-description">
              <span className="description-title">overview</span>
              <br />
              {product.descriptions}
            </div>
            <div className="action-wrapper">
              <div className="quantity-select">
                <div className="quantity-action" onClick={decreament}>
                  <FaMinus />
                </div>
                <div className="quantity-count">{quantity}</div>
                <div className="quantity-action" onClick={increament}>
                  <FaPlus />
                </div>
              </div>
              <button className="btn">
                {loading ? (
                  <span className="btn-spinner"></span>
                ) : (
                  <>
                    <FaShoppingCart />
                    add to cart
                  </>
                )}
              </button>
              {inWishlist ? (
                <button
                  onClick={() => {
                    deleteFromWishList(product.id);
                  }}
                  className="icon-btn"
                >
                  <FaHeart />
                </button>
              ) : (
                <button className="icon-btn" onClick={addToWishList}>
                  <FaRegHeart />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
