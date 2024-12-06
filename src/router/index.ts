import HomePageAdmin from '@/pages/Admin/DiscountPage.vue'
import HomePage from '@/pages/Client/DiscountPage.vue'
import NotFound from '@/pages/NotFound.vue'
import SigninAfiliatePage from '@/pages/SessionAfiliatePages/SigninAfiliatePage.vue'
import LoginPage from '@/pages/SessionPages/LoginPage.vue'
import SigninPage from '@/pages/SessionPages/SigninPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from './middlewares/authGuard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginPage,
      meta: {
        requiresAuth: false,
        isGuestMode: true
      }
    },
    {
      path: '/signin',
      name: 'Signin',
      component: SigninPage,
      meta: {
        requiresAuth: false,
        isGuestMode: true
      }
    },
    {
      path: '/afiliate/login',
      name: 'AfiliateLogin',
      component: LoginPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/afiliate/signin/:userId',
      name: 'AfiliateSignin',
      component: SigninAfiliatePage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/',
      name: 'Home',
      component: HomePage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin',
      name: 'Admin',
      component: HomePageAdmin,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Error',
      component: NotFound,
      meta: {
        requiresAuth: true
      }
    },
  ],
})

authGuard(router)

export default router
