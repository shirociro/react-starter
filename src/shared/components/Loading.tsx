// File: components/Loading.tsx
import React from "react";
import { Spinner } from "flowbite-react";

interface LoadingProps {
  text?: string; // optional loading text
  size?: "sm" | "md" | "lg" | "xl"; // spinner size
}

const Loading: React.FC<LoadingProps> = ({
  text = "Loading...",
  size = "md",
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[200px]">
      <Spinner aria-label="Loading..." size={size} />
      {text && <p className="mt-4 text-gray-500 dark:text-gray-300">{text}</p>}
    </div>
  );
};

export default Loading;
