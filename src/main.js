import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router.js';
import store from './store/index.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@/assets/scss/bootstrap.scss'
import '@/assets/scss/styles.scss'
import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseBadge from './components/ui/BaseBadge.vue';

const app = createApp(App);
app.use(router);
app.use(store);
app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.mount('#app');
