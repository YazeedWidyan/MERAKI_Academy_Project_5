import React from "react";
import { FaShoppingBasket, FaHeart, FaSearch } from "react-icons/fa";
import "./header.style.css";
import { setLogout } from "../../redux/reducers/auth";
import { useSelector, useDispatch } from "react-redux";
import { getToken } from "../../redux/selectors/auth.selectors";
import { useNavigate, Link } from "react-router-dom";
import Search from "../Search";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  console.log(token);

  const logout = () => {
    dispatch(setLogout(false));
    navigate("/login");
  };

  const goToWishlist = () => {
    navigate("/wishlist");
  };
  const goToCart = () => {
    navigate("/cart");
  };

  const goToHome = () => {
    navigate("/");
  };
  return (
    <>
      {/* <div className="overlay">
        <div className="overlay__inner">
          <div className="overlay__content">
            <span className="spinner"></span>
          </div>
        </div>
      </div> */}
      <div className="top-header-wrapper">
        <div className="top-header-section">
          <div>Hotline : +123 456 7890</div>
          <div>|</div>
          <div>Welcome to StoreName</div>
        </div>
        <div className="top-header-section">
          {token ? (
            <div className="text-btn" onClick={logout}>
              Logout
            </div>
          ) : (
            <div className="wrapper">
              <Link className="link" to="/register">
                <div className="text-btn">Register</div>
              </Link>
              <Link className="link" to="/login">
                <div className="text-btn">Login</div>
              </Link>
            </div>
          )}
          <div onClick={goToWishlist} className="text-btn">
            <FaHeart />
            <span>Wishlist</span>
            <span>(0)</span>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="bottom-header-wrapper">
          <div>
            <img src="https://opencart.opencartworks.com/themes/so_sport/image/catalog/demo/logo/logo.png" />
          </div>
          <div className="bottom-header-right-wrapper">
            <div className="navigation-wrapper">
              <div onClick={goToHome} className="navigation-btn">
                Home
              </div>
              <div className="navigation-btn">Shop</div>
              <div className="navigation-btn">Match</div>
            </div>
            <div className="search-wrapper">
              <div className="text-btn">
                <Search />
                <FaSearch size={18} />
              </div>
              <div className="text-btn" onClick={goToCart}>
                <span className="cart-count-indicator">{0}</span>
                <FaShoppingBasket size={22} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
