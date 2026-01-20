import React from "react";
import type { Blog } from "../types/blog.types";
import { BlogItem } from "./BlogItem";

export const BlogList = ({ blogs }: { blogs: Blog[] }) => (
  <div>
    {blogs.map((blog) => (
      <BlogItem key={blog.id} blog={blog} />
    ))}
  </div>
);
