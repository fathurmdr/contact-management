<script setup lang="ts">
import { Breadcrumb, Button, Empty } from 'ant-design-vue'
import { useQuery } from '@vue/apollo-composable'
import { GET_GROUPS_QUERY } from '@/queries/group'
import GroupList from '@/components/GroupList.vue'
import { Spin } from 'ant-design-vue'

const { result, loading, refetch } = useQuery(GET_GROUPS_QUERY, null, {
  fetchPolicy: 'no-cache',
})

const onMemberRemoved = () => {
  refetch()
}
</script>

<template>
  <div class="mb-6 flex items-center justify-between px-6">
    <Breadcrumb>
      <Breadcrumb.Item>
        <h1 class="font-semibold">Groups</h1>
      </Breadcrumb.Item>
    </Breadcrumb>
    <RouterLink to="/groups/add">
      <Button>Add Group</Button>
    </RouterLink>
  </div>
  <div v-if="loading" class="flex items-center justify-center h-56">
    <Spin size="large" />
  </div>
  <div v-else-if="result?.groups?.length > 0" class="flex-1 overflow-y-auto px-6">
    <GroupList :groups="result.groups" @member-removed="onMemberRemoved" />
  </div>
  <div v-else class="px-6 py-20">
    <Empty description="No groups found" />
  </div>
</template>
