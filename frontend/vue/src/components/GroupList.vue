<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { Collapse, List, Button, Space, Modal } from 'ant-design-vue'

interface ContactType {
  id: string
  fullName: string
  nickName: string
  phoneNumber: string
}

interface GroupType {
  id: string
  name: string
  description: string
  members: ContactType[]
}

interface GroupListProps {
  groups: GroupType[]
}

const props = defineProps<GroupListProps>()

const groupIds = computed(() => props.groups.map((group) => group.id))

const handleRemoveMember = (contactId: string, groupId: string) => {
  Modal.confirm({
    title: 'Remove this Contact?',
    content: `Are you sure you want to remove this contact from the group?`,
    onOk: async () => {
      console.log(`Removing contact ${contactId} from group ${groupId}`)
    },
    okText: 'Remove',
    okButtonProps: { danger: true },
  })
}
</script>

<template>
  <Collapse :default-active-key="groupIds">
    <Collapse.Panel v-for="group in groups" :key="group.id" :header="group.name">
      <template #extra>
        <Space>
          <RouterLink :to="`/groups/${group.id}/add-member`" class="!px-0 !text-xs"
            >Add Member</RouterLink
          >
          <RouterLink :to="`/groups/${group.id}/edit`" class="!px-0 !text-xs">Edit</RouterLink>
        </Space>
      </template>
      <List :data-source="group.members" :bordered="false">
        <template #renderItem="{ item: contact }">
          <List.Item class="!py-2 !px-0">
            <div class="!flex !w-full items-center !justify-between">
              <RouterLink
                :to="`/contacts/${contact.id}/edit`"
                class="w-full flex items-center justify-between !text-black py-1.5 px-4 rounded-lg hover:!bg-gray-100"
              >
                <p class="font-semibold">
                  {{ contact.fullName }}
                </p>
                <p class="text-xs font-normal">{{ contact.phoneNumber }}</p>
              </RouterLink>
              <Button
                type="link"
                danger
                class="!px-2 !text-xs"
                @click="handleRemoveMember(contact.id, group.id)"
              >
                Remove
              </Button>
            </div>
          </List.Item>
        </template>
      </List>
    </Collapse.Panel>
  </Collapse>
</template>

<style scoped>
:deep(.ant-collapse-content-box) {
  padding: 0px 8px !important; /* Sesuaikan padding sesuai kebutuhan */
}
</style>
