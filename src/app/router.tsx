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

// export const AppRouter = () => (
//   <Routes>
//     <Route element={<AdminLayout />}>
//       <Route path="/" element={<BlogPage />} />
//     </Route>

//     <Route element={<AuthLayout />}>
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/register" element={<RegisterPage />} />
//     </Route>

//     {/* Admin Routes (protected) */}
//     {/* <Route element={<AuthGuard><AdminLayout /></AuthGuard>}> */}
//     <Route element={<PublicLayout />}>
//       {/* <Route path="/blogs/create" element={<BlogCreatePage />} /> */}
//       {/* <Route path="/blogs/edit/:id" element={<BlogEditPage />} /> */}
//     </Route>

//     {/* Catch-all redirect (optional) */}
//     <Route path="/login"  element={<LoginPage />}  />
//   </Routes>
// );

export const AppRouter = () => (
  <Routes>

    {/* DEFAULT → LOGIN */}
    <Route path="/" element={<Navigate to="/login" replace />} />

    {/* AUTH */}
    <Route element={<AuthLayout />}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Route>

    {/* ADMIN / HOME */}
    <Route element={<AdminLayout />}>
      <Route path="/home" element={<BlogPage />} />
    </Route>

    {/* FALLBACK */}
    <Route path="*" element={<Navigate to="/login" replace />} />

  </Routes>
);
