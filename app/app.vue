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
    <USeparator class="opacity-0 h-20" />
    <div class="max-w-3xl mx-auto px-4">
      <UCard variant="subtle">
        <template #default>
          <div class="flex flex-col p-2">
            <div class="self-center">
              <UAvatar alt="US" size="3xl" />
            </div>
            <h2 class="pt-2">Name : John Doe</h2>
            <p>Position : CEO</p>
            <p>Company : Doe n Co</p>
            <UButton> <div class="w-full text-center">Connect</div></UButton>
          </div>
        </template>
      </UCard>
    </div>
  </UApp>
</template>
