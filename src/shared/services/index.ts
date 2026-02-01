import { SERVICE_PROVIDER } from "@/app/config";

import { supabaseClient } from "./supabaseClient";
import { firebaseAuthService } from "./firebaseClient";
import { expressAuthService } from "./expressClient";

export const authService = (() => {
  switch (SERVICE_PROVIDER) {
    case "firebase":
      return firebaseAuthService;
    case "express":
      return expressAuthService;
    case "supabase":
    default:
      return supabaseClient;
  }
})();
