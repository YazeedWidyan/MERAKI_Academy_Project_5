import React from "react";
import "./wishlist.style.css";
import { getToken } from "../../redux/selectors/auth.selectors";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWishlist } from "../../redux/selectors/wishlist.selectors";
import axios from "axios";
import { setWishlist, deleteFromWishlist } from "../../redux/reducers/wishlist";

const Wishlist = () => {
  const navigate = useNavigate();
  const token = useSelector(getToken);
  const wishlist = useSelector(getWishlist);
  const dispatch = useDispatch();

  console.log(wishlist);

  useEffect(() => {
    // if (!token) {
    //   navigate("/login");
    // }

    if (wishlist.length === 0) {
      axios
        .get("http://localhost:5000/wishlist", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          dispatch(setWishlist(res.data.result));
          console.log(res.data.result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const deleteProductFromWishlist = (id) => {
    axios
      .delete(`http://localhost:5000/wishlist/${id}`)
      .then((res) => {
        dispatch(deleteFromWishlist(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="wishlist-container">
        <div className="page-title">Wishlist</div>
        <div className="wishlist-grid"></div>
      </div>
    </>
  );
};

export default Wishlist;
