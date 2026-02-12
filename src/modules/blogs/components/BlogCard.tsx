import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { Card, Button, Tooltip } from "flowbite-react";
import type { Blog } from "@/modules/blogs/types/blog.types";

import { HiPencil, HiTrash, HiEye } from "react-icons/hi";
import fallbackImage from "@/assets/no-image.png";
import BlogDelete from "@/modules/blogs/components/BlogDelete";

interface Props {
  blog: Blog;
  onViewFull: () => void;
  onEdit: () => void;
  onDelete: () => void;
}
const BlogCard: React.FC<Props> = ({ blog, onViewFull, onEdit, onDelete }) => {
  const deletingIds = useSelector(
    (state: RootState) => state.blog?.deletingIds ?? [],
  );

  console.log("BlogCard deletingIds:", deletingIds);
  const deleting = deletingIds.includes(blog.id);

  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  return (
    <div className="relative w-full mx-auto">
      <Card
        className={`
          h-full p-4 rounded-xl shadow-md hover:shadow-xl overflow-hidden flex flex-col
          transition-all duration-300 ease-in-out
          ${deleting ? "opacity-0 scale-90 -translate-x-6" : "opacity-100 scale-100 translate-x-0"}
      `}
      >
        {showDeleteConfirm && (
          <BlogDelete
            title={blog.title}
            onConfirm={() => {
              onDelete();
              setShowDeleteConfirm(false);
            }}
            onCancel={() => setShowDeleteConfirm(false)}
          />
        )}
        {/* View Full */}
        <div className="absolute top-0 right-3 z-10 flex gap-2 bg-white/70 rounded-lg p-1">
          {/* Edit Button */}
          <Tooltip content="Edit blog" placement="top">
            <Button
              onClick={onEdit}
              size="lg"
              className="flex items-center justify-center p-2 bg-transparent"
            >
              <HiPencil className="w-6 h-6 " color="blue" />
            </Button>
          </Tooltip>

          {/* Delete Button */}
          <Tooltip content="Delete blog" placement="top">
            <Button
              onClick={() => setShowDeleteConfirm(true)}
              size="lg"
              className="flex items-center justify-center p-2 bg-transparent"
            >
              <HiTrash className="w-6 h-6" color="red" />
            </Button>
          </Tooltip>

          {/* View Full Button */}
          <Tooltip content="View" placement="top">
            <Button
              onClick={onViewFull}
              size="lg"
              className="flex items-center justify-center p-2 bg-transparent"
            >
              <HiEye className="w-6 h-6" color="gray" />
            </Button>
          </Tooltip>
        </div>

        {/* Image – ALWAYS visible */}
        <div className="w-full h-52 shrink-0 overflow-hidden rounded-xl mb-4">
          {/* <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          /> */}

          <img
            src={blog.image ? blog.image : fallbackImage}
            alt={blog.title}
            className={`w-full h-full ${
              blog.image ? "object-cover" : "object-contain bg-gray-100"
            }`}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 gap-2">
          <span className="text-xs text-gray-500">{blog.date}</span>
          <h3 className="text-lg font-bold dark:text-white line-clamp-2">
            {blog.title}
          </h3>

          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
            {blog.content}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default BlogCard;
