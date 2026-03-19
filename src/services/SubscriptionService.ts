import apiClient from "@/services/apiClient";
import {
    SUBSCRIBED_INSTRUCTORS_ENDPOINT,
    SUBSCRIBED_STUDENTS_ENDPOINT, SUBSCRIPTION_ENDPOINT,
    UNSUBSCRIBED_INSTRUCTORS_ENDPOINT
} from "@/store";
import {GetUserResponse} from "@/dto/response/getUserResponse";
import {CreateSubscriptionRequest} from "@/dto/request/createSubscriptionRequest";

export default {
    getSubscribedStudents(instructorGUID: string) {
        return apiClient.get<GetUserResponse[]>(SUBSCRIBED_STUDENTS_ENDPOINT + '/' + instructorGUID);
    },
    getSubscribedInstructors(studentGUID: string) {
        return apiClient.get<GetUserResponse[]>(SUBSCRIBED_INSTRUCTORS_ENDPOINT + '/' + studentGUID);
    },
    getUnsubscribedInstructors(studentGUID: string) {
        return apiClient.get<GetUserResponse[]>(UNSUBSCRIBED_INSTRUCTORS_ENDPOINT + '/' + studentGUID);
    },
    subscribe(studentGUID: string, instructorGUID: string) {
        const body: CreateSubscriptionRequest = {
            'studentGUID': studentGUID,
            'instructorGUID': instructorGUID
        }
        return apiClient.post<boolean>(SUBSCRIPTION_ENDPOINT, body);
    },
    unsubscribe(studentGUID: string, instructorGUID: string) {
        return apiClient.delete<boolean>(SUBSCRIPTION_ENDPOINT + "?studentGUID=" + studentGUID + "&instructorGUID" + instructorGUID);
    }
}
