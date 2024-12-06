import { useLocalStorage } from "@/lib/hooks/useLocalStorage"
import type { Router } from "vue-router"

export function authGuard(router: Router) {
  router.beforeEach(async (to, _, next) => {
    const { storageValue: storageValueToken } = useLocalStorage("user:token")

    if (to.meta.requiresAuth && !storageValueToken.value) {
      next("/signin")
    } else if(to.meta.isGuestMode && storageValueToken.value){
      next("/")
    } else {
      next()
    }
  })
}
