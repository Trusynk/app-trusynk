<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import z from "zod";

const open = ref(false);
const modalOpen = ref(false);

const schema = z.object({
  txFName: z.string().max(80),
  txLName: z.string().max(80),
  txBusinessName: z.string().max(180),
  txEmail: z.email("Invalid email"),
  txPhonenumber: z.string().max(16),
  txWebsiteUrl: z.url("Invalid URL"),
  txInstagramURL: z.url("Invalid URL"),
  txLinkedinURL: z.url("Invalid URL"),
  txFacebookURL: z.url("Invalid URL"),
  txThreadsURL: z.url("Invalid URL"),
});

type Schema = z.infer<typeof schema>;

const state = reactive({
  txFName: "",
  txLName: "",
  txBusinessName: "",
  txEmail: "",
  txPhoneNumber: "",
  txWebsiteUrl: "",
  txInstagramURL: "",
  txLinkedinURL: "",
  txFacebookURL: "",
  txThreadsURL: "",
});

async function onSubmit(event: FormSubmitEvent<Schema>) {}
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
            <UButton label="Log off" color="error" />
          </template>
        </UModal>
      </template>
    </UHeader>
    <div class="flex items-center justify-evenly mt-6">
      <UCard>
        <template #header> Complete your profile</template>
        <template #default>
          Click This Button to complete your profile</template
        >
        <template #footer>
          <UModal v-model:open="modalOpen" title="Add your Info">
            <UButton label="Complete" />

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
                <UFormField label="Website" name="txWebsiteUrl">
                  <UInput
                    v-model="state.txWebsiteUrl"
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
                <UFormField label="Linkedin Link" name="txLinkedinURL">
                  <UInput
                    v-model="state.txLinkedinURL"
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
                <div class="flex justify-end">
                  <UButton
                    label="Cancel"
                    color="neutral"
                    variant="outline"
                    @click="close"
                  />
                  <UButton class="ml-2" label="Submit" />
                </div>
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
