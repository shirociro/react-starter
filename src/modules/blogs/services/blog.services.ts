import { supabaseClient } from "../../../shared/services/supabaseClient";
import type { Blog } from "../types/blog.types";

export const blogService = {
  getAll: async ({
    page = 1,
    pageSize = 6,
  }: {
    page?: number;
    pageSize?: number;
  } = {}): Promise<{ data: Blog[]; total: number }> => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    // select with exact count
    const { data, error, count } = await supabaseClient
      .from("blogs")
      .select("*", { count: "exact" })
      .order("id", { ascending: false })
      .range(from, to);

    if (error) throw new Error(error.message);

    return {
      data: data as Blog[],
      total: count ?? 0,
    };
  },

  create: async (blog: Partial<Blog>): Promise<Blog> => {
    const { data, error } = await supabaseClient
      .from("blogs")
      .insert(blog)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  update: async (blog: Partial<Blog> & { id: number }): Promise<Blog> => {
    const { data, error } = await supabaseClient
      .from("blogs")
      .update(blog)
      .eq("id", blog.id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  remove: async (id: number) => {
    const { error } = await supabaseClient.from("blogs").delete().eq("id", id);
    if (error) throw new Error(error.message);
  },
};
