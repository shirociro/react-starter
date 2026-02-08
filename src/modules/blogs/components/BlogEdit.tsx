import React, { useState } from "react";
import {
  Card,
  Button,
  TextInput,
  Textarea,
  Label,
  Tooltip,
} from "flowbite-react";
import { HiOutlineUpload, HiOutlineTrash } from "react-icons/hi";
import type { Blog } from "../types/blog.types";

interface Props {
  blog: Blog;
  onClose: () => void;
  onSave: (updatedBlog: Blog) => void;
}

const BlogEdit: React.FC<Props> = ({ blog, onClose, onSave }) => {
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const [image, setImage] = useState(blog.image);
  const [date] = useState(blog.date);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...blog, title, date, content, image });
  };

  return (
    <Card className="relative rounded-2xl shadow-2xl overflow-hidden">
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
        {/* Actions */}
        <div className="absolute bottom-4 right-4 z-10 flex gap-2">
          <Button type="button" className="bg-dark" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="bg-primary" size="md">
            Save
          </Button>
        </div>

        {/* Left – Image & Meta */}
        <div className="lg:w-5/12 flex flex-col gap-4 p-4">
          <div className="relative w-full h-64 lg:h-[420px] overflow-hidden rounded-lg bg-gray-100">
            <img
              src={image || "https://via.placeholder.com/420x300?text=No+Image"}
              alt={title}
              className="w-full h-full object-cover"
            />

            {/* Top-right icon buttons */}
            <div className="absolute top-2 right-2 flex gap-2">
              {/* Upload Icon */}
              <Tooltip content="Upload Image" placement="top">
                <label
                  htmlFor="image-upload"
                  className="bg-white p-2 rounded shadow cursor-pointer hover:bg-gray-100 flex items-center justify-center"
                >
                  <HiOutlineUpload className="w-5 h-5 text-gray-700" />
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </Tooltip>

              {/* Delete Icon */}
              <Tooltip content="Remove Image" placement="top">
                <button
                  type="button"
                  onClick={() => setImage("")}
                  className="bg-white p-2 rounded shadow hover:bg-gray-100 flex items-center justify-center"
                >
                  <HiOutlineTrash className="w-5 h-5 text-red-600" />
                </button>
              </Tooltip>
            </div>
          </div>

          {/* Title & Date */}
          <div className="flex flex-col gap-4 mt-2">
            <div>
              <Label
                htmlFor="title"
                className="text-dark text-lg font-semibold"
              >
                Title
              </Label>

              <TextInput
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                sizing="sm"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Right – Content */}
        <div className="lg:w-7/12 p-6 flex flex-col gap-4 overflow-y-auto max-h-[65vh] pe-3">
          <Label
            htmlFor="title"
            className="text-dark text-lg font-semibold pt-4 "
          >
            Description
          </Label>

          <Textarea
            id="description"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter blog content"
            rows={16}
            required
            className="w-full px-3  resize-none"
          />
        </div>
      </form>
    </Card>
  );
};

export default BlogEdit;
