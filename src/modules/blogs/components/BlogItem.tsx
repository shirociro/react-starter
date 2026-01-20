import React from "react";
import type { Blog } from "../types/blog.types";

export const BlogItem = ({ blog }: { blog: Blog }) => (
  <div className="card mb-2 p-2">
    <h5>{blog.title}</h5>
    <p>{blog.content}</p>
  </div>
);
