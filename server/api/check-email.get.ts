import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const query = getQuery(event);
  // TODO : use rpc instead to not worry about pagination
  const { data, error } = await supabase.auth.admin.listUsers();
  if (error) return { error: 500 };

  const condition = data.users.some((u) => u.email === query.email);

  return { exist: condition };
});
