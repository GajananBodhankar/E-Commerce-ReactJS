import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./home";
import Action from "./Action";
import { useSelector } from "react-redux";
import Details from "./details";
import Cart from "./Cart";

const Routing = () => {
  const { status } = useSelector((state) => state.ValidateReducer);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="products" element={<Action />} />
        <Route path="details" element={<Details />} />
        <Route path="cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Routing;
