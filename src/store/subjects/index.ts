import {GetSubjectResponse} from '@/dto/response/getSubjectResponse';
import {defineStore} from 'pinia';
import {useInstructorsOrStudentsStore} from "@/store/instructorsOrStudents";
import {useLoginStore} from "@/store/login";
import {SUBJECTS_ENDPOINT} from "@/store";

export interface SubjectsState {
    instructorGUIDToSubjectsMap: Record<string, GetSubjectResponse[]>
}

export const useSubjectsStore = defineStore('subjects', {
    state: (): SubjectsState => ({
        instructorGUIDToSubjectsMap: {}
    }),
    getters: {
        getSubjectsByInstructorGUID: (state) => (instructorGUID: string) => {
            if (instructorGUID in state.instructorGUIDToSubjectsMap) {
                return state.instructorGUIDToSubjectsMap[instructorGUID];
            } else {
                return [];
            }
        },
        hasSubjectsByInstructorGUID: (state) => (instructorGUID: string) => {
            if (instructorGUID in state.instructorGUIDToSubjectsMap) {
                const list = state.instructorGUIDToSubjectsMap[instructorGUID];
                return !((Array.isArray(list)) && list.length > 0);
            } else {
                return false;
            }
        }
    },
    actions: {
        async setSubjects() {
            const loginStore = useLoginStore();
            const instructorsStore = useInstructorsOrStudentsStore();
            if (loginStore.isStudent) {
                for (const instructor of instructorsStore.getSubscribedInstructors) {
                    const response: Response = await fetch(SUBJECTS_ENDPOINT + instructor.userGUID, {
                        method: 'GET',
                        credentials: 'include'
                    });

                    if (response.ok) {
                        this.instructorGUIDToSubjectsMap[instructor.userGUID] = await response.json();
                    }
                }
            } else {
                const response: Response = await fetch(SUBJECTS_ENDPOINT + loginStore.getUserGUID, {
                    method: 'GET',
                    credentials: 'include'
                });
                if (response.ok) {
                    this.instructorGUIDToSubjectsMap[loginStore.getUserGUID] = await response.json();
                }
            }
        }
    },
})
