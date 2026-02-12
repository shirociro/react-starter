import { SERVICE_PROVIDER } from "@/app/config";

import { supabaseClient } from "@/shared/services/supabaseClient";
import { firebaseAuthService } from "@/shared/services/firebaseClient";
import { expressAuthService } from "@/shared/services/expressClient";

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
