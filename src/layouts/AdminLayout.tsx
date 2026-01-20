import React from "react";
import { Outlet } from "react-router-dom";

export const AdminLayout = () => (
  <div className="d-flex">
    <aside className="bg-light p-3" style={{ width: 250 }}>
      <h3>Admin Menu</h3>
      <ul>
        <li>Dashboard</li>
        <li>Blogs</li>
      </ul>
    </aside>
    <main className="flex-grow-1 p-3">
      <Outlet />
    </main>
  </div>
);
