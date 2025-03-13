import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/layout/PublicLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: 'sign-in',
          name: 'sign-in',
          component: () => import('../views/SignInView.vue'),
        },
        {
          path: 'sign-up',
          name: 'sign-up',
          component: () => import('../views/SignUpView.vue'),
        },
      ],
    },
    {
      path: '/',
      component: () => import('../views/layout/MainLayout.vue'),
      children: [
        {
          path: 'contacts',
          name: 'contacts',
          component: () => import('../views/ContactsView.vue'),
        },
        {
          path: 'contacts/add',
          name: 'addContact',
          component: () => import('../views/AddContactView.vue'),
        },
        {
          path: 'contacts/:id/edit',
          name: 'updateContact',
          component: () => import('../views/UpdateContactView.vue'),
        },
        {
          path: 'groups',
          name: 'groups',
          component: () => import('../views/GroupsView.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to, _, next) => {
  const sessionId = localStorage.getItem('sessionId')

  const isPublicPath = ['/', '/sign-in', '/sign-up'].includes(to.fullPath)
  if (!isPublicPath && !sessionId) next({ path: '/' })
  else if (isPublicPath && sessionId) next({ path: '/contacts' })
  else next()
})

export default router
