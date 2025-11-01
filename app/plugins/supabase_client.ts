import { createClient } from "@supabase/supabase-js";
import type { Database } from "../../types/supabase";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const supabase = createClient<Database, "DtTS">(
    config.public.supabaseUrl,
    config.public.supabaseAnonKey,
    {
      db: {
        schema: "DtTS",
      },
    }
  );
  return {
    provide: {
      supabase: supabase,
    },
  };
});
