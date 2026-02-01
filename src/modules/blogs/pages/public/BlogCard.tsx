import React from "react";
import { Card, Button } from "flowbite-react";
import type { BlogType } from "./Blog";

interface Props {
  blog: BlogType;
  onViewFull: () => void;
}

const BlogCard: React.FC<Props> = ({ blog, onViewFull }) => {
  return (
    <div className="relative w-full mx-auto">
      <Card
        className="
          h-full
          p-4
          rounded-xl
          shadow-md
          hover:shadow-xl
          transition-all duration-300
          hover:-translate-y-2
          overflow-hidden
          flex flex-col
        "
      >
        {/* View Full */}
        <Button
          color="light"
          size="xs"
          className="absolute top-3 right-3 z-10"
          onClick={onViewFull}
        >
          View Full
        </Button>

        {/* Image – ALWAYS visible */}
        <div className="w-full h-52 shrink-0 overflow-hidden rounded-xl mb-4">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 gap-2">
          <span className="text-xs text-gray-500">{blog.date}</span>

          <h3 className="text-lg font-bold dark:text-white line-clamp-2">
            {blog.title}
          </h3>

          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
            {blog.description}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default BlogCard;
