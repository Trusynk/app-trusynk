<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from "@nuxt/ui";
import z from "zod";
const { $supabase } = useNuxtApp();

// TODO : add google login

const schema = z.object({
  password: z
    .string("Password is required")
    .min(8, "Must be at least 8 characters"),
  username: z
    .string("Username is required")
    .regex(/^[A-Za-z0-9\-_.~]+$/, "Must be URL Safe")
    .length(40, "Max Length Exceeded"),
  company: z
    .string("Company name is required")
    .length(80, "Max Length Exceeded"),
});

const toast = useToast();

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
    name: "username",
    type: "text",
    label: "Username",
    placeholder: "Enter your username (no spaces and special character)",
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

const route = useRoute();
const emailAddress = route.query.email;

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  const uploadData = { email: "", ...payload.data };

  try {
    if (
      emailAddress === null ||
      emailAddress === undefined ||
      emailAddress === ""
    ) {
      toast.add({ title: "Email Error", description: "Email is missing" });
    } else {
      uploadData.email = emailAddress.toString() ?? "";

      const { data, error } = await $supabase
        .from("user")
        .select("txUsername")
        .eq("txUsername", uploadData.username);

      if (error) {
        toast.add({ title: "Something went wrong" });
        console.log(error);
      } else if (data.length > 0) {
        toast.add({ title: "Username already taken!" });
      } else {
        const { error } = await $supabase.auth.signUp({
          email: uploadData.email,
          password: uploadData.password,
          options: {
            data: {
              company: uploadData.company,
              username: uploadData.username,
            },
          },
        });
        if (error) {
          toast.add({ title: "Something went wrong" });
          console.log(error);
        } else {
          toast.add({ title: "Check Your email for confirmation!" });
        }
      }
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
        title="Register"
        description="Register your account with Google or use password"
        :fields="fields"
        :providers="providers"
        @submit="onSubmit"
      />
    </div>
  </UApp>
</template>
