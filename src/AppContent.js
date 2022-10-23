import React from "react";

import routes from "./router";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import { isAutheticated } from "./Auth.js/authHelper";
const AppContent = () => {
  const { token } = isAutheticated();

  return (
    <>
      <Routes>
        {routes.map((route, idx) => {
          return (
            route.element && (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                element={
                  <ProtectedRoute token={token} Componetn={route.element} />
                }
              />
            )
          );
        })}

        <Route path="/dashboard" element={<Navigate to="Home" replace />} />
      </Routes>
    </>
  );
};

export default AppContent;
