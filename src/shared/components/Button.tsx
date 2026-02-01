import React from "react";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export const Button = ({
  children,
  onClick,
  type = "button",
  className,
}: Props) => (
  <button
    type={type}
    className={`btn ${className || "btn-primary"}`}
    onClick={onClick}
  >
    {children}
  </button>
);
