import React, { useState } from "react";
import Sidebar from "../../../frontend/src/components/sidebar";
import { Outlet } from "react-router-dom";

function Adminpage() {
  const [isOpen, setIsOpen] = useState(true); 

  return (
    <div className="flex min-h-screen">
    
      <div className="fixed h-full">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      
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

export default Adminpage;
