import { QueryClient } from "@tanstack/react-query";
import { supabase } from "../shared/services/supabaseClient";

export const queryClient = new QueryClient();

export async function bootstrap() {
  // Example: fetch initial session
  const { data: session } = await supabase.auth.getSession();
  return session;
}
