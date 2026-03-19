import apiClient from "@/services/clients/apiClient";
import {GetTransactionResponse} from "@/dto/response/getTransactionResponse";
import {useLoginStore} from "@/store/login";
import {TRANSACTIONS_ENDPOINT} from "@/store";

export default {
    getTransactionsByUserGUID(userGUID: string) {
        const loginStore = useLoginStore();
        let transactionsEndpoint = TRANSACTIONS_ENDPOINT;
        if (loginStore.isStudent) {
            transactionsEndpoint += '/student' + '/' + userGUID;
        } else {
            transactionsEndpoint += '/instructor' + '/' + userGUID;
        }
        return apiClient.get<GetTransactionResponse[]>(transactionsEndpoint);
    }
}
