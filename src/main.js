import axios from 'axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

axios.defaults.baseURL = 'https://pro100chat.herokuapp.com/api/v1/'
axios.defaults.headers.common.accept = 'application/json';



app.use(router)

app.mount('#app')
