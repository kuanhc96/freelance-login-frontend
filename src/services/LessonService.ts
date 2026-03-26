import resourceServerClient from "@/services/clients/apiClient";
import {LESSONS_ENDPOINT} from "@/store";
import {GetLessonResponse} from "@/dto/response/getLessonResponse";
import {PrecreateLessonsRequest} from "@/dto/request/precreateLessonsRequest";
import {CreateLessonsResponse} from "@/dto/response/createLessonsResponse";
import {CreateLessonsRequest} from "@/dto/request/createLessonsRequest";

export default {
    getLessonsByStudentGUID(studentGUID: string): Promise<GetLessonResponse[]> {
        return resourceServerClient.get(LESSONS_ENDPOINT + '?studentGUID=' + studentGUID);
    },
    getLessonsByInstructorGUID(instructorGUID: string): Promise<GetLessonResponse[]> {
        return resourceServerClient.get(LESSONS_ENDPOINT + '?instructorGUID=' + instructorGUID);
    },
    createDraftLessons(studentGUID: string, instructorGUID: string, startDate: string, locationGUID: string, subjectGUID: string, packageGUID: string, lessonFrequency: string): Promise<GetLessonResponse[]> {
        const request: PrecreateLessonsRequest = {
            studentGUID: studentGUID,
            instructorGUID: instructorGUID,
            startDate: startDate,
            locationGUID: locationGUID,
            subjectGUID: subjectGUID,
            packageGUID: packageGUID,
            lessonFrequency: lessonFrequency
        }

        return resourceServerClient.post(LESSONS_ENDPOINT + '/draft', request);
    },
    createLessons(studentGUID: string, instructorGUID: string, subjectGUID: string, packageGUID: string, draftLessons: GetLessonResponse[]): Promise<CreateLessonsResponse> {
        const request: CreateLessonsRequest = {
            studentGUID: studentGUID,
            instructorGUID: instructorGUID,
            subjectGUID: subjectGUID,
            packageGUID: packageGUID,
            precreatedLessons: draftLessons,
        }
        return resourceServerClient.post(LESSONS_ENDPOINT, request);
    }
}
