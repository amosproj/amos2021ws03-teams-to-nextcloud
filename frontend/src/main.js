import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store';
import axios from 'axios';
import mitt from 'mitt';
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_NEXTCLOUD_BASE_URL;

const app = createApp(App);
app.use(router);
app.use(store);

// mitt allows us to dispatch events
const emitter = mitt();
// Register the emitter in the globalProperties
app.config.globalProperties.emitter = emitter;

// toastification allows us to use toasts (something like notifications)
const options = {
    // You can set your default options here
    position: "bottom-right",
    timeout: 10000,
    closeOnClick: false,
    pauseOnFocusLoss: false,
    pauseOnHover: false,
    draggable: false,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false,
    transition: "Vue-Toastification__fade",
    maxToasts: 8,
};
app.use(Toast, options);

app.mount('#app');
export { app };