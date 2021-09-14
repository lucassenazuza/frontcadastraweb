import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Maska from 'maska'

//axios.defaults.baseURL = 'http://127.0.0.1:5000';
axios.defaults.baseURL = 'https://flaskcadastraweb.herokuapp.com'

createApp(App).use(store).use(Maska).use(router).mount('#app')
