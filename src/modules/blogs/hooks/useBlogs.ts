import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { blogService } from "../services/blog.services.ts";

import type { Blog } from "../types/blog.types";

interface PaginatedBlogs {
  data: Blog[];
  total: number;
}

export const useBlogs = () => {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const {
    data: blogs = { data: [], total: 0 },
    isLoading,
    refetch,
  } = useQuery<PaginatedBlogs>({
    queryKey: ["blogs", page, pageSize],
    queryFn: () => blogService.getAll({ page, pageSize }),
    keepPreviousData: true, // smooth pagination
  });

  // Helper to fetch specific page
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

  const addBlog = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });

  const updateBlog = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });

  const deleteBlog = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
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
