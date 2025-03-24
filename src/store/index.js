import { createStore } from 'vuex';
import instructorsModule from './instructors/index.js';
import subjectsModule from './subjects/index.js';

const store = createStore({
    modules: {
        instructors: instructorsModule,
        subjects: subjectsModule,
    }
})

export default store;