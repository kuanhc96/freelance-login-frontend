export default {
    setInstructors({commit}, {instructors}) {
        commit('SET_SUBSCRIBED_INSTRUCTORS', instructors);
    },
    setAllInstructors({commit}, {allInstructors}) {
        commit('SET_ALL_INSTRUCTORS', allInstructors)
    }
};
