import React from "react";
import { Route, Routes } from "react-router-dom";

import AddFoodItem from "../../Admin/Managecatalogue/addFooditem";
import AdminHome from "../../Admin/Dashboard/adminhome";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/addfooditem" element={<AddFoodItem />} />
      <Route path="/addfooditem" element={<AddFoodItem />} />
      <Route path="/adminhome" element={<AdminHome />} />
    </Routes>
  );
};

export default AdminRoutes;
