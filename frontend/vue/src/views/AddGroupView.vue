<script setup lang="ts">
import BackButton from '@/components/BackButton.vue'
import GroupForm from '@/components/GroupForm.vue'
import { Breadcrumb } from 'ant-design-vue'
</script>

<template>
  <div class="mb-6 flex items-center justify-between px-6">
    <Breadcrumb>
      <Breadcrumb.Item>
        <RouterLink to="/groups" class="font-semibold">Groups</RouterLink>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <h1 class="font-semibold">Add</h1>
      </Breadcrumb.Item>
    </Breadcrumb>
    <BackButton />
  </div>
  <div class="overflow-y-auto p-6">
    <GroupForm />
  </div>
</template>

<style scoped></style>
