<script setup lang="ts">
import { computed } from 'vue'
import { Breadcrumb, Button, Empty, Spin } from 'ant-design-vue'
import ContactList from '@/components/ContactList.vue'
import { useQuery } from '@vue/apollo-composable'
import { GET_CONTACTS_QUERY } from '@/queries/contact'

const { result, loading } = useQuery(GET_CONTACTS_QUERY, null, {
  fetchPolicy: 'no-cache',
})

const groupedContacts = computed(() => {
  const groupedContactsResult: any = []

  ;(result.value?.contacts ?? []).forEach((contact: any) => {
    const firstLetter = contact.fullName[0].toUpperCase() || '#'
    if (!groupedContactsResult[firstLetter]) {
      groupedContactsResult[firstLetter] = []
    }
    groupedContactsResult[firstLetter].push(contact)
  })

  return groupedContactsResult
})
</script>

<template>
  <div class="mb-6 flex items-center justify-between px-6">
    <Breadcrumb>
      <Breadcrumb.Item>
        <h1 class="font-semibold">Contacts</h1>
      </Breadcrumb.Item>
    </Breadcrumb>
    <RouterLink to="/contacts/add">
      <Button>Add Contact</Button>
    </RouterLink>
  </div>
  <div v-if="loading" class="flex items-center justify-center h-56">
    <Spin size="large" />
  </div>
  <div v-else-if="result?.contacts?.length > 0" class="flex-1 overflow-y-auto px-6">
    <ContactList :groupedContacts="groupedContacts" />
  </div>
  <div v-else class="px-6 py-20">
    <Empty description="No contacts found" />
  </div>
</template>
