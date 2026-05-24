<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { RouterView } from 'vue-router'
import TheHeader from './components/TheHeader.vue'

const authStore = useUserStore()

onMounted(async () => {
  await authStore.getUser()
})
</script>

<template>
  <TheHeader v-if="authStore.user" />
  <RouterView />
</template>
