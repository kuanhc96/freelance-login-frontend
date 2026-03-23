import bffServerClient from "@/services/clients/bffClient";
import {LoginResponse} from "@/dto/response/loginResponse";

export default {
    checkLogin(): Promise<LoginResponse> {
        return bffServerClient.get('/api/oauth/status');
    },
    logout(): Promise<void> {
        return bffServerClient.post('/api/oauth/logout');
    },
    tokenLogin(): Promise<any> {
        const urlString: string = window.location.search;
        return bffServerClient.post('/api/oauth/tokens' + urlString, null, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
    }
}
