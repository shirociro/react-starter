import React from "react";
import { Tooltip } from "flowbite-react";
import {
  HiExclamation,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
} from "react-icons/hi";

interface BlogDeleteProps {
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
}

const BlogDelete: React.FC<BlogDeleteProps> = ({
  onConfirm,
  onCancel,
  title,
}) => {
  return (
    <div className="p-4 absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/95 dark:bg-gray-900/95 backdrop-blur-md p-6 text-center transition-all animate-in fade-in zoom-in duration-200">
      <div className="pt-3 absolute top-0 right-3 z-10 flex gap-3 bg-white/70 rounded-lg p-1 pe-2">
        {/* Edit Button */}
        <Tooltip content="Cancel" placement="top">
          <HiOutlineXCircle
            color="red"
            onClick={onCancel}
            className="w-7 h-7"
          />
        </Tooltip>
        <Tooltip content="Confirm" placement="top">
          <HiOutlineCheckCircle
            color="blue"
            onClick={onConfirm}
            className="w-7 h-7"
          />
        </Tooltip>
      </div>
      <div className="mb-4 rounded-full bg-red-100 p-3 dark:bg-red-900/30">
        <HiExclamation className="h-8 w-8 text-red-600 dark:text-red-500" />
      </div>

      <h3 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">
        Remove Blog?
      </h3>

      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        Are you sure you want to delete{" "}
        <span className="font-semibold text-gray-700 dark:text-gray-200">
          "{title}"
        </span>
        ?
      </p>
    </div>
  );
};

export default BlogDelete;
