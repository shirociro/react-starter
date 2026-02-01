export type ServiceProvider = "supabase" | "firebase" | "express";

export const SERVICE_PROVIDER: ServiceProvider =
  import.meta.env.VITE_SERVICE_PROVIDER || "supabase";
