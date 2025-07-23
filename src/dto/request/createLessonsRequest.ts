import {GetLessonResponse} from "@/dto/response/getLessonResponse";

export interface CreateLessonsRequest {
    precreatedLessons: GetLessonResponse[],
    studentGUID: string,
    instructorGUID: string,
    subjectGUID: string,
    packageGUID: string,
}
