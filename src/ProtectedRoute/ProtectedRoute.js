import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ token , Componetn }) => {
  if (!token) {
    return <Navigate to={"/login"} />;
  }
  return <>
  <Componetn />
  </>;
};

export default ProtectedRoute;
