import resourceServerClient from "@/services/clients/apiClient";
import {GetSubjectResponse} from "@/dto/response/getSubjectResponse";
import {SUBJECTS_ENDPOINT} from "@/store";
import {CreateSubjectRequest} from "@/dto/request/createSubjectRequest";
import {CreateSubjectResponse} from "@/dto/response/createSubjectResponse";

export default {
    getSubjectsByUserGUID(userGUID: string): Promise<GetSubjectResponse[]> {
        return resourceServerClient.get(SUBJECTS_ENDPOINT + '/' + userGUID);
    },
    createSubject(subjectName: string, instructorGUID: string, price: number, duration: number, description: string): Promise<CreateSubjectResponse> {
        const createSubjectRequest: CreateSubjectRequest = {
            subjectName: subjectName,
            instructorGUID: instructorGUID,
            price: price,
            duration: duration,
            subjectDescription: description,
        }
        return resourceServerClient.post(SUBJECTS_ENDPOINT,  createSubjectRequest);
    }
}
