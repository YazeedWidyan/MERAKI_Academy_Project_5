import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../containers/Home";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </>
  );
};

export default Router;
