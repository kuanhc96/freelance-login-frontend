import { createStore } from 'vuex';
import instructors from './instructors';
import subjects from './subjects';
import login from './login';

const store = createStore({
    modules: {
        instructors,
        subjects,
        login,
    }
})

export default store;