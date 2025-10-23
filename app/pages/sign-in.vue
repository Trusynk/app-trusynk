<script setup lang="ts">
import type { AuthFormField } from "@nuxt/ui";

const fields: AuthFormField[] = [
  {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Enter your password",
    required: true,
  },
  {
    name: "company",
    type: "text",
    label: "Company",
    placeholder: "Trusynk",
    required: true,
  },
];

const providers = [
  {
    label: "Google",
    icon: "i-simple-icons-google",
    onClick: () => {
      console.log("unimplemented");
    },
  },
];
</script>

<template>
  <UApp>
    <UHeader>
      <template #title> Trusynk </template>
    </UHeader>
    <div
      class="flex flex-col items-center justify-center gap-4 p-4 max-w-lg mx-auto"
    >
      <UAuthForm
        title="Register"
        description="Register your account with Google or use password"
        :fields="fields"
        :providers="providers"
      />
    </div>
  </UApp>
</template>
