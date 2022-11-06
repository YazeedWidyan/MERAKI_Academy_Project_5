import React from "react";
import "./checkoutsuccess.style.css";
console.log("yazeed");
const CheckoutSuccess = () => {
  return (
    <div className="success-checkout-container">
      <div className="success-checkout-wrapper">
        <img
          className="success-checkout-image"
          src="./assets/images/check.png"
          alt="checkout success"
        />
        <h1>THANK YOU FOR YOUR PURCHASE</h1>
        <div className="success-checkout-btn">Continue Shopping</div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
