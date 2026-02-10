import { z } from "zod";
import { useState } from "react";
import { Button, Label, TextInput, Alert } from "flowbite-react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
interface LoginFormProps {
  onSubmit?: (email: string, password: string) => void;
}

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data: LoginFormData = {
      email: String(formData.get("email") || ""),
      password: String(formData.get("password") || ""),
    };

    /* ✅ Validate */
    const result = loginSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: Partial<LoginFormData> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof LoginFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    setMessage(null);

    try {
      await login(data.email, data.password);
      onSubmit?.(data.email, data.password);
      setMessage("Login successful!");
      navigate("/home");
    } catch (error: any) {
      setMessage(error.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in p-4">
      <h2 className="mb-1 text-xl font-semibold">Welcome back</h2>
      <p className="mb-6 text-sm text-gray-500">
        Sign in to continue to your account
      </p>

      {message && (
        <Alert color={message.includes("successful") ? "success" : "failure"}>
          {message}
        </Alert>
      )}

      <form className="mt-4 flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="email" value="Email" />
          <TextInput
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            sizing="sm"
            color={errors.email ? "failure" : undefined}
            disabled={loading}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password" value="Password" />
          <TextInput
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            sizing="sm"
            color={errors.password ? "failure" : undefined}
            disabled={loading}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full !rounded-xl"
          isProcessing={loading}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </div>
  );
};
