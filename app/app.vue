<script setup lang="ts">
import type { AuthFormField } from "@nuxt/ui";

const fields: AuthFormField[] = [
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Enter your email",
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

      <template #right>
        <UModal :ui="{ content: 'w-1/4' }">
          <UButton label="Login" color="neutral" variant="outline" />
          <template #content>
            <div class="flex flex-col items-center justify-center gap-4 p-4">
              <UAuthForm
                title="Login"
                description="Log in with Google or Insert your email"
                :fields="fields"
                :providers="providers"
              />
            </div>
          </template>
        </UModal>
      </template>
    </UHeader>
  </UApp>
</template>
