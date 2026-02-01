// import React from "react";
// import { Outlet } from "react-router-dom";

// export const AdminLayout = () => (
//   <div className="d-flex">
//     <aside className="bg-light p-3" style={{ width: 250 }}>
//       <h3>Admin Menu</h3>
//       <ul>
//         <li>Dashboard</li>
//         <li>Blogs</li>
//       </ul>
//     </aside>
//     <main className="flex-grow-1 p-3">
//       <Outlet />
//     </main>
//   </div>
// );
import React from "react";
import { Outlet } from "react-router-dom";

export const AdminLayout = () => (
  // min-h-screen ensures the background covers the whole page height
  <div className="min-h-screen w-full bg-white dark:bg-gray-900">
    <header className="w-full border-b border-gray-200 p-2">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        Admin
      </h1>
    </header>

    <main className="w-full p-2">
      <Outlet />
    </main>
  </div>
);
