<script setup lang="ts">
import { DownOutlined, LogoutOutlined } from '@ant-design/icons-vue'
import { Dropdown, Menu } from 'ant-design-vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const { logout } = authStore
</script>

<template>
  <div class="mb-6 flex justify-end px-8">
    <Dropdown placement="bottomRight">
      <template #overlay>
        <Menu>
          <Menu.Item key="1" @click="logout">
            <LogoutOutlined class="mr-2 text-base" />
            Sign Out
          </Menu.Item>
        </Menu>
      </template>

      <div class="flex cursor-pointer items-center gap-4">
        <div class="flex flex-col">
          <p>{{ user?.name }}</p>
          <p class="text-xs text-gray-500">{{ user?.bio }}</p>
        </div>
        <DownOutlined />
      </div>
    </Dropdown>
  </div>
</template>
