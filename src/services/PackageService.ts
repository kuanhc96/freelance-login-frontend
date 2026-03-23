import {CreatePackageResponse} from "@/dto/response/createPackageResponse";
import {CreatePackageRequest} from "@/dto/request/createPackageRequest";
import resourceServerClient from "@/services/clients/apiClient";
import {PACKAGES_BY_SUBJECT_ENDPOINT, PACKAGES_ENDPOINT} from "@/store";
import {GetPackageResponse} from "@/dto/response/getPackageResponse";

export default {
    createPackage(subjectGUID: string, numberOfLessons: number, discountCode: string, discountRate: number): Promise<CreatePackageResponse> {
        const request: CreatePackageRequest = {
            subjectGUID: subjectGUID,
            numberOfLessons: numberOfLessons,
            discountCode: discountCode,
            discountRate: discountRate
        }
        return resourceServerClient.post(PACKAGES_ENDPOINT, request);
    },
    getPackagesBySubjectGUID(subjectGUID: string): Promise<GetPackageResponse[]> {
        return resourceServerClient.get(PACKAGES_BY_SUBJECT_ENDPOINT + '/' + subjectGUID);
    }
}
