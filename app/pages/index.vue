<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from "@nuxt/ui";
import { useRouter } from "#app";
import z from "zod";
const loading = ref(false);
const logged_in = ref(true);

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

const dbValueNonLogin = {
  txFName: "John",
  txLName: "Doe",
  txBusinessName: "Doe n Co",
};

const dbValueLogin = {
  txFName: "John",
  txLName: "Doe",
  txBusinessName: "Doe n Co",
  txEmail: "johndoe@doenco.com",
  txPhoneNumber: "123456789",
  txWebsiteUrl: "www.example.com",
  txInstagramURL: "www.example.com",
  txLinkedinURL: "www.example.com",
  txFacebookURL: "www.example.com",
  txThreadsURL: "www.example.com",
};

let valueSkeleton: Record<string, string | undefined> = {};

if (logged_in.value) {
  valueSkeleton = dbValueLogin;
} else {
  valueSkeleton = dbValueNonLogin;
}
const keyMap: Record<string, string> = {
  txBusinessName: "Business Name",
  txEmail: "Email Address",
  txPhoneNumber: "Phone Number",
  txWebsiteUrl: "Website",
  txInstagramURL: "Instagram",
  txLinkedinURL: "Linkedin",
  txFacebookURL: "Facebook",
  txThreadsURL: "Threads",
};

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
        <div v-if="!logged_in">
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
        </div>
        <div v-else>
          <UButton label="Dashboard" color="neutral" variant="outline" />
        </div>
      </template>
    </UHeader>
    <USeparator class="opacity-0 h-10" />
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
              <div v-else class="text-lg text-right rtl">
                {{ valueSkeleton.txFName }} {{ valueSkeleton.txLName }}
              </div>
            </div>
            <div
              v-for="(value, key) in valueSkeleton"
              :key="key"
              class="flex justify-between"
            >
              <div v-if="valueSkeleton[key] !== undefined" class="text-lg ltr">
                {{ keyMap[key] }}
              </div>

              <div v-if="loading" class="text-lg text-right rtl">
                Loading...
              </div>

              <div v-else class="text-lg text-right rtl">
                <template v-if="key === 'txFName' || key === 'txLName'">
                  <!-- ignore case -->
                </template>

                <template v-else-if="key === 'txEmail'">
                  <a
                    :href="`mailto:${value}`"
                    class="text-blue-500 underline"
                    >{{ value }}</a
                  >
                </template>

                <template v-else-if="key === 'txPhoneNumber'">
                  <a :href="`tel:${value}`" class="text-blue-500 underline">{{
                    value
                  }}</a>
                </template>

                <template v-else-if="key.toLowerCase().includes('url')">
                  <a
                    :href="
                      value?.startsWith('http') ? value : 'https://' + value
                    "
                    target="_blank"
                    class="text-blue-500 underline"
                  >
                    {{ value }}
                  </a>
                </template>

                <template v-else>
                  {{ value }}
                </template>
              </div>
            </div>
            <div v-if="!logged_in" class="flex justify-between">
              <div class="text-lg ltr">Contact</div>
              <div class="w-30 h-7 bg-gray-300 blur-sm" />
            </div>
            <div class="my-2">
              <div v-if="logged_in">
                <UButton class="w-full text-lg">
                  <div class="w-full text-center">Connect</div></UButton
                >
              </div>
              <div v-else>
                <UModal :ui="{ content: 'w-1/4' }">
                  <UButton class="w-full text-lg">
                    <div class="w-full text-center">Connect</div></UButton
                  >
                  <template #content>
                    <div
                      class="flex flex-col items-center justify-center gap-4 p-4"
                    >
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
              </div>
            </div>
          </div>
        </template>
      </UCard>
    </div>
  </UApp>
</template>
