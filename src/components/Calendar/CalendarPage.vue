<script setup lang="ts">
import { getWeekDays } from '@/lib/getWeekDays'
import { PhCaretLeft, PhCaretRight } from '@phosphor-icons/vue'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { computed, ref } from 'vue'
import Button from '../ui/button/Button.vue'
import CalendarBody from './CalendarBody.vue'
import CalendarContainer from './CalendarContainer.vue'
import CalendarDay from './CalendarDay.vue'
import CalendarHeader from './CalendarHeader.vue'
import CalendarTitle from './CalendarTitle.vue'

import 'dayjs/locale/pt-br'

dayjs.locale('pt-br')

// Interface para representar as semanas do calendário
interface CalendarWeek {
  week: number
  days: Array<{
    date: dayjs.Dayjs
    disabled: boolean
  }>
}

// Tipo para o conjunto de semanas do calendário
type CalendarWeeks = CalendarWeek[]

interface CalendarProps {
  disabledDate?: {
    before?: boolean
    after?: boolean
  }
}

// Tipo do evento para emissão de data
interface EmitsProps {
  date: [value: Date]
}

// Evento emitido ao selecionar uma data
defineEmits<EmitsProps>()

const { disabledDate } = defineProps<CalendarProps>()

// Estado inicial da data atual, configurada para o primeiro dia do mês atual
const currentDate = ref(dayjs().startOf('month'))

// Função para mudar para o mês anterior
const handlePreviousMonth = () => {
  currentDate.value = currentDate.value.subtract(1, 'month')
}

// Função para mudar para o próximo mês
const handleNextMonth = () => {
  currentDate.value = currentDate.value.add(1, 'month')
}

// Lista abreviada dos dias da semana
const shortWeekDays = getWeekDays({ short: true })

// Nome do mês e ano atuais, atualizados conforme a `currentDate` muda
const currentMonth = computed(() => currentDate.value.format('MMMM'))
const currentYear = computed(() => currentDate.value.format('YYYY'))

// Computação das semanas do calendário
const calendarWeeks = computed(() => {
  // Dias do mês atual
  const daysInMonthArray = Array.from({ length: currentDate.value.daysInMonth() }).map((_, i) =>
    currentDate.value.set('date', i + 1),
  )

  // Dias preenchendo antes do início do mês (mês anterior)
  const firstWeekDay = currentDate.value.day()
  const previousMonthFill = Array.from({ length: firstWeekDay })
    .map((_, i) => currentDate.value.subtract(i + 1, 'day'))
    .reverse()

  // Dias preenchendo após o final do mês (próximo mês)
  const lastDayInMonth = currentDate.value.endOf('month')
  const lastWeekDay = lastDayInMonth.day()
  const nextMonthFill = Array.from({ length: 6 - lastWeekDay }).map((_, i) =>
    lastDayInMonth.add(i + 1, 'day'),
  )

  const dateIsBefore = (date: Dayjs) =>
    disabledDate?.before ? date.isBefore(dayjs(), 'day') : false
  const dateIsAfter = (date: Dayjs) => (disabledDate?.after ? date.isAfter(dayjs(), 'day') : false)

  // Todos os dias do calendário (incluindo preenchimentos)
  const calendarDays = [
    ...previousMonthFill.map((date) => ({ date, disabled: true })),
    ...daysInMonthArray.map((date) => ({
      date,
      disabled: (dateIsBefore(date) || dateIsAfter(date)) ?? false,
    })),
    ...nextMonthFill.map((date) => ({ date, disabled: true })),
  ]

  // Organiza os dias em semanas
  return calendarDays.reduce<CalendarWeeks>((weeks, _, i, original) => {
    if (i % 7 === 0) {
      weeks.push({
        week: i / 7 + 1,
        days: original.slice(i, i + 7),
      })
    }
    return weeks
  }, [])
})
</script>
<template>
  <CalendarContainer class="w-[330px]">
    <!-- Cabeçalho do calendário -->
    <CalendarHeader>
      <CalendarTitle class="text-xl">
        {{ currentMonth }} <span>{{ currentYear }}</span>
      </CalendarTitle>

      <!-- Ações para navegação de meses -->
      <div class="flex gap-2">
        <Button @click="handlePreviousMonth" size="icon" title="Previous month">
          <PhCaretLeft :size="20" />
        </Button>
        <Button @click="handleNextMonth" size="icon" title="Next month">
          <PhCaretRight :size="20" />
        </Button>
      </div>
    </CalendarHeader>

    <!-- Corpo do calendário -->
    <CalendarBody>
      <!-- Cabeçalho dos dias da semana -->
      <thead>
        <tr>
          <th class="text-md font-normal" v-for="weekDay in shortWeekDays" :key="weekDay">
            {{ weekDay }}.
          </th>
        </tr>
      </thead>
      <!-- Dias do mês -->
      <tbody>
        <tr v-for="{ week, days } in calendarWeeks" :key="week">
          <td v-for="{ date, disabled } in days" :key="date.toString()">
            <CalendarDay :disabled="disabled" @click="() => $emit('date', date.toDate())">
              {{ date.date() }}
            </CalendarDay>
          </td>
        </tr>
      </tbody>
    </CalendarBody>
  </CalendarContainer>
</template>
