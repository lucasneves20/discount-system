import NotFound from '@/pages/NotFound.vue'
import PerfilPage from '@/pages/Perfil/PerfilPage.vue'
import PostEditor from '@/pages/PostEditor/PostEditor.vue'
import PostPageDetail from '@/pages/PostPages/PostPageDetail.vue'
import { createRouter, createWebHistory } from 'vue-router'
import PostPage from '../pages/PostPages/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Post',
      component: PostPage,

    },
    {
      path: '/post/:id',
      name: 'PostDetail',
      component: PostPageDetail,

    },
    {
      path: '/editor-post',
      name: 'Create Post',
      component: PostEditor,
    },
    {
      path: '/editor-post/:postId',
      name: 'Edit Post',
      component: PostEditor,
    },
    {
      path: '/perfil/:userId',
      name: 'Perfil',
      component: PerfilPage
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Error',
      component: NotFound
    }
  ],
})

export default router
