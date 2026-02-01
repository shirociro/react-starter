import { RegisterForm } from "../components/RegisterForm";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (email: string, password: string) => {
    try {
      await register(email, password);
      navigate("/");
    } catch (err) {
      alert("Register failed: " + err);
    }
  };

  return (
    <div className="card p-4">
      <h2>Register</h2>
      <RegisterForm onSubmit={handleRegister} />
    </div>
  );
};
