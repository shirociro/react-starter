import { useState } from "react";
import { Button } from "flowbite-react";
import { LoginForm } from "@/modules/auth/components/LoginForm";
import { RegisterForm } from "@/modules/auth/components/RegisterForm";

type Mode = "login" | "register";

export const LoginPage = () => {
  const [mode, setMode] = useState<Mode>("login");

  return (
    <div className="h-full flex flex-col md:flex-row bg-gray-100 ">
      {/* INFO PANEL */}
      <div
        className="flex w-full md:w-1/2 flex-col items-center justify-center text-white 
             relative px-6 py-12 md:py-6 md:px-8 min-h-[30vh] md:min-h-full 
             text-left items-end md:text-right md:items-end"
      >
        {/* overlay */}
        <div className="absolute inset-0 bg-blue-600 bg-opacity-40"></div>

        <div className="w-full relative ps-4  py-12 md:py-0 flex flex-col pe-4">
          <h2 className="mb-3 text-2xl font-semibold">
            {mode === "login" ? "Create New Account" : "Welcome back!"}
          </h2>

          <p className="mb-8 text-sm opacity-90">
            {mode === "login"
              ? "Enter your details to create a new account."
              : "Log in with your email and password."}
          </p>

          <Button
            color="light"
            className="w-full !rounded-xl"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
          >
            <strong className="text-blue-900">
              {mode === "login" ? "Create an account" : "Go to login"}
            </strong>
          </Button>
        </div>
      </div>

      {/* FORM PANEL */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-2  min-h-[70vh]">
        <div className="w-full max-w-md p-6">
          {mode === "login" ? (
            <LoginForm
              onSubmit={(email, password) => {
                console.log("LOGIN", email, password);
              }}
            />
          ) : (
            <RegisterForm
              onSubmit={(email, password) => {
                console.log("REGISTER", email, password);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
