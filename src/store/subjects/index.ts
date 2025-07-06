import { GetSubjectResponse } from '@/dto/response/getSubjectResponse';
import { defineStore } from 'pinia';

export interface SubjectsState {
    instructorGUIDToSubjectsMap: Record<string, GetSubjectResponse[]>
}

export interface AddSubjectPayload {
    instructorGUID: string
    subjects: GetSubjectResponse[]
}

export const useSubjectsStore = defineStore('subjects', {
    state: (): SubjectsState => ({
        instructorGUIDToSubjectsMap: {}
    }),
    getters: {
        getSubjectsByInstructorGUID: (state) => (instructorGUID: string) => { return state.instructorGUIDToSubjectsMap[instructorGUID] },
        hasSubjectsByInstructorGUID: (state) => (instructorGUID: string) => {
            const list = state.instructorGUIDToSubjectsMap[instructorGUID];
            return !((Array.isArray(list)) && list.length > 0);
        }
    },
    actions: {
        addSubjects(payload: AddSubjectPayload) {
            this.instructorGUIDToSubjectsMap[payload.instructorGUID] = payload.subjects;
        }
    }
})
