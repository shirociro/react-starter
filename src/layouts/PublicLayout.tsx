import React from "react";
import { Outlet } from "react-router-dom";

export const PublicLayout = () => (
  <div className="container mt-4">
    <header className="mb-4">
      <h1>My React App</h1>
    </header>
    <main>
      <Outlet />
    </main>
  </div>
);
