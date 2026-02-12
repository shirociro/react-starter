import React from "react";
import { Card, Button } from "flowbite-react";
import type { Blog } from "@/modules/blogs/types/blog.types";
import fallbackImage from "@/assets/no-image.png";

interface Props {
  blog: Blog;
  onClose: () => void;
}

const BlogEdit: React.FC<Props> = ({ blog, onClose }) => {
  return (
    <Card className="relative rounded-2xl shadow-2xl overflow-hidden">
      <Button
        color="success"
        size="sm"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 bg-gray-600 text-white hover:bg-gray-700 border-none"
      >
        Collapse
      </Button>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left – Image & Meta */}
        <div className="lg:w-5/12 flex flex-col gap-4 p-4">
          <div className="relative w-full h-64 lg:h-[420px] overflow-hidden rounded-lg bg-gray-100">
            <img
              src={blog.image ? blog.image : fallbackImage}
              alt={blog.title}
              className={`w-full h-full ${
                blog.image ? "object-cover" : "object-contain bg-gray-100"
              }`}
            />
          </div>

          {/* Title & Date */}
          <div className="flex flex-col gap-4 mt-2">
            <div>
              <h2 className="text-3xl font-bold dark:text-white">
                {blog.title}
              </h2>
            </div>
          </div>
        </div>

        {/* Right – Content */}
        <div className="lg:w-7/12 p-6 flex flex-col gap-4 overflow-y-auto max-h-[65vh] pe-3">
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed pt-5 px-3">
            {blog.content}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default BlogEdit;
