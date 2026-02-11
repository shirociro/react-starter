import { Routes, Route, Navigate } from "react-router-dom";
import { AuthGuard } from "./guard";

// Layouts
import { PublicLayout } from "../layouts/PublicLayout";
import { AuthLayout } from "../layouts/AuthLayout";
import { AdminLayout } from "../layouts/AdminLayout";

// Auth Pages
import { LoginPage } from "../modules/auth/pages/LoginPage";
import { RegisterPage } from "../modules/auth/pages/RegisterPage";

// Blog SPA (ADD, EDIT, DELETE, VIEW, LIST)
import BlogPage from "../modules/blogs/pages/admin/Blog.tsx";
export const AppRouter = () => (
  <Routes>

    {/* DEFAULT → LOGIN */}
    <Route path="/" element={<Navigate to="/login" replace />} />

    {/* AUTH PAGES (PUBLIC) */}
    <Route element={<AuthLayout />}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Route>

    {/* ADMIN / HOME (PROTECTED) */}
    <Route
      element={
        <AuthGuard>
          <AdminLayout />
        </AuthGuard>
      }
    >
      <Route path="/home" element={<BlogPage />} />
    </Route>

    {/* FALLBACK */}
    <Route path="*" element={<Navigate to="/login" replace />} />

  </Routes>
);
