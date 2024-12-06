<script setup lang="ts">
import Card from '@/components/ui/card/Card.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
import CardDescription from '@/components/ui/card/CardDescription.vue'
import CardHeader from '@/components/ui/card/CardHeader.vue'
import CardTitle from '@/components/ui/card/CardTitle.vue'
import { PhCheckCircle, PhWarningCircle } from '@phosphor-icons/vue'
import qrcodeVue from 'qrcode.vue'
import { reactive, ref } from 'vue'

interface UserData {
  id: number
  name: string
  contact: string
  email: string
  createdAt: Date
  requestedAt: Date | null
}

const valueUserData = reactive<UserData>({
  id: 1,
  name: 'Lucas Neves',
  contact: '16982420186',
  email: 'spurgeom.10@gmail.com',
  createdAt: new Date(),
  requestedAt: null,
})

const urlAfiliate = `http://localhost:5173/afiliate/signin/${valueUserData.id}`
console.log(urlAfiliate)

// onMounted(async () => {
//   await new Promise(resolve => setInterval(resolve, 3000))
//   console.log("feito")
// })

const size = ref(300)
</script>

<template>
  <div class="w-full flex flex-col justify-center items-center">
    <Card class="xs:mt-20 w-[350px]">
      <CardHeader>
        <CardTitle>Seu QR code para pegar desconto</CardTitle>
        <CardDescription>
          Este QR code é único e de um uso, para ter um novo uso e garantir um novo desconto, você
          pode nos indicar mostrando a uma pessoa este mesmo qr code,
          <strong
            >no cadastro da pessoa indicada, você ganha automáticamente um novo desconto de
            10%</strong
          >
        </CardDescription>
      </CardHeader>
      <CardContent class="flex gap-2">
        <qrcode-vue :value="JSON.stringify(urlAfiliate)" :size="size" level="H" render-as="svg" />
      </CardContent>
    </Card>

    <div class="rounded-lg p-4 w-[350px] mt-2 border border-foreground/10 shadow-lg">
      <div v-if="!valueUserData.requestedAt" class="flex gap-2">
        Desconto
        <span class="flex justify-center items-center gap-1 text-green-700"
          >Ativo <PhCheckCircle :size="20"
        /></span>
      </div>
      <div v-else class="flex gap-2">
        Desconto
        <span class="flex justify-center items-center gap-1 text-rose-600"
          >Usado em {{ new Date(valueUserData.requestedAt as any).toLocaleDateString('pt-BR')
          }}<PhWarningCircle :size="20"
        /></span>
      </div>
    </div>
  </div>
</template>
