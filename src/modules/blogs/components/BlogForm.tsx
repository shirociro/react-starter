import React, { useState } from "react";
import type { Blog } from "../types/blog.types";


interface BlogFormProps {
  initialData?: Partial<Blog>;
  onSubmit: (data: Partial<Blog>) => void;
}

export const BlogForm = ({ initialData, onSubmit }: BlogFormProps) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Title</label>
        <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label>Content</label>
        <textarea className="form-control" value={content} onChange={(e) => setContent(e.target.value)} required />
      </div>
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  );
};
