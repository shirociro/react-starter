import React from "react";
import { Card, Button } from "flowbite-react";
import type { BlogType } from "./Blog";

interface Props {
  blog: BlogType;
  onClose: () => void;
}

const BlogFullscreen: React.FC<Props> = ({ blog, onClose }) => {
  return (
    <Card className="relative rounded-2xl shadow-2xl p-0 overflow-hidden max-h-[70vh]">
      <Button
        color="success"
        size="sm"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 bg-gray-600 text-white hover:bg-gray-700 border-none"
      >
        Collapse
      </Button>

      <div className="flex flex-col lg:flex-row h-full gap-8">
        {/* Image – 35% (fixed, non-scrollable) */}
        <div className="lg:w-5/12 h-100 md:h-full overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="container m-2 p-2">
            <h2 className="text-3xl font-bold dark:text-white">{blog.title}</h2>
            <span className="text-sm text-gray-600 font-semibold">
              {blog.date}
            </span>
          </div>
        </div>

        {/* Content – 65% (scrollable) */}
        {/* Content – 65% (scrollable) */}
        <div
          className="
                lg:w-7/12
                p-6
                flex flex-col gap-4
                overflow-y-auto
                max-h-screen
            "
        >
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed pt-5 px-3">
            {blog.description}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default BlogFullscreen;
