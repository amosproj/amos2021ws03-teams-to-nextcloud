import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_NEXTCLOUD_BASE_URL;

createApp(App)
.use(router)
.use(store)
.mount('#app');
