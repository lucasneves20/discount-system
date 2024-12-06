<script setup lang="ts">
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import CalendarPage from '@/components/Calendar/CalendarPage.vue'
import Button from '@/components/ui/button/Button.vue'
import DialogClose from '@/components/ui/dialog/DialogClose.vue'
import { ref } from 'vue'

interface UserData {
  name?: string
  contact?: string
  email?: string
  createdAt?: Date
  requestedAt?: Date | null
}

const emit = defineEmits<{ update: [value: Date | null] }>()

const { name, email, contact, requestedAt } = defineProps<UserData>()
const date = ref<Date | null>(requestedAt as Date)

function updateDate(n: Date) {
  date.value = n
}

function updateDiscount() {
  emit('update', date.value)
}
</script>

<template>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{{ name }}</DialogTitle>
      <DialogDescription>
        {{ email }}
        <span class="contents-['.'] text-transparent bg-foreground rounded-full" />
        {{ contact }}
      </DialogDescription>
    </DialogHeader>

    <div class="flex flex-col justify-center items-center gap-2">
      <span class="text-foreground/60">
        <div>
          {{ date ? `disconto usado em ${date.toLocaleDateString('pt-BR')}` : 'desconto ativo' }}
        </div>
      </span>
      <CalendarPage @date="updateDate" :disabled-date="{ after: true }" />
    </div>

    <DialogFooter>
      <div class="flex justify-center w-full gap-2">
        <Button @click="() => (date = null)" variant="outline"> Remover agora o desconto </Button>
        <DialogClose as-child>
          <Button @click="updateDiscount"> Salvar alterações</Button>
        </DialogClose>
      </div>
    </DialogFooter>
  </DialogContent>
</template>
