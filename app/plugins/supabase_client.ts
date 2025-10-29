import { createClient } from "@supabase/supabase-js";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const supabase = createClient(
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
