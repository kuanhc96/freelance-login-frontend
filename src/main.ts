import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';
// import pinia, {AUTH_SERVER_LOCATION, CALLBACK_URL} from './store/index';
import pinia from './store/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@/assets/scss/bootstrap.scss'
import '@/assets/scss/styles.scss'
import '@/assets/scss/font-awesome.scss'
import BaseCard from './components/ui/BaseCard.vue';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
// import {createOAuthClient, SessionStorage} from "@volverjs/auth-vue";

const app = createApp(App);
// const authClient = createOAuthClient({
//     url: AUTH_SERVER_LOCATION,
//     clientId: 'fe-public-client',
//     tokenEndpointAuthMethod: 'none',
//     scopes: 'openid FREELANCE_FE',
//     storage: new SessionStorage('freelance-session-storage'),
//     redirectUri: CALLBACK_URL,
//     postLogoutRedirectUri: AUTH_SERVER_LOCATION + '/login?autoLoggedOut=true',
// });
// app.use(authClient, {global: true});
app.use(router);
app.use(pinia);
app.component('base-card', BaseCard);
app.mount('#app');
