import React from "react";
import { useNavigate } from "react-router-dom";
import { useBlogs } from "../hooks/useBlogs";
import { BlogCard } from "../components/BlogCard";

export const BlogListPage = () => {
  const { blogs, isLoading, deleteBlog } = useBlogs();
  const navigate = useNavigate();

  if (isLoading) return <p>Loading blogs...</p>;

  return (
    <div>
      <h2>Blogs</h2>
      <button className="btn btn-success mb-3" onClick={() => navigate("/blogs/create")}>Create Blog</button>
      {blogs?.map((b) => (
        <BlogCard key={b.id} blog={b} onDelete={(id) => deleteBlog.mutate(id)} />
      ))}
    </div>
  );
};
