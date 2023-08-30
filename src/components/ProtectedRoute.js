import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRouteElement({ loggedIn, element }) {
  return loggedIn ? element : <Navigate to="/sign-in" replace />;
}

export default ProtectedRouteElement;
