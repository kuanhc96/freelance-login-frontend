import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import router from '@/router/router';
import {markRaw} from "vue";

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);
pinia.use(({ store }) => {
    store.router = markRaw(router)
})

export default pinia;
