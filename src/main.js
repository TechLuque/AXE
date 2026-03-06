import { createApp } from 'vue'
import App from './App.vue'
import router from './router' 
import 'normalize.css'
import './css/style.css'
import './css/button.css'
import './components/modal/Modal.vue'
import './components/ticket/ticket.css'
createApp(App).use(router).mount('#app')
