<script setup lang="ts">
const { disabled } = defineProps<{ disabled: boolean }>()
</script>

<template>
  <button
    class="w-full aspect-square text-center cursor-pointer rounded-sm bg-foreground/5 hover:bg-foreground/30"
    :class="{
      'opacity-40 cursor-not-allowed bg-none': disabled,
      'focus:bg-foreground focus:text-background focus:ring-2 focus:ring-gray-100 focus:outline-none':
        !disabled,
    }"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
