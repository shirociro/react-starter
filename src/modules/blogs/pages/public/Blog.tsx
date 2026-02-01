import React, { useState } from "react";
import BlogGrid from "./BlogGrid";
import BlogFullscreen from "./BlogFullscreen";

export interface BlogType {
  date: string;
  title: string;
  description: string;
  image: string;
}

const blogs: BlogType[] = [
  {
    date: "Dec 22, 2023",
    title: "Meet AutoManage, the best AI management tools",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ".repeat(
        100,
      ),
    image:
      "https://cdn.tailgrids.com/assets/images/application/blogs/blog-01/image-01.jpg",
  },
  {
    date: "Dec 22, 2023",
    title: "Meet AutoManage, the best AI management tools",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ".repeat(
        10,
      ),
    image:
      "https://cdn.tailgrids.com/assets/images/application/blogs/blog-01/image-02.jpg",
  },
  {
    date: "Dec 22, 2023",
    title: "Meet AutoManage, the best AI management tools",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ".repeat(
        10,
      ),
    image:
      "https://cdn.tailgrids.com/assets/images/application/blogs/blog-01/image-03.jpg",
  },
];

const Blog = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-20 lg:py-[120px] w-full">
      <div className="container-fluid mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="mb-4 text-3xl font-extrabold dark:text-white sm:text-4xl md:text-5xl">
            Recent Blogs
          </h2>
        </div>

        {/* View switch */}
        {expandedIndex !== null ? (
          <BlogFullscreen
            blog={blogs[expandedIndex]}
            onClose={() => setExpandedIndex(null)}
          />
        ) : (
          <BlogGrid
            blogs={blogs}
            onExpand={(index) => setExpandedIndex(index)}
          />
        )}
      </div>
    </section>
  );
};

export default Blog;
