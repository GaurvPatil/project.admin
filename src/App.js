import * as React from "react";
import 'react-toastify/dist/ReactToastify.css';
import MiniDrawer from "./panel";
import { HashRouter, Route, Routes } from "react-router-dom";

// pages
import Home from "./pages/Home";
import Login from "./Auth.js/Login";
import Register from "./Auth.js/Register";
import Page404 from "./layout/Page404";
import Page500 from "./layout/Page500";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
        <Route exact path="/" name="Home page" element={<Home />} />
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route
            exact
            path="/register"
            name="Register Page"
            element={<Register />}
          />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route path="*" name="Home" element={<MiniDrawer />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
