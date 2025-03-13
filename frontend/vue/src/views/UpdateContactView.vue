<script setup lang="ts">
import BackButton from '@/components/BackButton.vue'
import ContactForm from '@/components/ContactForm.vue'
import { DELETE_CONTACT_MUTATION } from '@/mutations/contact'
import { GET_CONTACT_QUERY } from '@/queries/contact'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { Breadcrumb, Button, notification, Spin } from 'ant-design-vue'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const contactId = computed(() => route.params.id)

const { result, loading, error } = useQuery(
  GET_CONTACT_QUERY,
  () => ({ contactId: contactId.value }),
  { enabled: computed(() => !!contactId.value), fetchPolicy: 'no-cache' },
)

const contact = computed(() => result.value?.contact)

const { mutate: deleteContact, loading: deleteLoading } = useMutation(DELETE_CONTACT_MUTATION)

const onDelete = async () => {
  try {
    const result = await deleteContact({
      contactId: contactId.value,
    })
    if (result?.errors) {
      throw result
    }
    notification.success({
      message: 'Success',
      description: 'Contact deleted successfully',
    })
    router.replace('/contacts')
  } catch (error: any) {
    if (error.errors) {
      notification.error({
        message: 'Error',
        description: error.errors.errorMsg,
      })
    } else {
      notification.error({
        message: 'Error',
        description: error.message || 'Delete Contact failed, please try again.',
      })
    }
  }
}
</script>

<template>
  <div class="mb-6 flex items-center justify-between px-6">
    <Breadcrumb>
      <Breadcrumb.Item>
        <RouterLink to="/contacts" class="font-semibold">Contacts</RouterLink>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <h1 class="font-semibold">{{ contact?.fullName }}</h1>
      </Breadcrumb.Item>
    </Breadcrumb>
    <div class="flex gap-2">
      <BackButton />
      <Button :danger="true" @click="onDelete">Delete</Button>
    </div>
  </div>

  <div v-if="loading || deleteLoading" class="flex justify-center items-center h-40">
    <Spin size="large" />
  </div>

  <div v-else-if="error" class="text-red-500 text-center">Failed to load contact data.</div>

  <div v-else class="overflow-y-auto p-6">
    <ContactForm :id="contact?.id" :initial-value="contact" />
  </div>
</template>

<style scoped></style>
