import React from "react";
import { Outlet } from "react-router-dom";

export const PublicLayout = () => (
  // min-h-screen ensures the background covers the whole page height
  <div className="min-h-screen w-full bg-white dark:bg-gray-900">
    <header className="w-full border-b border-gray-200 p-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        TECH BLOG
      </h1>
    </header>

    <main className="w-full p-2">
      <Outlet />
    </main>
  </div>
);
