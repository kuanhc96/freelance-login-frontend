export default {
    SET_SUBSCRIBED_INSTRUCTORS(state, instructors) {
        state.instructors = instructors;
    },
    SET_UNSUBSCRIBED_INSTRUCTORS(state, instructors) {
        state.unsubscribedInstructors = instructors;
    },
    SET_ALL_INSTRUCTORS(state, instructors) {
        state.allInstructors = instructors;
    },
    SUBSCRIBE_TO_INSTRUCTOR(state, instructorGUID) {
        const index = state.unsubscribedInstructors.findIndex(instructor => instructor.instructorGUID === instructorGUID);
        state.unsubscribedInstructors.splice(index, 1);
    },
    UNSUBSCRIBE_FROM_INSTRUCTOR(state, instructorGUID) {
        const index = state.instructors.findIndex(instructor => instructor.instructorGUID === instructorGUID);
        state.instructors.splice(index, 1);
    },
};