export default {
    login({commit}, {status, userId, role}) {
        commit('SET_LOGIN_STATUS', status);
        commit('SET_USER_ID', userId);
        commit('SET_ROLE', role);
    }, 
    logout({commit}) {
        commit('LOGOUT');
    }
}