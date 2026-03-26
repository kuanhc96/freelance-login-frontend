import {
    SUBSCRIBED_INSTRUCTORS_ENDPOINT,
    SUBSCRIBED_STUDENTS_ENDPOINT, SUBSCRIPTION_ENDPOINT,
    UNSUBSCRIBED_INSTRUCTORS_ENDPOINT
} from "@/store";
import {GetUserResponse} from "@/dto/response/getUserResponse";
import {CreateSubscriptionRequest} from "@/dto/request/createSubscriptionRequest";
import resourceServerClient from "@/services/clients/apiClient";

export default {
    getSubscribedStudents(instructorGUID: string): Promise<GetUserResponse[]> {
        return resourceServerClient.get(SUBSCRIBED_STUDENTS_ENDPOINT + '/' + instructorGUID);
    },
    getSubscribedInstructors(studentGUID: string): Promise<GetUserResponse[]> {
        return resourceServerClient.get(SUBSCRIBED_INSTRUCTORS_ENDPOINT + '/' + studentGUID);
    },
    getUnsubscribedInstructors(studentGUID: string): Promise<GetUserResponse[]> {
        return resourceServerClient.get(UNSUBSCRIBED_INSTRUCTORS_ENDPOINT + '/' + studentGUID);
    },
    subscribe(studentGUID: string, instructorGUID: string): Promise<boolean> {
        const body: CreateSubscriptionRequest = {
            'studentGUID': studentGUID,
            'instructorGUID': instructorGUID
        }
        return resourceServerClient.post(SUBSCRIPTION_ENDPOINT, body);
    },
    unsubscribe(studentGUID: string, instructorGUID: string): Promise<boolean> {
        return resourceServerClient.delete(SUBSCRIPTION_ENDPOINT + "?studentGUID=" + studentGUID + "&instructorGUID" + instructorGUID);
    }
}
