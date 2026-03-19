import bffServerClient from "@/services/bffClient";
import {LoginResponse} from "@/dto/response/loginResponse";

export default {
    checkLogin() {
        return bffServerClient.get<LoginResponse>('/api/oauth/status');
    },
    logout() {
        return bffServerClient.post('/api/oauth/logout');
    },
    tokenLogin() {
        const urlString: string = window.location.search;
        return bffServerClient.post('/api/oauth/tokens' + urlString, null, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
    }
}
