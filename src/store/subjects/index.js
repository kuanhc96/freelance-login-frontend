export default {
    namespaced: true,
    state() {
        return {
            subjects: [
                {
                    subjectName: 'golf',
                    instructorName: 'Alice Ho',
                    price: 3000
                },
                {
                    subjectName: 'english',
                    instructorName: 'Alice Ho',
                    price: 300
                },
                {
                    subjectName: '18 holes',
                    instructorName: 'Alice Ho',
                    price: 7000
                }
            ],
            instructorGUIDToSubjectsMap: new Map(),
        }
    },
    mutations: {
        ADD_SUBJECTS(state, { instructorGUID, subjects }) {
            state.instructorGUIDToSubjectsMap[instructorGUID] = subjects;
        }
    },
    actions: {
        addSubjects({commit}, {instructorGUID, subjects}) {
            commit('ADD_SUBJECTS', {instructorGUID, subjects});
        }
    },
    getters: {
        getSubjectsByInstructorGUID: (state) => (instructorGUID) => {
            return state.instructorGUIDToSubjectsMap[instructorGUID] || [];
        },
        hasSubjectsByInstructorGUID: (state) => (instructorGUID) => {
            const list = state.instructorGUIDToSubjectsMap[instructorGUID];
            return !(Array.isArray(list) && list.length > 0);
        }
    }
}

