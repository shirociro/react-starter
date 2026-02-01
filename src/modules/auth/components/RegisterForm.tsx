// import { Button, Label, TextInput } from "flowbite-react";

// interface RegisterFormProps {
//   onSubmit: (email: string, password: string) => void;
// }

// export const RegisterForm = ({ onSubmit }: RegisterFormProps) => {
//   return (
//     <div className="animate-fade-in p-4">
//       <h2 className="mb-1 text-xl font-semibold">Create account</h2>
//       <p className="mb-6 text-sm text-gray-500">
//         Join us in just a few seconds
//       </p>

//       <form
//         className="flex flex-col gap-1"
//         onSubmit={(e) => {
//           e.preventDefault();

//           const formData = new FormData(e.currentTarget);
//           onSubmit(
//             formData.get("email") as string,
//             formData.get("password") as string,
//           );
//         }}
//       >
//         <div>
//           <Label value="Email" />
//           <TextInput
//             placeholder="Work or personal email"
//             name="email"
//             type="email"
//             required
//             sizing="sm"
//             className="w-full"
//           />
//         </div>

//         <div>
//           <Label value="Password" />
//           <TextInput
//             placeholder="At least 8 characters"
//             name="password"
//             type="password"
//             required
//             sizing="sm"
//             className="w-full"
//           />
//         </div>

//         <div className="pb-4">
//           <Label value="Confirm password" />
//           <TextInput
//             placeholder="Confirm your password"
//             name="confirmPassword"
//             type="password"
//             required
//             sizing="sm"
//             className="w-full"
//           />
//         </div>

//         <Button className="w-full mx-auto !rounded-xl" type="submit">
//           Register
//         </Button>
//       </form>
//     </div>
//   );
// };

import { z } from "zod";
import { useState } from "react";
import { Button, Label, TextInput, Alert } from "flowbite-react";
import { useAuth } from "../hooks/useAuth";

interface RegisterFormProps {
  onSubmit?: (email: string, password: string) => void;
}

/* ✅ Zod schema */
const registerSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterForm = ({ onSubmit }: RegisterFormProps) => {
  const { register } = useAuth(); // ⬅️ make sure this exists in your hook

  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data: RegisterFormData = {
      email: String(formData.get("email") || ""),
      password: String(formData.get("password") || ""),
      confirmPassword: String(formData.get("confirmPassword") || ""),
    };

    /* ✅ Validate */
    const result = registerSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: Partial<RegisterFormData> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof RegisterFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    setMessage(null);

    try {
      await register(data.email, data.password);
      onSubmit?.(data.email, data.password);
      setMessage("Account created successfully!");
    } catch (error: any) {
      setMessage(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in p-4">
      <h2 className="mb-1 text-xl font-semibold">Create account</h2>
      <p className="mb-6 text-sm text-gray-500">
        Join us in just a few seconds
      </p>

      {message && (
        <Alert color={message.includes("success") ? "success" : "failure"}>
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
            placeholder="Work or personal email"
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
            placeholder="At least 8 characters"
            sizing="sm"
            color={errors.password ? "failure" : undefined}
            disabled={loading}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        <div>
          <Label htmlFor="confirmPassword" value="Confirm password" />
          <TextInput
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            sizing="sm"
            color={errors.confirmPassword ? "failure" : undefined}
            disabled={loading}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full !rounded-xl"
          isProcessing={loading}
          disabled={loading}
        >
          {loading ? "Creating account..." : "Register"}
        </Button>
      </form>
    </div>
  );
};
