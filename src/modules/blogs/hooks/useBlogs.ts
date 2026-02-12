import { useState } from "react";
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { blogService } from "@/modules/blogs/services/blog.services.ts";
import type { Blog } from "@/modules/blogs/types/blog.types";

interface PaginatedBlogs {
  data: Blog[];
  total: number;
}

export const useBlogs = () => {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const queryKey = ["blogs", page, pageSize];

  const {
    data: blogs = { data: [], total: 0 },
    isLoading,
    refetch,
  } = useQuery<PaginatedBlogs>({
    queryKey,
    queryFn: () => blogService.getAll({ page, pageSize }),
     placeholderData: keepPreviousData,
    
  });

  const fetchBlogs = ({
    page: newPage,
    pageSize: newPageSize,
  }: {
    page?: number;
    pageSize?: number;
  }) => {
    if (newPage) setPage(newPage);
    if (newPageSize) setPageSize(newPageSize);
    return refetch();
  };

  // ---------------- ADD ----------------
  const addBlog = useMutation({
    mutationFn: blogService.create,

    onMutate: async (newBlog: Blog) => {
      await queryClient.cancelQueries({ queryKey });

      const previous = queryClient.getQueryData<PaginatedBlogs>(queryKey);

      // Optimistic update
      queryClient.setQueryData<PaginatedBlogs>(queryKey, (old) => {
        if (!old) return old;
        return {
          ...old,
          data: [{ ...newBlog, id: Date.now() }, ...old.data], // temp id
          total: old.total + 1,
        };
      });

      return { previous };
    },

    onError: (_err, _newBlog, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(queryKey, ctx.previous);
      }
    },

    onSuccess: (createdBlog) => {
      // Replace temp id with real id from server
      queryClient.setQueryData<PaginatedBlogs>(queryKey, (old) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.map((b) =>
            b.id === createdBlog.id || b.id === (createdBlog as any).id
              ? createdBlog
              : b
          ),
        };
      });
    },
  });

  // ---------------- UPDATE ----------------
  const updateBlog = useMutation({
    mutationFn: blogService.update,

    onMutate: async (updatedBlog: Blog) => {
      await queryClient.cancelQueries({ queryKey });

      const previous = queryClient.getQueryData<PaginatedBlogs>(queryKey);

      // Optimistic update
      queryClient.setQueryData<PaginatedBlogs>(queryKey, (old) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.map((b) =>
            b.id === updatedBlog.id ? { ...b, ...updatedBlog } : b
          ),
        };
      });

      return { previous };
    },

    onError: (_err, _updatedBlog, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(queryKey, ctx.previous);
      }
    },

    onSuccess: (serverBlog) => {
      // Update cache with server response
      queryClient.setQueryData<PaginatedBlogs>(queryKey, (old) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.map((b) =>
            b.id === serverBlog.id ? serverBlog : b
          ),
        };
      });
    },
  });

  // ---------------- DELETE ----------------
  const deleteBlog = useMutation({
    mutationFn: blogService.remove,

    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey });

      const previous = queryClient.getQueryData<PaginatedBlogs>(queryKey);

      // Optimistic update
      queryClient.setQueryData<PaginatedBlogs>(queryKey, (old) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.filter((b) => b.id !== id),
          total: old.total - 1,
        };
      });

      return { previous };
    },

    onError: (_err, _id, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(queryKey, ctx.previous);
      }
    },

    onSuccess: () => {
      // No need to refetch, optimistic already handled
    },
  });

  return {
    blogs,
    isLoading,
    fetchBlogs,
    addBlog,
    updateBlog,
    deleteBlog,
    page,
    pageSize,
  };
};
