import apolloClient from '@/libs/apolloClient'
import { GET_ME_QUERY } from '@/queries/me'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export type User = {
  name: string
  email: string
  phoneNumber: string
  bio?: string
}

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const sessionId = ref<string | null>(localStorage.getItem('sessionId'))
  const user = ref<User | null>(null)

  const setSessionId = (id: string) => {
    sessionId.value = id
    localStorage.setItem('sessionId', id)
  }

  const setUser = (userData: User) => {
    user.value = userData
  }

  const logout = () => {
    sessionId.value = null
    user.value = null
    localStorage.removeItem('sessionId')
    router.replace('/')
  }

  const initializeAuth = async () => {
    if (!sessionId.value) {
      return
    }

    try {
      const { data } = await apolloClient.query({ query: GET_ME_QUERY })
      if (data?.me) {
        setUser(data.me)
      } else {
        throw new Error('User not found!')
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error)
      logout()
    }
  }

  return { sessionId, user, setSessionId, setUser, logout, initializeAuth }
})
