import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mitt from "mitt";

const emitter = mitt();
const app = createApp(App).use(store).use(router);
app.config.globalProperties.emmiter = emitter;
app.mount('#app');