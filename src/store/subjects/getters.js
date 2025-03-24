export default {
    subjects(state) {
        return state.subjects;
    },
    hasSubjects(state) {
        return state.subjects && state.subjects.length > 0;
    }
};
