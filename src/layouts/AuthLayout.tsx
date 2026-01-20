import React from "react";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => (
  <div className="container mt-5">
    <main>
      <Outlet />
    </main>
  </div>
);
