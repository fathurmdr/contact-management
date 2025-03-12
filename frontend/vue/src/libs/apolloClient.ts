import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { useAuthStore } from '@/stores/auth'

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI,
})

const authLink = setContext((_, { headers }) => {
  const authStore = useAuthStore()
  return {
    headers: {
      ...headers,
      'X-Session-Id': authStore.sessionId || '',
    },
  }
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
})

export default apolloClient
