<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import router from '@/router'

function loginHandler() {
  router.push('/login')
}

function signinHandler() {
  router.push('/signin')
}
</script>

<template>
  <div class="flex justify-center items-center mt-40">
    <div class="flex flex-col w-[350px]">
      <div class="flex justify-center rounded-lg w-full bg-zinc-300">
        <Button
          class="w-full mx-2 my-1 font-semibold"
          variant="ghost"
          size="sm"
          @click="loginHandler"
          >Login</Button
        >
        <Button
          class="w-full mx-2 my-1 font-semibold"
          variant="ghost"
          size="sm"
          @click="signinHandler"
          >Cadastro</Button
        >
      </div>

      <div class="mt-2">
        <slot />
      </div>
    </div>
  </div>
</template>
