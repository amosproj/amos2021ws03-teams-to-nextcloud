import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://nextcloud.tms2nc.de/';

createApp(App)
.use(router)
.use(store)
.mount('#app');
