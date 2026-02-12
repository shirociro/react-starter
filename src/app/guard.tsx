import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store"; // <- must match exactly your export
import { Navigate } from "react-router-dom";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return <>{children}</>;
};
