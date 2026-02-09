import { QueryClient } from "@tanstack/react-query";
import { supabaseClient } from "../shared/services/supabaseClient";

export const queryClient = new QueryClient();

export async function bootstrap() {
  const { data: session } = await supabaseClient.auth.getSession();
  return session;
}
