import { createApp } from 'vue';
import './style.css';
import ElementPlus from 'element-plus';
import App from './App.vue';
import 'element-plus/dist/index.css';
import { createPinia } from 'pinia';
const app = createApp(App);
app.use(createPinia());
app.use(ElementPlus);
app.mount('#app')
