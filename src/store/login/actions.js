export default {
    login({commit}, {status, userId, subscribedIds, role}) {
        commit('SET_LOGIN_STATUS', status);
        commit('SET_USER_ID', userId);
        commit('SET_SUBSCRIBED_INSTRUCTOR_IDS', subscribedIds);
        commit('SET_ROLE', role);
    }, 
    logout({commit}) {
        commit('LOGOUT');
    }
}