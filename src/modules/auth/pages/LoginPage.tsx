import React from "react";
import { LoginForm } from "../components/LoginForm";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      navigate("/"); // Redirect to home after login
    } catch (err) {
      alert("Login failed: " + err);
    }
  };

  return (
    <div className="card p-4">
      <h2>Login</h2>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};
