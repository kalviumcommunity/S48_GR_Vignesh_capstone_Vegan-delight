import React, { useState } from "react";
import Sidebar from "../admincomponents/sidebar";
import ManageOrders from "./manageorders";
import ManageUsers from "./manageusers";
import ManageCatalogue from "./managecatalogue";
import ManageWallets from "./managewallets";
import ManageInventory from "./manageinventory";
import ManageEmployees from "./manageemployees";

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
    <div style={{ display: "flex" }}>
      <div
        style={{ width: "20%", padding: "10px", borderRight: "1px solid #ccc" }}
      >
        <Sidebar onSelect={setSelectedComponent} />
      </div>
      <div style={{ width: "80%", padding: "10px" }}>{renderComponent()}</div>
    </div>
  );
}

export default AdminHome;
