export default {
    SET_LOGIN_STATUS(state, status) {
        state.isLoggedIn = status;
    },
    SET_USER_ID(state, userId) {
        state.userId = userId;
    },
    SET_ROLE(state, role) {
        state.role = role;
    },
    LOGOUT(state) {
        state.isLoggedIn = false;
        state.userId = null;
        state.subscribedIds = [];
        state.role = null;
    }

}