<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import HeaderProfile from '@/components/HeaderProfile.vue'
</script>

<template>
  <div
    class="flex h-screen w-full max-w-[768px] items-center justify-center gap-4 overflow-hidden pb-14 sm:py-6"
  >
    <AppSidebar />
    <div class="relative flex h-full flex-1 flex-col border-gray-300 py-6 sm:rounded-xl sm:border">
      <HeaderProfile />
      <router-view />
    </div>
  </div>
</template>
