import { createStore } from 'vuex';
import instructorsModule from './instructors/index.js';

const store = createStore({
    modules: {
        instructors: instructorsModule,
    }
})

export default store;