import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store';
import axios from 'axios';

axios.defaults.withCredentials = true;
//axios.defaults.baseURL = 'https://tms2nc.de/';
axios.defaults.baseURL = 'http://localhost:8080';

createApp(App)
.use(router)
.use(store)
.mount('#app');
