<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from "@nuxt/ui";
import { useRouter } from "#app";
import logoUrl from "../../public/light-logomark.png";
import z from "zod";
const { $supabase } = useNuxtApp();
const loading = ref(true);

const isHydrated = ref(false);

// TODO : refactor to dynamic ID
const { data, error } = await $supabase.auth.getSession();
if (data.session) {
  loading.value = false;
} else {
  loading.value = false;

  if (error) {
    console.log(error);
  } else {
    console.log("No user logged in");
  }
}

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

const dbValueLogin = {
  txFName: "Andrew",
  txLName: "V",
  txBusinessName: "Trusynk",
  txEmail: "connect@trusynk.com",
  txPhoneNumber: "+6287788895099",
  txWebsiteUrl: "www.trusynk.com",
  txInstagramURL: "instagram.com/trusynk",
  txLinkedinURL: "linkedin.com/company/trusynk",
  txFacebookURL: "facebook.com/trusynk",
  txThreadsURL: undefined,
};

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

onMounted(() => {
  isHydrated.value = true;
});

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  const router = useRouter();
  const toast = useToast();

  try {
    const { email } = payload.data;

    const params = new URLSearchParams();

    params.append("email", email);
    const res = await $fetch(`/api/check-email?${params.toString()}`, {
      method: "get",
    });
    console.log(res);
    if ("exist" in res) {
      if (res.exist) {
        await router.push({
          path: "/login",
          query: Object.fromEntries(params),
        });
      } else {
        await router.push({
          path: "/sign-in",
          query: Object.fromEntries(params),
        });
      }
    } else {
      toast.add({ title: "Incorrect Response" });
    }
  } catch (error) {
    toast.add({ title: "Something Went Wrong" });
    console.log(error);
  }
}
</script>

<template>
  <UApp>
    <div class="" style="background-color: #fcfdfe">
      <UHeader>
        <template #title> Trusynk </template>

        <template #right>
          <UButton
            label="Dashboard"
            color="neutral"
            variant="outline"
            @click="navigateTo('/dashboard')"
          />
        </template>
      </UHeader>
      <USeparator class="opacity-0 h-10" />
      <div class="max-w-lg mx-auto px-4">
        <UCard variant="subtle">
          <template #default>
            <div class="flex flex-col p-2">
              <div v-if="loading || !isHydrated" class="w-24 h-24 self-center">
                <UAvatar
                  icon="i-lucide-hourglass"
                  size="3xl"
                  class="w-full h-full"
                />
              </div>
              <div v-else class="w-24 h-24 self-center">
                <UAvatar
                  :src="logoUrl"
                  alt="T"
                  size="3xl"
                  class="w-full h-full"
                />
              </div>
              <div v-if="!isHydrated" class="flex justify-center text-lg mt-2">
                Loading...
              </div>
              <div v-else>
                <div v-if="loading" class="flex justify-center my-2">
                  Loading data....
                </div>
                <div v-else>
                  <div class="flex justify-between">
                    <div class="text-lg ltr">Name</div>
                    <div class="text-lg text-right rtl">
                      {{ dbValueLogin.txFName }} {{ dbValueLogin.txLName }}
                    </div>
                  </div>
                  <div>
                    <div
                      v-for="(value, key, index) in dbValueLogin"
                      :key="`${key}-${index}-${String(value)}`"
                      class="flex justify-between"
                    >
                      <div
                        v-if="dbValueLogin[key] !== undefined"
                        class="text-lg ltr"
                      >
                        {{ keyMap[key] }}
                      </div>

                      <div class="text-lg text-right rtl">
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
                          <a
                            :href="`tel:${value}`"
                            class="text-blue-500 underline"
                            >{{ value }}</a
                          >
                        </template>

                        <template v-else-if="key.toLowerCase().includes('url')">
                          <a
                            :href="
                              value?.startsWith('http')
                                ? value
                                : 'https://' + value
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
                  </div>
                </div>
              </div>
              <div class="my-2">
                <div>
                  <UButton
                    style="background-color: #002fbd; color: #fcfdfe"
                    class="w-full text-lg"
                  >
                    <div class="w-full text-center">Connect</div></UButton
                  >
                </div>
              </div>
            </div>
          </template>
        </UCard>
      </div>
    </div>
  </UApp>
</template>
