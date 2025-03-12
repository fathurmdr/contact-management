<script setup lang="ts">
import { watchEffect } from 'vue'
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()

watchEffect(() => {
  authStore.initializeAuth()
})
</script>

<template>
  <RouterView />
</template>
