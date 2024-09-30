import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "../../User/Landingpage/landingPage";
import LoginPage from "../../User/Login/loginPage";
import RegisterPage from "../../User/Login/registerPage";
import HomePage from "../../User/Home/homePage";
import CartPage from "../../User/Cart/cartPage";
import ProfilePage from "../../User/Profile/profilePage";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
};

export default UserRoutes;
