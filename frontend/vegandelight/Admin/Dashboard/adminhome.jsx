import React, { useState } from "react";
import Sidebar from "./sidebar";
import ManageOrders from "../Manageorders/manageorders";
import ManageUsers from "../Manageusers/manageusers";
import ManageCatalogue from "../Managecatalogue/managecatalogue";
import ManageWallets from "../Managewallets/managewallets";
import ManageInventory from "../Manageinventory/manageinventory";
import ManageEmployees from "../Manageemployees/manageemployees";
import "./dashBoardStyles.css";

function AdminHome() {
  const [selectedComponent, setSelectedComponent] = useState("manageOrders");

  const renderComponent = () => {
    switch (selectedComponent) {
      case "manageOrders":
        return <ManageOrders />;
      case "manageUsers":
        return <ManageUsers />;
      case "manageCatalogue":
        return <ManageCatalogue />;
      case "manageWallets":
        return <ManageWallets />;
      case "manageInventory":
        return <ManageInventory />;
      case "manageEmployees":
        return <ManageEmployees />;
      default:
        return <div>Select a component from the sidebar</div>;
    }
  };

  return (
    <div className="admin-container">
      <div className="sidebar-container">
        <Sidebar onSelect={setSelectedComponent} />
      </div>
      <div className="content-container">{renderComponent()}</div>
    </div>
  );
}

export default AdminHome;
