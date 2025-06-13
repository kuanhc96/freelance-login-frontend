export default {
    namespaced: true,
    state() {
        return {
            announcements: []
        }
    },
    getters: {
        getAnnouncements: state => state.announcements,
    },
    mutations: {
        SET_ANNOUNCEMENTS(state, announcements) {
            state.announcements = announcements;
        }
    },
    actions: {
        setAnnouncements({commit}, {announcements}) {
            commit('SET_ANNOUNCEMENTS', announcements)
        }
    }
}