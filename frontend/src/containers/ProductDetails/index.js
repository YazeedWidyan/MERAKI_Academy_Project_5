import React from "react";
import "./productDetails.style.css";

const ProductDetails = () => {
  return (
    <div className="container">
      <div className="title_header">
        <div className="inner-container">product name</div>
      </div>
      <div className="cards">
        <div className="card">
          <img
            src="https://opencart.opencartworks.com/themes/so_sport/image/cache/catalog/demo/product/7-600x600.jpg"
            alt="dummy"
          />
        </div>
        <div className="card">
          <div>product name</div>
          <div>price</div>
          <div>
            <div>
              <div>brand</div>
              <div>brand Name</div>
            </div>
          </div>
          <div>
            overview
            <br />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip. Excepteur sint occaecat cupida
          </div>
          <div>
            <button>1</button>
            <button>add cart</button>
            <button>wishlist</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
