import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "../components/Cart/Cart";
import Login from "../components/Login";
import Signup from "../components/Signup";
import PageNotFound from "../components/PageNotFound";
import UserSearch from "../components/SearchBar/UserSearch";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/signup" element={< Signup/>}/>
        <Route path="/usersearch" element={< UserSearch/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
