import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    namespaced: true,
    state() {
        return {
            isLoggedIn: false,
            userId: '',
            role: '',
            email: ''
        }
    },
    mutations,
    actions,
    getters
}
