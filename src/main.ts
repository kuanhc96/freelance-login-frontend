import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';
import pinia from './store/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@/assets/scss/bootstrap.scss'
import '@/assets/scss/styles.scss'
import '@/assets/scss/font-awesome.scss'
import BaseCard from './components/ui/BaseCard.vue';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';

const app = createApp(App);
app.use(router);
app.use(pinia);
app.component('base-card', BaseCard);
app.mount('#app');
