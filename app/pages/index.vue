<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from "@nuxt/ui";
import { useRouter } from "#app";
import z from "zod";
const loading = ref(false);
const logged_in = ref(false);

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

const schema = z.object({
  email: z.email("Invalid email"),
});

type Schema = z.output<typeof schema>;

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  try {
    const router = useRouter();
    const { email } = payload.data;

    const params = new URLSearchParams();

    params.append("email", email);

    await router.push({ path: "/sign-in", query: Object.fromEntries(params) });
  } catch (error) {
    console.log(error);
  }
}
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
                @submit="onSubmit"
              />
            </div>
          </template>
        </UModal>
      </template>
    </UHeader>
    <USeparator class="opacity-0 h-20" />
    <div class="max-w-lg mx-auto px-4">
      <UCard variant="subtle">
        <template #default>
          <div class="flex flex-col p-2">
            <div class="w-24 h-24 self-center">
              <UAvatar alt="US" size="3xl" class="w-full h-full" />
            </div>
            <div class="flex justify-between">
              <div class="text-lg ltr">Name</div>
              <div v-if="loading" class="text-lg text-right rtl">
                Loading...
              </div>
              <div v-else class="text-lg text-right rtl">John Doe</div>
            </div>
            <div class="flex justify-between">
              <div class="text-lg ltr">Company</div>
              <div v-if="loading" class="text-lg text-right rtl">
                Loading...
              </div>
              <div v-else class="text-lg text-right rtl">Doe n Co</div>
            </div>
            <div class="flex justify-between">
              <div class="text-lg ltr">Contact</div>
              <div
                v-if="loading || !logged_in"
                class="w-30 h-7 bg-gray-300 blur-sm"
              />
              <div v-else class="text-lg">+62 8212 3456 7890</div>
            </div>
            <UButton class="my-3">
              <div class="w-full text-center text-lg">Connect</div></UButton
            >
          </div>
        </template>
      </UCard>
    </div>
  </UApp>
</template>
