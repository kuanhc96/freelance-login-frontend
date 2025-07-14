import {GetLessonResponse} from '@/dto/response/getLessonResponse'
import {defineStore} from 'pinia';
import {LESSONS_ENDPOINT} from "@/store";
import {useLoginStore} from "@/store/login";

export interface LessonsState {
    studentGUIDToLessonsMap: Record<string, GetLessonResponse[]>,
    instructorGUIDToLessonsMap: Record<string, GetLessonResponse[]>
}

export const useLessonsStore = defineStore('lessons', {
    state: (): LessonsState => ({
        studentGUIDToLessonsMap: {},
        instructorGUIDToLessonsMap: {},
    }),
    getters: {
        getLessonsByStudentGUID: (state) => (studentGUID: string) => {
            if (studentGUID in state.studentGUIDToLessonsMap) {
                return state.studentGUIDToLessonsMap[studentGUID];
            } else {
                return [];
            }
        },
        getLessonsByInstructorGUID: (state) => (instructorGUID: string) => {
            if (instructorGUID in state.instructorGUIDToLessonsMap) {
                return state.instructorGUIDToLessonsMap[instructorGUID]
            } else {
                 return [];
            }
        },
    },
    actions: {
        async setLessonsByStudentGUID() {
            const loginStore = useLoginStore();
            const response: Response = await fetch(LESSONS_ENDPOINT + "studentGUID=" + loginStore.getUserGUID, {
                method: 'GET',
                credentials: 'include',
            })

            if (response.ok) {
                this.studentGUIDToLessonsMap[loginStore.getUserGUID] = await response.json();
            }
        },
        async setLessonsByInstructorGUID() {
            const loginStore = useLoginStore();
            const response: Response = await fetch(LESSONS_ENDPOINT + "instructorGUID=" + loginStore.getUserGUID, {
                method: 'GET',
                credentials: 'include',
            })

            if (response.ok) {
                this.instructorGUIDToLessonsMap[loginStore.getUserGUID] = await response.json();
            }
        },
        async setLessons() {
            const loginStore = useLoginStore();
            if (loginStore.isStudent) {
                await this.setLessonsByStudentGUID();
            } else {
                await this.setLessonsByInstructorGUID();
            }
        }
    },
})
