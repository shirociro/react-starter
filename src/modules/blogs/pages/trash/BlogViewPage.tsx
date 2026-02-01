import React from "react";
import { useParams } from "react-router-dom";
import { useBlogs } from "../hooks/useBlogs";

export const BlogViewPage = () => {
  const { blogs } = useBlogs();
  const { id } = useParams<{ id: string }>();

  const blog = blogs?.find((b) => b.id === id);

  if (!blog) return <p>Blog not found</p>;

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
    </div>
  );
};
