<script setup lang="ts">
import BackButton from '@/components/BackButton.vue'
import GroupForm from '@/components/GroupForm.vue'
import { DELETE_GROUP_MUTATION } from '@/mutations/group'
import { GET_GROUP_QUERY } from '@/queries/group'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { Breadcrumb, Button, notification, Spin } from 'ant-design-vue'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const groupId = computed(() => route.params.id)

const { result, loading, error } = useQuery(GET_GROUP_QUERY, () => ({ id: groupId.value }), {
  enabled: computed(() => !!groupId.value),
  fetchPolicy: 'no-cache',
})

const group = computed(() => result.value?.group)

const { mutate: deleteGroup, loading: deleteLoading } = useMutation(DELETE_GROUP_MUTATION)

const onDelete = async () => {
  try {
    const result = await deleteGroup({
      id: groupId.value,
    })
    if (result?.errors) {
      throw result
    }
    notification.success({
      message: 'Success',
      description: 'Group deleted successfully',
    })
    router.back()
  } catch (error: any) {
    if (error.errors) {
      notification.error({
        message: 'Error',
        description: error.errors.errorMsg,
      })
    } else {
      notification.error({
        message: 'Error',
        description: error.message || 'Delete Group failed, please try again.',
      })
    }
  }
}
</script>

<template>
  <div class="mb-6 flex items-center justify-between px-6">
    <Breadcrumb>
      <Breadcrumb.Item>
        <RouterLink to="/groups" class="font-semibold">Groups</RouterLink>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <h1 class="font-semibold">{{ group?.name }}</h1>
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

  <div v-else-if="error" class="text-red-500 text-center">Failed to load group data.</div>

  <div v-else class="overflow-y-auto p-6">
    <GroupForm :id="group?.id" :initial-value="group" />
  </div>
</template>

<style scoped></style>
