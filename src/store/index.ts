import { createPinia } from 'pinia';
import router from '@/router/router';
// import createPersistedState from 'vuex-persistedstate';
// import { RootState } from './types';
import {markRaw} from "vue";

const pinia = createPinia();
pinia.use(({ store }) => {
    store.router = markRaw(router)
})

// const store = createStore<RootState>({
//     modules: {
//         instructors,
//         subjects,
//         login,
//         announcements,
//     },
//     plugins: [
//         createPersistedState({
//             key: 'freelance-app',
//             paths: ['login', 'instructors', 'announcements', 'subjects']
//         })
//     ]
// })

export default pinia;
