export default {
    login({commit}, {status, userId, role, email}) {
        commit('SET_LOGIN_STATUS', status);
        commit('SET_USER_ID', userId);
        commit('SET_ROLE', role);
        commit('SET_EMAIL', email);
    }, 
    logout({commit}) {
        commit('LOGOUT');
    }
}