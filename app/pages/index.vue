<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from "@nuxt/ui";
import { useRouter } from "#app";
import logoUrl from "../../public/light-logomark.png";
import z from "zod";

const { $supabase } = useNuxtApp();
const loading = ref(true);
const logged_in = ref(false);
const isHydrated = ref(false);

const { data, error } = await $supabase.auth.getSession();
if (data.session) {
  loading.value = false;
  logged_in.value = true;
} else {
  loading.value = false;

  if (error) {
    throw createError({ status: 404, message: "Data does not exists" });
  } else {
    logged_in.value = false;
  }
}
const nullUuid = "00000000-0000-0000-0000-000000000000";
const { data: userData, error: userError } = await $supabase
  .from("user")
  .select("*")
  .eq("uiUserId", data.session?.user.id || nullUuid);

if (userError) {
  throw createError({
    status: 500,
    message: "Something went wrong when querying user data",
  });
}

const displayData = userData[0];

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
          <div v-if="!logged_in">
            <UModal :ui="{ content: 'w-1/4' }">
              <UButton label="Login" color="neutral" variant="outline" />
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
          <div v-else>
            <UButton
              label="Dashboard"
              color="neutral"
              variant="outline"
              @click="navigateTo('/dashboard')"
            />
          </div>
        </template>
      </UHeader>
      <USeparator class="opacity-0 h-10" />
      <div class="max-w-lg mx-auto px-4">
        <UCard variant="subtle">
          <template #default>
            <div v-if="displayData !== undefined" class="flex flex-col p-2">
              <div v-if="loading || !isHydrated" class="w-24 h-24 mx-auto">
                <UAvatar
                  icon="i-lucide-hourglass"
                  size="3xl"
                  class="w-full h-full"
                />
              </div>
              <div v-else class="w-24 h-24 mx-auto">
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
                      {{ displayData.txFName }} {{ displayData.txLName }}
                    </div>
                  </div>
                  <div>
                    <div
                      v-for="(value, key, index) in displayData"
                      :key="`${key}-${index}-${String(value)}`"
                      class="flex justify-between"
                    >
                      <template v-if="keyMap[key] && value">
                        <div class="text-lg ltr">
                          {{ keyMap[key] }}
                        </div>

                        <div class="text-lg text-right rtl">
                          <template
                            v-if="key === 'txFName' || key === 'txLName'"
                          >
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

                          <template
                            v-else-if="key.toLowerCase().includes('url')"
                          >
                            <a
                              :href="
                                (value as string)?.startsWith('http')
                                  ? (value as string)
                                  : 'https://' + value
                              "
                              target="_blank"
                              class="text-blue-500 underline"
                            >
                              {{ value }}
                            </a>
                          </template>

                          <template v-else-if="keyMap[key]">
                            {{ value }}
                          </template>
                        </div>
                      </template>
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
            <div v-else-if="logged_in && !userData">
              <div class="text-xl text-center font-bold my-2">Trusynk</div>
              <div class="text-center">
                Visit the dashboard to add your card information
              </div>
            </div>
            <div v-else-if="!isHydrated">
              <div class="text-xl text-center font-bold my-2">Trusynk</div>
              <div class="text-center">Loading...</div>
            </div>
            <div v-else>
              <div class="text-xl text-center font-bold my-2">Trusynk</div>
              <div class="text-center">Log in to view your card</div>
            </div>
          </template>
        </UCard>
      </div>
    </div>
  </UApp>
</template>
