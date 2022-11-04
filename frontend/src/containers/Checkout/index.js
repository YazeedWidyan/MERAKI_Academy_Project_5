import axios from "axios";
import React from "react";
import { useEffect } from "react";
import "./checkout.style.css";
console.log("test");
//this function to send a body cart and open payment session
const Checkout = () => {
  const handleCheckout = () => {
    axios
      .post("http://localhost:5000/payment/create-checkout-session")
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleCheckout();
  }, []);

  return (
    <>
      <div></div>;
    </>
  );
};

export default Checkout;
