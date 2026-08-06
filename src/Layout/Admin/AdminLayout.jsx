import React from "react";
import { Outlet } from "react-router-dom";
import AdminPanel from "../../pages/adminPages/pages/AdminPlane";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-ink-950 lg:flex">
      {/* Sidebar */}
      <AdminPanel />

      {/* Main Content */}
      <main className="flex-1 min-w-0 p-5 sm:p-8 lg:p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
