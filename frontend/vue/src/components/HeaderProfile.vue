<script setup lang="ts">
import { DownOutlined, LogoutOutlined } from '@ant-design/icons-vue'
import { Dropdown, Menu } from 'ant-design-vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <div class="mb-6 flex justify-end px-8">
    <Dropdown placement="bottomRight">
      <template #overlay>
        <Menu>
          <Menu.Item key="1" @click="authStore.logout">
            <LogoutOutlined class="mr-2 text-base" />
            Sign Out
          </Menu.Item>
        </Menu>
      </template>

      <div class="flex cursor-pointer items-center gap-4">
        <div class="flex flex-col">
          <p>{{ authStore.user?.name }}</p>
          <p class="text-xs text-gray-500">{{ authStore.user?.bio }}</p>
        </div>
        <DownOutlined />
      </div>
    </Dropdown>
  </div>
</template>
