import apiClient from "@/services/apiClient";
import {
    SUBSCRIBED_INSTRUCTORS_ENDPOINT,
    SUBSCRIBED_STUDENTS_ENDPOINT,
    UNSUBSCRIBED_INSTRUCTORS_ENDPOINT
} from "@/store";
import {GetUserResponse} from "@/dto/response/getUserResponse";

export default {
    getSubscribedStudents(instructorGUID: string) {
        return apiClient.get<GetUserResponse[]>(SUBSCRIBED_STUDENTS_ENDPOINT + '/' + instructorGUID);
    },
    getSubscribedInstructors(studentGUID: string) {
        return apiClient.get<GetUserResponse[]>(SUBSCRIBED_INSTRUCTORS_ENDPOINT + '/' + studentGUID);
    },
    getUnsubscribedInstructors(studentGUID: string) {
        return apiClient.get<GetUserResponse[]>(UNSUBSCRIBED_INSTRUCTORS_ENDPOINT + '/' + studentGUID);
    }
}
