import {GetSubjectResponse} from '@/dto/response/getSubjectResponse';
import {defineStore} from 'pinia';
import {useInstructorsStore} from "@/store/instructors";
import {SUBJECTS_ENDPOINT} from "@/store";

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
        async setSubjects() {
            const instructorsStore = useInstructorsStore();
            for (const instructor of instructorsStore.getSubscribedInstructors) {
                const response: Response = await fetch(SUBJECTS_ENDPOINT + instructor.userGUID, {
                    method: 'GET',
                    credentials: 'include'
                });

                if (response.ok) {
                    this.instructorGUIDToSubjectsMap[instructor.userGUID] = await response.json();
                }
            }
        }
    },
})
