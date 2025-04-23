import React from 'react';
import Sidebar from '../components/sidebar';
import { Outlet } from 'react-router-dom';
function AdminDashboard() {
  
  return (
    <div className="flex  min-h-screen">

      <div className="fixed h-full">
        <Sidebar />
      </div>

     
      <div className="flex-1 pl-64"> 
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboard
