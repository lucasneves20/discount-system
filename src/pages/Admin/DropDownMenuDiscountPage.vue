<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface DropDownMenuDiscountEmits {
  update: [value: Date | null]
}

defineEmits<DropDownMenuDiscountEmits>()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button variant="outline">Menu</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>Edição de desconto</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="$emit('update', null)">Dar Desconto</DropdownMenuItem>
      <DropdownMenuItem @click="$emit('update', new Date())">Remover Desconto</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
