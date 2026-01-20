import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthGuard } from "./guard";

// Layouts
import { PublicLayout } from "../layouts/PublicLayout";
import { AuthLayout } from "../layouts/AuthLayout";
import { AdminLayout } from "../layouts/AdminLayout";

// Auth Pages
import { LoginPage } from "../modules/auth/pages/LoginPage";
import { RegisterPage } from "../modules/auth/pages/RegisterPage";

// Blog Pages
import { BlogListPage } from "../modules/blogs/pages/BlogListPage";
import { BlogCreatePage } from "../modules/blogs/pages/BlogCreatePage";
import { BlogEditPage } from "../modules/blogs/pages/BlogEditPage";
import { BlogViewPage } from "../modules/blogs/pages/BlogViewPage";

export const AppRouter = () => (
  <Routes>
    {/* Public Routes */}
    <Route element={<PublicLayout />}>
      <Route path="/" element={<BlogListPage />} />
      <Route path="/blogs/view/:id" element={<BlogViewPage />} />
    </Route>

    {/* Auth Routes (login/register) */}
    <Route element={<AuthLayout />}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Route>

    {/* Admin Routes (protected) */}
    <Route element={<AuthGuard><AdminLayout /></AuthGuard>}>
      <Route path="/blogs/create" element={<BlogCreatePage />} />
      <Route path="/blogs/edit/:id" element={<BlogEditPage />} />
    </Route>

    {/* Catch-all redirect (optional) */}
    <Route path="*" element={<p>Page Not Found</p>} />
  </Routes>
);
