import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '../src/store'
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';
import appService from "@/plugins/appServices";

export const app = createApp(App)
    .use(router)
    .use(appService)
    .use(store)
    .use(BootstrapIconsPlugin)
    .mount('#app')