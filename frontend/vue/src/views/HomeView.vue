<script setup lang="ts">
import { Button } from 'ant-design-vue'
import { PhoneOutlined } from '@ant-design/icons-vue'
</script>

<template>
  <div
    class="grid min-h-dvh grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 sm:p-20"
  >
    <main class="row-start-2 flex flex-col items-center gap-8">
      <div class="flex items-center gap-2">
        <PhoneOutlined class="text-2xl" />
        <h1 class="text-2xl font-semibold">Contact Management</h1>
      </div>
      <ol class="list-inside list-decimal text-left text-sm">
        <li class="mb-2">Manage your contacts easly and efficiently.</li>
        <li>Create contact groups to organize your contacts.</li>
      </ol>

      <div class="flex items-center gap-4">
        <RouterLink to="/sign-in">
          <Button shape="round" type="primary" size="large">Sign In </Button></RouterLink
        ><RouterLink to="/sign-up">
          <Button shape="round" type="default" size="large"> Sign Up </Button></RouterLink
        >
      </div>
    </main>
    <footer class="row-start-3 flex flex-wrap items-center justify-center gap-6">
      <a
        class="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://github.com/fathurmdr/contact-management/tree/main/fullstack/nextjs"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img aria-hidden src="@/assets/file.svg" alt="File icon" width="16" height="16" />
        Source Code
      </a>
      <a
        class="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://github.com/fathurmdr/contact-management/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img aria-hidden src="@/assets/window.svg" alt="Window icon" width="16" height="16" />
        Repository
      </a>
      <a
        class="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://www.linkedin.com/in/fathur208/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img aria-hidden src="@/assets/globe.svg" alt="Globe icon" width="16" height="16" />
        See My LinkedIn →
      </a>
    </footer>
  </div>
</template>
