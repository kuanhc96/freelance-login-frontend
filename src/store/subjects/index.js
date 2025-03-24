import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    namespaced: true,
    state() {
        return {
            subjects: [
                {
                    subjectName: '1-1 golf 60 minutes',
                    instructorName: 'Alice Ho',
                    price: 3000
                }
            ]
        }
    },
    mutations,
    actions,
    getters
}

