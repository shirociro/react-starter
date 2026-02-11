// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import BlogGrid from "../../components/BlogGrid";
// import BlogFullscreen from "../../components/BlogFullscreen";
// import BlogEdit from "../../components/BlogEdit";
// import { useBlogs } from "../../hooks/useBlogs";
// import Pagination from "../../../../shared/components/Pagination";
// import Loading from "../../../../shared/components/Loading";
// import { startDeleting, finishDeleting } from "../../stores/blog.slice";

// import type { Blog } from "../../types/blog.types";

// const BlogPage = () => {
//   const dispatch = useDispatch();
//   const [view, setView] = useState<ViewState>({ mode: "grid" });
//   const [toastMessage, setToastMessage] = useState<string | null>(null); // Toast state

//   const {
//     blogs = { data: [], total: 0 },
//     isLoading,
//     fetchBlogs,
//     deleteBlog,
//     updateBlog,
//   } = useBlogs();

//   const pageSize = 4;

//   if (isLoading) return <Loading text="Fetching blogs..." size="xl" />;

//   const selectedBlog = view.mode !== "grid" ? blogs.data[view.index] : null;

//   // ---------------- Pagination ----------------
//   const goToPage = (page: number) => fetchBlogs({ page, pageSize });

//   // ---------------- Handlers ----------------
//   const handleSaveEdit = async (updatedBlog: Blog) => {
//     if (!selectedBlog) return;

//    await updateBlog.mutateAsync(updatedBlog, {
//     onError: () => {
//       setToastMessage("Failed to update blog. Please try again.");
//       setTimeout(() => setToastMessage(null), 3000);
//     },
//   });

//     // Show success toast
//     setToastMessage("Blog updated successfully!");
//     setTimeout(() => setToastMessage(null), 3000);

//     setView({ mode: "grid" });
//   };

//   const handleDelete = (index: number) => {
//     const blog = blogs.data[index];
//     if (!blog) return;
//     const id = blog.id;

//     dispatch(startDeleting(id));

//     setTimeout(async () => {
//       await deleteBlog.mutateAsync(id, {
//         onError: () => {
//           setToastMessage("Failed to delete blog. Please try again.");
//           setTimeout(() => setToastMessage(null), 3000);
//         },
//       });
//       dispatch(finishDeleting(id));

//       // Show success toast
//       setToastMessage("Blog deleted successfully!");
//       setTimeout(() => setToastMessage(null), 3000);
//     }, 300);
//   };

//   return (
//     <section className="bg-gray-50 dark:bg-gray-900 py-20 lg:py-[120px] w-full">
//       <div className="container-fluid mx-auto px-4">
//         <div className="text-center max-w-4xl mx-auto mb-16">
//           <h2 className="mb-4 text-3xl font-extrabold dark:text-white sm:text-4xl md:text-5xl">
//             {view.mode === "grid"
//               ? "Blogs"
//               : view.mode === "edit"
//               ? "Edit Blog"
//               : ""}
//           </h2>
//         </div>

//         {view.mode === "grid" && (
//           <BlogGrid
//             blogs={blogs.data}
//             onExpand={(index) => setView({ mode: "fullscreen", index })}
//             onEdit={(index) => setView({ mode: "edit", index })}
//             onDelete={handleDelete}
//           />
//         )}

//         {view.mode === "fullscreen" && selectedBlog && (
//           <BlogFullscreen
//             blog={selectedBlog}
//             onClose={() => setView({ mode: "grid" })}
//           />
//         )}

//         {view.mode === "edit" && selectedBlog && (
//           <BlogEdit
//             blog={selectedBlog}
//             onClose={() => setView({ mode: "grid" })}
//             onSave={handleSaveEdit}
//           />
//         )}

//         {view.mode === "grid" && blogs.total > 0 && (
//           <Pagination
//             totalItems={blogs.total}
//             pageSize={pageSize}
//             onPageChange={goToPage}
//           />
//         )}
//       </div>

//       {/* ---------------- Toast Notification ---------------- */}
//       {toastMessage && (
//         <div className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 animate-slide-in">
//           {toastMessage}
//         </div>
//       )}
//     </section>
//   );
// };



// type ViewState =
//   | { mode: "grid" }
//   | { mode: "fullscreen"; index: number }
//   | { mode: "edit"; index: number };

// export default BlogPage;

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

// Toast type
type Toast = {
  id: number;
  type: "success" | "error";
  message: string;
};

const BlogPage = () => {
  const dispatch = useDispatch();
  const [view, setView] = useState<ViewState>({ mode: "grid" });
  const [toasts, setToasts] = useState<Toast[]>([]);

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

  // ---------------- Pagination ----------------
  const goToPage = (page: number) => fetchBlogs({ page, pageSize });

  // ---------------- Toast helpers ----------------
  const addToast = (type: "success" | "error", message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // ---------------- Handlers ----------------
  const handleSaveEdit = (updatedBlog: Blog) => {
    if (!selectedBlog) return;

    // Optimistic update handled in useBlogs
    updateBlog.mutate(updatedBlog, {
      onSuccess: () => addToast("success", "Blog updated successfully!"),
      onError: () => addToast("error", "Failed to update blog."),
    });

    // Immediately go back to grid (optimistic)
    setView({ mode: "grid" });
  };

  const handleDelete = (index: number) => {
    const blog = blogs.data[index];
    if (!blog) return;
    const id = blog.id;

    dispatch(startDeleting(id));

    // Optimistic: UI immediately reflects deletion
    deleteBlog.mutate(id, {
      onSuccess: () => addToast("success", "Blog deleted successfully!"),
      onError: () => addToast("error", "Failed to delete blog."),
      onSettled: () => dispatch(finishDeleting(id)),
    });
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

        {/* Grid view */}
        {view.mode === "grid" && (
          <BlogGrid
            blogs={blogs.data}
            onExpand={(index) => setView({ mode: "fullscreen", index })}
            onEdit={(index) => setView({ mode: "edit", index })}
            onDelete={handleDelete}
          />
        )}

        {/* Fullscreen view */}
        {view.mode === "fullscreen" && selectedBlog && (
          <BlogFullscreen
            blog={selectedBlog}
            onClose={() => setView({ mode: "grid" })}
          />
        )}

        {/* Edit view */}
        {view.mode === "edit" && selectedBlog && (
          <BlogEdit
            blog={selectedBlog}
            onClose={() => setView({ mode: "grid" })}
            onSave={handleSaveEdit}
          />
        )}

        {/* Pagination */}
        {view.mode === "grid" && blogs.total > 0 && (
          <Pagination
            totalItems={blogs.total}
            pageSize={pageSize}
            onPageChange={goToPage}
          />
        )}

        {/* Toast notifications */}
        <div className="fixed bottom-5 right-5 flex flex-col gap-2 z-50">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`px-4 py-2 rounded shadow-lg text-white ${
                toast.type === "success" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {toast.message}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

type ViewState =
  | { mode: "grid" }
  | { mode: "fullscreen"; index: number }
  | { mode: "edit"; index: number };

export default BlogPage;
