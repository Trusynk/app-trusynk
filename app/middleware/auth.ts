export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $supabase } = useNuxtApp();
  const { data } = await $supabase.auth.getUser();
  if (!data.user) {
    return navigateTo("/");
  }
});
