import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import instructors from './instructors';
import subjects from './subjects';
import login from './login';
import announcements from './announcements'

const store = createStore({
    modules: {
        instructors,
        subjects,
        login,
        announcements,
    },
    plugins: [
        createPersistedState({
            key: 'freelance-app',
            paths: ['login', 'instructors', 'announcements']
        })
    ]
})

export default store;