<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'
import { Collapse, List, Button, Space, Modal, notification } from 'ant-design-vue'
import { useMutation } from '@vue/apollo-composable'
import { DELETE_GROUP_MEMBER_MUTATION } from '@/mutations/group'

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

const emits = defineEmits(['memberRemoved'])

const groupIds = computed(() => props.groups.map((group) => group.id))

const { mutate: removeMember, loading: removeMemberLoading } = useMutation(
  DELETE_GROUP_MEMBER_MUTATION,
)

const onRemoveMember = (contactId: string, groupId: string) => {
  Modal.confirm({
    title: 'Remove this Contact?',
    content: `Are you sure you want to remove this contact from the group?`,
    onOk: async () => {
      try {
        const result = await removeMember({
          id: groupId,
          contactId: contactId,
        })
        if (result?.errors) {
          throw result
        }
        notification.success({
          message: 'Success',
          description: 'Contact removed successfully',
        })
        emits('memberRemoved')
      } catch (error: any) {
        if (error.errors) {
          notification.error({
            message: 'Error',
            description: error.errors.errorMsg,
          })
        } else {
          notification.error({
            message: 'Error',
            description: error.message || 'Remove Contact failed, please try again.',
          })
        }
      }
    },
    okText: 'Remove',
    okButtonProps: { danger: true },
    centered: true,
  })
}
</script>

<template>
  <div v-if="removeMemberLoading" class="flex justify-center items-center h-40">
    <Spin size="large" />
  </div>
  <Collapse :default-active-key="groupIds">
    <Collapse.Panel v-for="group in groups" :key="group.id">
      <template #header>
        <div>
          <p>{{ group.name }}</p>
          <p class="text-xs font-normal">{{ group.description }}</p>
        </div>
      </template>
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
                @click="onRemoveMember(contact.id, group.id)"
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
  padding: 0px 8px !important;
}
:deep(.ant-collapse-header) {
  align-items: center !important;
}
</style>
