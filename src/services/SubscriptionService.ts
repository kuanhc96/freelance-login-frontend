import {
    SUBSCRIBED_INSTRUCTORS_ENDPOINT,
    SUBSCRIBED_STUDENTS_ENDPOINT, SUBSCRIPTION_ENDPOINT,
    UNSUBSCRIBED_INSTRUCTORS_ENDPOINT
} from "@/store";
import {GetUserResponse} from "@/dto/response/getUserResponse";
import {CreateSubscriptionRequest} from "@/dto/request/createSubscriptionRequest";
import resourceServerClient from "@/services/clients/apiClient";

export default {
    getSubscribedStudents(instructorGUID: string) {
        return resourceServerClient.get<GetUserResponse[]>(SUBSCRIBED_STUDENTS_ENDPOINT + '/' + instructorGUID);
    },
    getSubscribedInstructors(studentGUID: string) {
        return resourceServerClient.get<GetUserResponse[]>(SUBSCRIBED_INSTRUCTORS_ENDPOINT + '/' + studentGUID);
    },
    getUnsubscribedInstructors(studentGUID: string) {
        return resourceServerClient.get<GetUserResponse[]>(UNSUBSCRIBED_INSTRUCTORS_ENDPOINT + '/' + studentGUID);
    },
    subscribe(studentGUID: string, instructorGUID: string) {
        const body: CreateSubscriptionRequest = {
            'studentGUID': studentGUID,
            'instructorGUID': instructorGUID
        }
        return resourceServerClient.post<boolean>(SUBSCRIPTION_ENDPOINT, body);
    },
    unsubscribe(studentGUID: string, instructorGUID: string) {
        return resourceServerClient.delete<boolean>(SUBSCRIPTION_ENDPOINT + "?studentGUID=" + studentGUID + "&instructorGUID" + instructorGUID);
    }
}
