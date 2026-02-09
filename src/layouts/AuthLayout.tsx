import { Outlet } from "react-router-dom";
import { Card } from "flowbite-react";

export const AuthLayout = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 bg-white dark:bg-gray-900">
    <Card className="w-full max-w-4xl p-6 md:p-8 shadow-lg auth-card">
      <main className="h-full">
        <Outlet />
      </main>
    </Card>
  </div>
);
