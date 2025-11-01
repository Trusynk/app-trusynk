<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from "@nuxt/ui";
import z from "zod";
const { $supabase } = useNuxtApp();

const schema = z.object({
  password: z
    .string("Password is required")
    .min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

const fields: AuthFormField[] = [
  {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Enter your password",
    required: true,
  },
];

const route = useRoute();
const toast = useToast();
const emailAddress = route.query.email;

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  const data = { email: "", ...payload.data };

  try {
    if (
      emailAddress === null ||
      emailAddress === undefined ||
      emailAddress === ""
    ) {
      toast.add({ title: "Email Error", description: "Email is missing" });
    } else {
      data.email = emailAddress.toString() ?? "";

      await $supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      navigateTo("/");
    }
  } catch (error) {
    toast.add({ title: "Something went wrong" });
    console.log(error);
  }
}
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
        title="Login"
        description="Enter your Password"
        :fields="fields"
        @submit="onSubmit"
      />
    </div>
  </UApp>
</template>
