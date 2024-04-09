<script setup>
import { Nav, Alert } from '@/components'
import { useAuthStore } from '@/stores'

const authStore = useAuthStore()
</script>

<template>
  <div class="app-container">
    <Nav />
    <Alert />
    <div class="container pt-4 pb-4">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/base.css';
</style>
