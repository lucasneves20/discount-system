<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'
import { reactive } from 'vue'
import DiscountDatePicker from './DiscountDatePicker.vue'

interface DataSearchByFilterProps {
  name: string
  email: string
  contact: string
  createdAt: Date
  requestedAt: Date | null
}

interface DiscountEmitsProps {
  filtered: [valueUnfiltered: DataSearchByFilterProps[]]
}

const { items } = defineProps<{ items: DataSearchByFilterProps[] }>()
const emit = defineEmits<DiscountEmitsProps>()

const dataSearchByFilter = reactive<DataSearchByFilterProps>({} as DataSearchByFilterProps)

function filterByMultipleFields<T>(
  data: T[],
  filters: Partial<Record<keyof T, string | number | Date | undefined | null>>,
): T[] {
  return data.filter((item) => {
    return Object.keys(filters).every((key) => {
      const filterValue = filters[key as keyof T]
      const itemValue = item[key as keyof T]

      // Ignora campos vazios no filtro
      if (!filterValue) return true

      if (typeof itemValue === 'string' && typeof filterValue === 'string') {
        // Comparação de strings, ignorando maiúsculas e minúsculas
        return itemValue.toLowerCase().includes(filterValue.toLowerCase())
      } else if (itemValue instanceof Date && filterValue instanceof Date) {
        // Comparação de instâncias de Date
        return (
          itemValue.getFullYear() === filterValue.getFullYear() &&
          itemValue.getMonth() === filterValue.getMonth() &&
          itemValue.getDate() === filterValue.getDate()
        )
      } else if (itemValue === null || filterValue === null) {
        // Caso um valor seja nulo, retorna falso
        return false
      } else {
        // Comparação padrão para outros tipos
        return itemValue === filterValue
      }
    })
  })
}

function updateDateCreatedAt(n: Date) {
  dataSearchByFilter.createdAt = n
}

function updateDateRequestedAt(n: Date) {
  dataSearchByFilter.requestedAt = n
}

function applyFilter() {
  const filtered = filterByMultipleFields(items, dataSearchByFilter)
  emit('filtered', filtered)
}
</script>

<template>
  <div class="w-[1000px] mb-2">
    <div class="flex gap-2 mb-2">
      <Input v-model="dataSearchByFilter.name" placeholder="Nome" />
      <Input v-model="dataSearchByFilter.email" placeholder="E-mail" />
      <Input v-model="dataSearchByFilter.contact" placeholder="Telefone" />
      <DiscountDatePicker
        :date="dataSearchByFilter.createdAt"
        @date-update="updateDateCreatedAt"
        placeholder="Cadastrado em"
      />
      <DiscountDatePicker
        :date="dataSearchByFilter.requestedAt || null"
        @date-update="updateDateRequestedAt"
        placeholder="Desconto usado em"
      />
    </div>
    <span>
      <Button @click="applyFilter">Filtrar</Button>
    </span>
  </div>
</template>
