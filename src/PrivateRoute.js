import React from "react";
import { Navigate, Route } from "react-router-dom";
import Home from "./components/Home";

const PrivateRoute = ({ path, element, isAuthenticated }) => {
  return isAuthenticated ? (
    <Route path='./components/Home' element={<Home/>} />
  ) : (
    <Navigate to="/Login" replace />
  );
};

export default PrivateRoute;
