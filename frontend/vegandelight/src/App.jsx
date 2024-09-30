import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import UserRoutes from "../Routes/UserRoutes/userroutes";
import AdminRoutes from "../Routes/AdminRoutes/adminroutes";

function App() {
  return (
    <Router>
      <UserRoutes />
      <AdminRoutes />
    </Router>
  );
}

export default App;
