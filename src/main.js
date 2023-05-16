import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index.js"

// Create App
const app = createApp(App)

// Use Router
app.use(router)

// Mount App
app.mount('#app')
