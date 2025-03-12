<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Collapse, List } from 'ant-design-vue'

interface ContactType {
  id: string
  fullName: string
  nickName?: string
  phoneNumber: string
}

interface ContactListProps {
  groupedContacts: Record<string, ContactType[]>
}

const props = defineProps<ContactListProps>()

const letters = computed(() => Object.keys(props.groupedContacts))
</script>

<template>
  <Collapse :default-active-key="letters">
    <Collapse.Panel v-for="letter in letters" :key="letter" :header="letter" class="font-semibold">
      <List>
        <List.Item v-for="contact in groupedContacts[letter]" :key="contact.id" class="!py-2 !px-0">
          <RouterLink
            :to="`/contacts/${contact.id}/edit`"
            class="w-full flex items-center justify-between !text-black py-1.5 px-4 rounded-lg hover:!bg-gray-100"
          >
            <p class="font-semibold">
              {{
                contact.nickName ? `${contact.fullName} (${contact.nickName})` : contact.fullName
              }}
            </p>
            <p class="text-xs font-normal">{{ contact.phoneNumber }}</p>
          </RouterLink>
        </List.Item>
      </List>
    </Collapse.Panel>
  </Collapse>
</template>

<style scoped>
:deep(.ant-collapse-content-box) {
  padding: 0px 8px !important;
}
</style>
