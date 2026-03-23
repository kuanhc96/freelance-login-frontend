import {USERS_ENDPOINT} from "@/store";
import {GetUserResponse} from "@/dto/response/getUserResponse";
import resourceServerClient from "@/services/clients/apiClient";

export default {
    getUserInfo(userGUID: string): Promise<GetUserResponse> {
        return resourceServerClient.get(USERS_ENDPOINT + '/' + userGUID);
    }
}
