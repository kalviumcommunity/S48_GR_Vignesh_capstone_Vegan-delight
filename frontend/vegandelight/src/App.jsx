import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/landingPage";
import LoginPage from "../pages/loginPage";
import RegisterPage from "../pages/registerPage";
import HomePage from "../pages/homePage";
import AddFoodItem from "../admincomponents/addFooditem";
import CartPage from "../pages/cartPage";
import ProfilePage from "../pages/profilePage";
import AdminHome from "../adminpages/adminhome";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/addfooditem" element={<AddFoodItem />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/adminhome" element={<AdminHome />} />
      </Routes>
    </Router>
  );
}

export default App;
