import {GetTransactionResponse} from "@/dto/response/getTransactionResponse";
import {useLoginStore} from "@/store/login";
import {TRANSACTIONS_ENDPOINT} from "@/store";
import resourceServerClient from "@/services/clients/apiClient";

export default {
    getTransactionsByUserGUID(userGUID: string): Promise<GetTransactionResponse[]> {
        const loginStore = useLoginStore();
        let transactionsEndpoint = TRANSACTIONS_ENDPOINT;
        if (loginStore.isStudent) {
            transactionsEndpoint += '/student' + '/' + userGUID;
        } else {
            transactionsEndpoint += '/instructor' + '/' + userGUID;
        }
        return resourceServerClient.get(transactionsEndpoint);
    }
}
