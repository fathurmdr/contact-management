import './assets/main.css'

import { createApp, h, provide } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import apolloProvider from './providers/apoloProvider'
import { DefaultApolloClient } from '@vue/apollo-composable'
import apolloClient from './libs/apolloClient'

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})

app.use(createPinia())
app.use(router)
app.use(apolloProvider)

app.mount('#app')
