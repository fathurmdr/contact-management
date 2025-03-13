<script setup lang="ts">
import { Button } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
<template>
  <Button @click="() => router.back()">Back</Button>
</template>

<style scoped></style>
