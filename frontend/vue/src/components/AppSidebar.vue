<script setup lang="ts">
import { PhoneOutlined, TeamOutlined } from '@ant-design/icons-vue'
import { useRoute, RouterLink } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div
    class="flex-0 hidden h-full basis-60 flex-col rounded-xl border border-gray-300 bg-gray-50 sm:flex"
  >
    <div class="p-6">
      <h1 class="text-xl font-semibold">Contact Management</h1>
    </div>
    <nav>
      <ul class="flex flex-col gap-2 p-6">
        <li>
          <RouterLink
            to="/contacts"
            title="Contacts"
            :class="route.path.includes('/contacts') ? 'text-black' : 'text-gray-500'"
          >
            Contacts
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/groups"
            title="Groups"
            :class="route.path.includes('/groups') ? 'text-black' : 'text-gray-500'"
          >
            Groups
          </RouterLink>
        </li>
      </ul>
    </nav>
  </div>

  <nav class="absolute bottom-0 h-14 w-full rounded-t-xl border sm:hidden">
    <ul class="flex h-full items-center justify-evenly">
      <li>
        <RouterLink
          to="/contacts"
          title="Contacts"
          :class="route.path.includes('/contacts') ? 'text-black' : 'text-gray-500'"
        >
          <PhoneOutlined class="text-2xl" />
        </RouterLink>
      </li>
      <li>
        <RouterLink
          to="/groups"
          title="Groups"
          :class="route.path.includes('/groups') ? 'text-black' : 'text-gray-500'"
        >
          <TeamOutlined class="text-2xl" />
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
