import React from "react";
import BlogCard from "./BlogCard";
import type { BlogType } from "./Blog";

interface Props {
  blogs: BlogType[];
  onExpand: (index: number) => void;
}

const BlogGrid: React.FC<Props> = ({ blogs, onExpand }) => {
  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog, index) => (
        <BlogCard key={index} blog={blog} onViewFull={() => onExpand(index)} />
      ))}
    </div>
  );
};

export default BlogGrid;
