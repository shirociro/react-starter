import { supabase } from "../../../shared/services/supabaseClient";
import type { Blog } from "../types/blog.types";

export const blogService = {
  getAll: async (): Promise<Blog[]> => {
    const { data, error } = await supabase.from("blogs").select("*");
    if (error) throw new Error(error.message);
    return data as Blog[];
  },

  create: async (blog: Partial<Blog>): Promise<Blog> => {
    const { data, error } = await supabase.from("blogs").insert(blog).select().single();
    if (error) throw new Error(error.message);
    return data;
  },

  update: async (blog: Partial<Blog> & { id: string }): Promise<Blog> => {
    const { data, error } = await supabase.from("blogs").update(blog).eq("id", blog.id).select().single();
    if (error) throw new Error(error.message);
    return data;
  },

  remove: async (id: string) => {
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) throw new Error(error.message);
  },
};
