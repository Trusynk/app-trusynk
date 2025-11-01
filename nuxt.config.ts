// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  googleSignIn: {
    clientId:
      "795700120323-t27o7g20ed5bvbqmje97s0kmhip9bcsl.apps.googleusercontent.com",
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@nuxt/ui",
    "nuxt-vue3-google-signin",
  ],
  // plugins: ["~/plugins/google_client.client.ts"],
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    },
  },
  vite: {
    build: {
      sourcemap: true,
    },
    plugins: [tailwindcss()],
  },

  nitro: {
    sourceMap: true,
  },
});
