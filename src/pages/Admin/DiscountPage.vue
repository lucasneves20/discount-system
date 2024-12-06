<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import DialogDiscountPage from './DialogDiscountPage.vue'
import DropDownMenuDiscountPage from './DropDownMenuDiscountPage.vue'
import FiltersDiscountTable from './FiltersDiscountTable.vue'

interface UserData {
  name: string
  contact: string
  email: string
  createdAt: Date
  requestedAt: Date | null
}

const actualDate = computed(() => new Date())

// Dados simulados
const data = reactive<UserData[]>([
  {
    name: 'Lucas Neves',
    contact: '16982420186',
    email: 'spurgeom.10@gmail.com',
    createdAt: actualDate.value,
    requestedAt: null,
  },
  {
    name: 'Ana Silva',
    contact: '16912345678',
    email: 'ana.silva@example.com',
    createdAt: new Date(new Date().setDate(actualDate.value.getDay() - 5)),
    requestedAt: new Date(new Date().setDate(actualDate.value.getDay() + 2)),
  },
])

// Cabeçalhos da tabela
const headers = computed(() => [
  'Nome',
  'Contato',
  'Email',
  'Cadastrado em',
  'Já foi usado?',
  'Ações',
  'Edição',
])
const filteredData = ref<UserData[]>(data)

function filterData(filtered: UserData[]) {
  filteredData.value = filtered
}

function updateDiscountForUser(n: null | Date, name: string) {
  data.map((item) => {
    if (item.name === name) {
      item.requestedAt = n
    }
  })
}
</script>

<template>
  <div class="flex justify-center">
    <div>
      <FiltersDiscountTable :items="data as any" @filtered="filterData" />

      <table class="overflow-hidden border border-zinc-900 bg-white rounded-lg shadow w-[1000px]">
        <thead class="bg-zinc-100 text-zinc-700 rounded-lg">
          <tr>
            <th v-for="(header, index) in headers" :key="index" class="px-4 py-2 text-left">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in filteredData"
            :key="index"
            class="odd:bg-white even:bg-zinc-50 hover:bg-zinc-100"
          >
            <td class="w-[250px] px-4 py-2">{{ item.name }}</td>
            <td class="px-4 py-2">{{ item.contact }}</td>
            <td class="w-[250px] px-4 py-2">{{ item.email }}</td>
            <td class="w-[100px] px-4 py-2">{{ item.createdAt.toLocaleDateString('pt-BR') }}</td>
            <td class="w-[100px] px-4 py-2">
              {{ item.requestedAt?.toLocaleDateString('pt-BR') ?? 'Está ativo' }}
            </td>
            <td>
              <DropDownMenuDiscountPage @update="(n) => updateDiscountForUser(n, item.name)" />
            </td>

            <td>
              <DialogDiscountPage
                :item="item"
                @update="(n) => updateDiscountForUser(n, item.name)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
