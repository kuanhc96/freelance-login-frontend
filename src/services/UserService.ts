import {USERS_ENDPOINT} from "@/store";
import {GetUserResponse} from "@/dto/response/getUserResponse";
import resourceServerClient from "@/services/apiClient";

export default {
    getUserInfo(userGUID: string) {
        return resourceServerClient.get<GetUserResponse>(USERS_ENDPOINT + '/' + userGUID);
    }
}
