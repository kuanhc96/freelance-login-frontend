import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import instructors from './instructors';
import subjects from './subjects';
import login from './login';

const store = createStore({
    modules: {
        instructors,
        subjects,
        login,
    },
    plugins: [
        createPersistedState({
            key: 'freelance-app',
            paths: ['login']
        })
    ]
})

export default store;