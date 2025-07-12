import { GetLessonResponse } from '@/dto/response/getLessonResponse'
import { defineStore } from 'pinia';

export interface LessonsState {
    studentGUIDToLessonsMap: Record<string, GetLessonResponse[]>,
    instructorGUIDToLessonsMap: Record<string, GetLessonResponse[]>
}

export interface AddLessonsPayload {
    userGUID: string,
    lessons: GetLessonResponse[]
}

export const useLessonsStore = defineStore('lessons', {
    state: (): LessonsState => ({
        studentGUIDToLessonsMap: {},
        instructorGUIDToLessonsMap: {},
    }),
    getters: {
        getLessonsByStudentGUID: (state) => (studentGUID: string) => { return state.studentGUIDToLessonsMap[studentGUID]},
        getLessonsByInstructorGUID: (state) => (instructorGUID: string) => { return state.instructorGUIDToLessonsMap[instructorGUID]},
    },
    actions: {
        addLessonsByStudentGUID(payload: AddLessonsPayload) {
            this.studentGUIDToLessonsMap[payload.userGUID] = payload.lessons;
        },
        addLessonsByInstructorGUID(payload: AddLessonsPayload) {
            this.instructorGUIDToLessonsMap[payload.userGUID] = payload.lessons;
        }
    },
})
