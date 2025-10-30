<script setup lang="ts">
import z from "zod";

const isHydrated = ref(false);

const nullify = <T extends z.ZodTypeAny>(schema: T) =>
  schema.transform((v) => (v === "" ? null : v));

const { $supabase } = useNuxtApp();
const nullifyableUrl = z
  .string()
  .transform((v) => (v === "" ? null : v))
  .nullable()
  .refine((v) => v === null || z.url().safeParse(v).success, {
    message: "Invalid URL",
  });

const open = ref(false);
const modalOpen = ref(false);
const toast = useToast();

const { data, error } = await $supabase.auth.getUser();
console.log(data);
if (error) {
  console.log(error);
}
const schema = z.object({
  txFName: z.string().max(80),
  txLName: z.string().max(80),
  txBusinessName: z.string().max(180),
  txEmail: z.email("Invalid email"),
  txPhoneNumber: nullify(z.string().max(16)).nullable(),
  txWebsiteURL: nullifyableUrl,
  txInstagramURL: nullifyableUrl,
  txLinkedInURL: nullifyableUrl,
  txFacebookURL: nullifyableUrl,
  txThreadsURL: nullifyableUrl,
});

type Schema = z.infer<typeof schema>;

let state = reactive({
  txFName: "",
  txLName: "",
  txBusinessName: data.user?.user_metadata.company,
  txEmail: data.user?.email,
  txPhoneNumber: "",
  txWebsiteURL: "",
  txInstagramURL: "",
  txLinkedInURL: "",
  txFacebookURL: "",
  txThreadsURL: "",
});

if (data) {
  const { data: userData, error: userError } = await $supabase
    .from("user")
    .select("*")
    .eq("cuPublicID", data.user?.user_metadata.public_id);

  if (userError) {
    console.log(userError);
  }

  if (userData && userData.length > 0 && userData[0]) {
    const supabaseState = userData[0];
    delete supabaseState.cuPublicID;
    state = supabaseState;
  }
}

onMounted(() => {
  isHydrated.value = true;
});

async function onSubmit() {
  const { error } = await $supabase
    .from("user")
    .upsert({ ...state, cuPublicID: data.user?.user_metadata.public_id })
    .eq("cuPublicID", data.user?.user_metadata.public_id);
  if (error) console.log(error);
}
async function logout() {
  const { error } = await $supabase.auth.signOut();
  if (error) {
    toast.add({ title: "Something Went Wrong" });
  } else {
    navigateTo("/", { replace: true });
  }
}
</script>

<template>
  <UApp>
    <UHeader>
      <template #title> Trusynk </template>

      <template #right>
        <UModal
          v-model:open="open"
          :ui="{ content: 'w-1/4', footer: 'justify-end' }"
          title="Confirmation"
        >
          <UButton label="Logout" color="neutral" variant="outline" />
          <template #body> Are you sure you want to log off </template>
          <template #footer="{ close }">
            <UButton
              label="Cancel"
              color="neutral"
              variant="outline"
              @click="close"
            />
            <UButton label="Log off" color="error" @click="logout" />
          </template>
        </UModal>
      </template>
    </UHeader>
    <div v-if="isHydrated" class="text-center mt-4">
      Your Trusynk Link is on trusynk.com/profile/{{
        data.user?.user_metadata.public_id
      }}
    </div>
    <div v-else class="text-center mt-4">Hold on we are still loading</div>
    <div class="flex items-center justify-evenly mt-6">
      <UCard>
        <template #header> Configure your profile</template>
        <template #default>
          Wanna update your info? Click this button to configure your
          profile</template
        >
        <template #footer>
          <UModal v-model:open="modalOpen" title="Add your Info">
            <UButton label="Configure" />

            <template #body="{ close }">
              <UForm
                :schema="schema"
                :state="state"
                class="space-y-4"
                @submit="onSubmit"
              >
                <UFormField label="First Name" name="txFName">
                  <UInput
                    v-model="state.txFName"
                    class="w-full"
                    placeholder="John"
                  />
                </UFormField>
                <UFormField label="Last Name" name="txLName">
                  <UInput
                    v-model="state.txLName"
                    class="w-full"
                    placeholder="Doe"
                  />
                </UFormField>
                <UFormField label="Business Name" name="txBusinessName">
                  <UInput
                    v-model="state.txBusinessName"
                    class="w-full"
                    placeholder="Trusynk"
                  />
                </UFormField>
                <UFormField label="Email" name="txEmail">
                  <UInput
                    v-model="state.txEmail"
                    type="email"
                    class="w-full"
                    placeholder="john@doenco.com"
                  />
                </UFormField>
                <UFormField label="Phone Number" name="txPhoneNumber">
                  <UInput
                    v-model="state.txPhoneNumber"
                    type="tel"
                    class="w-full"
                    placeholder="081234567890"
                  />
                </UFormField>
                <UFormField label="Website" name="txWebsiteURL">
                  <UInput
                    v-model="state.txWebsiteURL"
                    type="url"
                    class="w-full"
                    placeholder="www.example.com"
                  />
                </UFormField>
                <UFormField label="Instagram Link" name="txInstagramURL">
                  <UInput
                    v-model="state.txInstagramURL"
                    type="url"
                    class="w-full"
                    placeholder="www.example.com"
                  />
                </UFormField>
                <UFormField label="Linkedin Link" name="txLinkedInURL">
                  <UInput
                    v-model="state.txLinkedInURL"
                    type="url"
                    class="w-full"
                    placeholder="www.example.com"
                  />
                </UFormField>
                <UFormField label="Facebook Link" name="txFacebookURL">
                  <UInput
                    v-model="state.txFacebookURL"
                    type="url"
                    class="w-full"
                    placeholder="www.example.com"
                  />
                </UFormField>
                <UFormField label="Threads Link" name="txThreadsURL">
                  <UInput
                    v-model="state.txThreadsURL"
                    type="url"
                    class="w-full"
                    placeholder="www.example.com"
                  />
                </UFormField>
                <!-- <div class="flex justify-end"> -->
                <UButton
                  label="Cancel"
                  color="neutral"
                  variant="outline"
                  @click="close"
                />
                <UButton class="ml-2" label="Submit" type="submit" />
                <!-- </div> -->
              </UForm>
            </template>
          </UModal>
        </template>
      </UCard>
      <UCard>
        <template #header> Buy the Card</template>
        <template #default> Intrested on Trusynk cards?</template>
        <template #footer><UButton> Buy Now </UButton></template>
      </UCard>
    </div>
  </UApp>
</template>
