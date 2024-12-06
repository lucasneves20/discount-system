<script setup lang="ts">
import CalendarPage from '@/components/Calendar/CalendarPage.vue'
import { Button } from '@/components/ui/button'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { ref } from 'vue'

interface DiscountDatePickerProps {
  date: Date
  placeholder: string
}

interface DiscountDatePickerEmits {
  dateUpdate: [value: Date | null]
}

const { date, placeholder } = defineProps<DiscountDatePickerProps>()
const emit = defineEmits<DiscountDatePickerEmits>()
const datePickerValue = ref<Date | null>(date)

function updateDate(n: Date) {
  datePickerValue.value = n
  emit('dateUpdate', datePickerValue.value)
}

function clear() {
  datePickerValue.value = null
  emit('dateUpdate', null)
}
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="
          cn('w-[280px] justify-start text-left font-normal', !date && 'text-muted-foreground')
        "
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{ datePickerValue ? datePickerValue.toLocaleDateString('pt-BR') : placeholder }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <CalendarPage @date="updateDate" :disabled-date="{ after: true }" />

      <div class="p-2 flex justify-end">
        <Button @click="clear">Limpar Data</Button>
      </div>
    </PopoverContent>
  </Popover>
</template>
