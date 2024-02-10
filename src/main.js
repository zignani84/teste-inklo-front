import { createApp } from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.vue';
import router from './router';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
import './assets/style.css';

const app = createApp(App);

app.use(router); // Use o Vue Router na aplicação
app.use(VueToast);

app.mount('#app');
