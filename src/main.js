import './assets/main.css'
import { store } from './stores'
import { createApp } from 'vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const vuetify = createVuetify({
    components,
    directives,
  })

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(vuetify)
app.mount('#app')
