import {GetLessonResponse} from '@/dto/response/getLessonResponse'
import {defineStore} from 'pinia';
import {LESSONS_ENDPOINT} from "@/store";
import {useLoginStore} from "@/store/login";
import LessonService from "@/services/LessonService";

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
            this.studentGUIDToLessonsMap[loginStore.getUserGUID] = await LessonService.getLessonsByStudentGUID(loginStore.getUserGUID);
        },
        async setLessonsByInstructorGUID() {
            const loginStore = useLoginStore();
            this.instructorGUIDToLessonsMap[loginStore.getUserGUID] = await LessonService.getLessonsByInstructorGUID(loginStore.getUserGUID);
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
