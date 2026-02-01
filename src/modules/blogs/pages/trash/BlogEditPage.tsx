import React, { useEffect, useState } from "react";
import { useBlogs } from "../hooks/useBlogs";
import { BlogForm } from "../components/BlogForm";
import { useParams, useNavigate } from "react-router-dom";

export const BlogEditPage = () => {
  const { blogs, updateBlog } = useBlogs();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    const selected = blogs?.find((b) => b.id === id);
    if (selected) setBlog(selected);
  }, [blogs, id]);

  if (!blog) return <p>Loading...</p>;

  const handleSubmit = async (data: any) => {
    await updateBlog.mutateAsync({ id, ...data });
    navigate("/");
  };

  return (
    <div>
      <h2>Edit Blog</h2>
      <BlogForm initialData={blog} onSubmit={handleSubmit} />
    </div>
  );
};
