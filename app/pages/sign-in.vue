<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from "@nuxt/ui";
import z, { config, email } from "zod";
import { createClient } from "@supabase/supabase-js";

const schema = z.object({
  password: z
    .string("Password is required")
    .min(8, "Must be at least 8 characters"),
  company: z
    .string("Company name is required")
    .length(80, "Max Length Exceeded"),
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

const config = useRuntimeConfig();
const supabase = createClient(
  config.public.supabaseUrl,
  config.public.supabaseAnonKey
);

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
      console.log(emailAddress);

      await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            company: data.company,
          },
        },
      });
    }
  } catch (error) {
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
        title="Register"
        description="Register your account with Google or use password"
        :fields="fields"
        :providers="providers"
        @submit="onSubmit"
      />
    </div>
  </UApp>
</template>
