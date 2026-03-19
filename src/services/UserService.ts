import {USERS_ENDPOINT} from "@/store";
import apiClient from "@/services/apiClient";
import {GetUserResponse} from "@/dto/response/getUserResponse";

export default {
    getUserInfo(userGUID: string) {
        return apiClient.get<GetUserResponse>(USERS_ENDPOINT + '/' + userGUID);
    }
}
