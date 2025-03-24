import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    namespaced: true,
    state() {
        return {
            subjects: [
                {
                    subjectName: 'golf',
                    instructorName: 'Alice Ho',
                    price: 3000
                },
                {
                    subjectName: 'english',
                    instructorName: 'Alice Ho',
                    price: 300
                },
                {
                    subjectName: 'holes',
                    instructorName: 'Alice Ho',
                    price: 7000
                }
            ]
        }
    },
    mutations,
    actions,
    getters
}

