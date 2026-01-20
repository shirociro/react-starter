import React from "react";
import type { Blog } from "../types/blog.types";

export const BlogCard = ({ blog, onDelete }: { blog: Blog; onDelete: (id: string) => void }) => (
  <div className="card mb-3 p-3">
    <h5>{blog.title}</h5>
    <p>{blog.content}</p>
    <button className="btn btn-danger" onClick={() => onDelete(blog.id)}>Delete</button>
  </div>
);
