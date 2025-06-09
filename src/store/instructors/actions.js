export default {
    setInstructors({commit}, {instructors}) {
        commit('SET_SUBSCRIBED_INSTRUCTORS', instructors);
    },
    setUnsubscribedInstructors({commit}, {unsubscribedInstructors}) {
        commit('SET_UNSUBSCRIBED_INSTRUCTORS', unsubscribedInstructors)
    },
    setAllInstructors({commit}, {allInstructors}) {
        commit('SET_ALL_INSTRUCTORS', allInstructors)
    },
    unsubscribeFromInstructor({commit}, {instructorGUID}) {
        commit('UNSUBSCRIBE_FROM_INSTRUCTOR', instructorGUID)
    },
    subscribeToInstructor({commit}, {instructorGUID}) {
        commit('SUBSCRIBE_TO_INSTRUCTOR', instructorGUID)
    },

};
