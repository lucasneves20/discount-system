<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import Dialog from '@/components/ui/dialog/Dialog.vue'
import DialogTrigger from '@/components/ui/dialog/DialogTrigger.vue'
import DiscountEditModal from './DiscountEditModal.vue'

interface DialogDiscountProps {
  name: string
  email: string
  contact: string
  requestedAt: Date | null
}

const { item } = defineProps<{ item: DialogDiscountProps }>()
const emit = defineEmits<{ update: [value: Date | null] }>()

function updateRequestedAt(n: Date | null) {
  emit('update', n)
}
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <Button>Editar</Button>
    </DialogTrigger>
    <DiscountEditModal
      :name="item.name"
      :email="item.email"
      :contact="item.contact"
      @update="updateRequestedAt"
    />
  </Dialog>
</template>
