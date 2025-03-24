import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    namespaced: true,
    state() {
        return {
            instructors: [
                {
                    instructorName: 'Alice Ho',
                    email: 'example@test.com',
                    instructorGUID: 'Test1234'
                }
            ]
        }
    },
    mutations,
    actions,
    getters
}
