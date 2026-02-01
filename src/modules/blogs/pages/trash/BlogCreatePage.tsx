// import React from "react";
// import { BlogForm } from "../../components/BlogForm";
// import { useBlogs } from "../../hooks/useBlogs";
// import { useNavigate } from "react-router-dom";

// export const BlogCreatePage = () => {
//   const { addBlog } = useBlogs();
//   const navigate = useNavigate();

//   const handleSubmit = async (data: any) => {
//     await addBlog.mutateAsync(data);
//     navigate("/"); // Redirect to list
//   };

//   return (
//     <div>
//       <h2>Create Blog</h2>
//       <BlogForm onSubmit={handleSubmit} />
//     </div>
//   );
// };
