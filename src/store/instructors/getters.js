export default {
    instructors(state) {
        return state.instructors;
    },
    hasInstructors(state) {
        return state.instructors && state.instructors.length > 0;
    },
    allInstructors(state) {
        return state.allInstructors;
    },
    hasAllInstructors(state) {
        return state.allInstructors && state.allInstructors.length > 0;
    }
};