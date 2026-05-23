<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import Avatar from 'primevue/avatar'
import Menubar from 'primevue/menubar'
import { useUserStore } from '@/stores/userStore'
import { useAuth } from '@/composables/useAuth'
import { useToastNotification } from '@/composables/useToastNotifications'

const authStore = useUserStore()
const router = useRouter()
const { showToast } = useToastNotification()
const { signOut, errorMessage } = useAuth()

const emailFirstLetter = computed(() => {
  return authStore.user?.email ? authStore.user?.email[0].toUpperCase() : ''
})

const signOutUser = async () => {
  try {
    await signOut()
    authStore.resetUser()
    await router.replace({ name: 'auth' })
  } catch (error) {
    showToast('error', 'Ошибка выхода', errorMessage.value)
  }
}

</script>

<template>
  <div class="mb-5">
    <Menubar>
      <template #start>
        <div class="flex item-center gap-2">
          <span class="font-bold">Link Manager</span>
          <div class="flex item-center gap-2">
            <Button icon="pi pi-link" rounded />
            <Button icon="pi pi-folder" rounded />
          </div>
        </div>
      </template>
      <template #end>
        <div class="flex items-center gap-2">
          <Avatar :label="emailFirstLetter" size="large" shape="circle" />
          <Button icon="pi pi-sign-out" rounded severity="secondary" @click="signOutUser"/>
        </div>
      </template>
    </Menubar>
  </div>
</template>
