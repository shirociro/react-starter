import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { blogService } from "../services/blog.services.ts";

import type { Blog } from "../types/blog.types";

export const useBlogs = () => {
  const queryClient = useQueryClient();

  // useQuery: object style
  const { data: blogs, isLoading } = useQuery<Blog[]>({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });

  // useMutation: object style with onSuccess
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

  return { blogs, isLoading, addBlog, updateBlog, deleteBlog };
};
