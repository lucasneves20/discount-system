<script setup lang="ts">
import { useLocalStorage } from '@/lib/hooks/useLocalStorage'
import Session from '@/pages/SessionPages/SessionPage.vue'
import router from '@/router'
import { watch } from 'vue'
import { RouterLink } from 'vue-router'
import Button from './ui/button/Button.vue'

function LogoutHandler() {
  updateLocal(null)
  localStorage.clear()
  window.location.reload()
}

const { storageValue, updateLocal } = useLocalStorage('user:id')
const { storageValue: storageValueAdmin } = useLocalStorage('user:isAdmin')

watch(storageValue, (newStorageValue) => {
  if (newStorageValue) {
    router.push('/')
  }
})

console.log(storageValueAdmin.value === 'true')
const isLogged = storageValue.value !== null

// const ThemeToggle = ref<'light' | 'dark'>('light')
// const ThemeProvider = useColorMode({ disableTransition: false })

// function ThemeToggleHander() {
//   ThemeToggle.value = ThemeToggle.value === 'light' ? 'dark' : 'light'
//   ThemeProvider.value = ThemeToggle.value
// }
</script>

<template>
  <div class="overflow-x-hidden">
    <header
      v-if="isLogged"
      class="fixed z-30 flex w-screen flex-1 items-center justify-between gap-2 border-b border-foreground/30 bg-background/70 p-2 px-4 pr-10 backdrop-blur"
    >
      <h1 class="text-xl font-semibold tracking-widest">
        <RouterLink to="/"> Discount </RouterLink>
      </h1>

      <div class="flex gap-2 justify-center items-center">
        <Button v-if="storageValueAdmin === `true`" @click="() => router.push('/admin')"
          >Admin Painel</Button
        >
        <Button @click="LogoutHandler">Logout</Button>
      </div>
    </header>

    <main class="z-0 h-full pt-20">
      <slot v-if="isLogged" />
      <Session v-else>
        <slot />
      </Session>
    </main>
  </div>
</template>
