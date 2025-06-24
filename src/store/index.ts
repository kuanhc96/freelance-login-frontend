import { createStore } from 'vuex';
import { RootState } from './types';
import createPersistedState from 'vuex-persistedstate';
import { instructors } from './instructors';
import { subjects } from './subjects';
import { login } from './login';
import { announcements } from './announcements'

const store = createStore<RootState>({
    modules: {
        instructors,
        subjects,
        login,
        announcements,
    },
    plugins: [
        createPersistedState({
            key: 'freelance-app',
            paths: ['login', 'instructors', 'announcements', 'subjects']
        })
    ]
})

export default store;