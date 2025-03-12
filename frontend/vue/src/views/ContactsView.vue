<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Breadcrumb, Button, Empty } from 'ant-design-vue'
import ContactList from '@/components/ContactList.vue'

const dummyContacts = ref([
  { id: '1', fullName: 'Alice Johnson', nickName: 'Ali', phoneNumber: '123-456-7890' },
  { id: '2', fullName: 'Bob Smith', nickName: '', phoneNumber: '987-654-3210' },
  { id: '3', fullName: 'Charlie Brown', nickName: 'Charlie', phoneNumber: '555-666-7777' },
  { id: '4', fullName: 'David Williams', nickName: 'Dave', phoneNumber: '999-888-7777' },
])

const groupedContacts = computed(() => {
  return dummyContacts.value.reduce((acc: any, contact) => {
    const firstLetter = contact.fullName.charAt(0).toUpperCase() || '#'
    acc[firstLetter] = acc[firstLetter] || []
    acc[firstLetter].push(contact)
    return acc
  }, {})
})

const router = useRouter()
const goToAddContact = () => {
  router.push('/contacts/add')
}
</script>

<template>
  <!-- Header -->
  <div class="mb-6 flex items-center justify-between px-6">
    <Breadcrumb>
      <Breadcrumb.Item>
        <h1 class="font-semibold">Contacts</h1>
      </Breadcrumb.Item>
    </Breadcrumb>
    <Button @click="goToAddContact">Add Contact</Button>
  </div>

  <!-- List atau Empty State -->
  <div v-if="dummyContacts.length > 0" class="flex-1 overflow-y-auto px-6">
    <ContactList :groupedContacts="groupedContacts" />
  </div>
  <div v-else class="px-6 py-20">
    <Empty description="No contacts found" />
  </div>
</template>
