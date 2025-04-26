import React, { useState } from "react";
import Sidebar from "../../../frontend/src/components/sidebar";
import { Outlet } from "react-router-dom";

function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(true); // Sidebar open by default

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="fixed h-full">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      {/* Main content shifts with sidebar */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isOpen ? "pl-64" : "pl-20"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboard;
