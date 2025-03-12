import apolloClient from '@/libs/apolloClient'
import { createApolloProvider } from '@vue/apollo-option'

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})

export default apolloProvider
