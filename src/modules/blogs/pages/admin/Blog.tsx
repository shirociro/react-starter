import { useState } from "react";
import { useDispatch } from "react-redux";
import BlogGrid from "../../components/BlogGrid";
import BlogFullscreen from "../../components/BlogFullscreen";
import BlogEdit from "../../components/BlogEdit";
import { useBlogs } from "../../hooks/useBlogs";
import Pagination from "../../../../shared/components/Pagination";
import Loading from "../../../../shared/components/Loading";
import { startDeleting, finishDeleting } from "../../stores/blog.slice";

import type { Blog } from "../../types/blog.types";

const BlogPage = () => {
  const dispatch = useDispatch();
  const [view, setView] = useState<ViewState>({ mode: "grid" });
  const {
    blogs = { data: [], total: 0 },
    isLoading,
    fetchBlogs,
    deleteBlog,
    updateBlog,
  } = useBlogs();
  const pageSize = 4;

  if (isLoading) return <Loading text="Fetching blogs..." size="xl" />;

  const selectedBlog = view.mode !== "grid" ? blogs.data[view.index] : null;

  const goToPage = (page: number) => fetchBlogs({ page, pageSize });

  const handleSaveEdit = async (updatedBlog: Blog) => {
    if (!selectedBlog) return;

    await updateBlog.mutateAsync(updatedBlog);
    fetchBlogs({ page: 1, pageSize }); // refresh first page after update
    setView({ mode: "grid" });
  };

  const handleDelete = (index: number) => {
    const blog = blogs.data[index];
    if (!blog) return;
    const id = blog.id;
    dispatch(startDeleting(id));
    setTimeout(async () => {
      await deleteBlog.mutateAsync(id);
      fetchBlogs({ page: 1, pageSize });
      dispatch(finishDeleting(id));
    }, 300);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-20 lg:py-[120px] w-full">
      <div className="container-fluid mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="mb-4 text-3xl font-extrabold dark:text-white sm:text-4xl md:text-5xl">
            {view.mode === "grid"
              ? "Blogs"
              : view.mode === "edit"
                ? "Edit Blog"
                : ""}
          </h2>
        </div>

        {view.mode === "grid" && (
          <BlogGrid
            blogs={blogs.data}
            onExpand={(index) => setView({ mode: "fullscreen", index })}
            onEdit={(index) => setView({ mode: "edit", index })}
            onDelete={handleDelete}
          />
        )}

        {view.mode === "fullscreen" && selectedBlog && (
          <BlogFullscreen
            blog={selectedBlog}
            onClose={() => setView({ mode: "grid" })}
          />
        )}

        {view.mode === "edit" && selectedBlog && (
          <BlogEdit
            blog={selectedBlog}
            onClose={() => setView({ mode: "grid" })}
            onSave={handleSaveEdit}
          />
        )}

        {view.mode === "grid" && blogs.total > 0 && (
          <Pagination
            totalItems={blogs.total}
            pageSize={pageSize}
            storageKey="blogList"
            onPageChange={goToPage}
          />
        )}
      </div>
    </section>
  );
};

type ViewState =
  | { mode: "grid" }
  | { mode: "fullscreen"; index: number }
  | { mode: "edit"; index: number };

export default BlogPage;
