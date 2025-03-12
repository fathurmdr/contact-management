<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Breadcrumb, Button, Empty } from 'ant-design-vue'
import GroupList from '@/components/GroupList.vue'

const groups = ref([
  {
    id: '1',
    name: 'Office',
    description: 'hello',
    members: [
      { id: '1', fullName: 'Alice Johnson', nickName: 'Ali', phoneNumber: '123-456-7890' },
      { id: '2', fullName: 'Bob Smith', nickName: '', phoneNumber: '987-654-3210' },
      { id: '3', fullName: 'Charlie Brown', nickName: 'Charlie', phoneNumber: '555-666-7777' },
      { id: '4', fullName: 'David Williams', nickName: 'Dave', phoneNumber: '999-888-7777' },
    ],
  },
  {
    id: '2',
    name: 'School',
    description: 'world',
    members: [
      { id: '1', fullName: 'Alice Johnson', nickName: 'Ali', phoneNumber: '123-456-7890' },
      { id: '2', fullName: 'Bob Smith', nickName: '', phoneNumber: '987-654-3210' },
      { id: '3', fullName: 'Charlie Brown', nickName: 'Charlie', phoneNumber: '555-666-7777' },
      { id: '4', fullName: 'David Williams', nickName: 'Dave', phoneNumber: '999-888-7777' },
    ],
  },
])

const router = useRouter()
const goToAddGroup = () => {
  router.push('/groups/add')
}
</script>

<template>
  <!-- Header -->
  <div class="mb-6 flex items-center justify-between px-6">
    <Breadcrumb>
      <Breadcrumb.Item>
        <h1 class="font-semibold">Groups</h1>
      </Breadcrumb.Item>
    </Breadcrumb>
    <Button @click="goToAddGroup">Add Group</Button>
  </div>

  <!-- List atau Empty State -->
  <div v-if="groups.length > 0" class="flex-1 overflow-y-auto px-6">
    <GroupList :groups="groups" />
  </div>
  <div v-else class="px-6 py-20">
    <Empty description="No groups found" />
  </div>
</template>
