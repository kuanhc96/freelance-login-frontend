import { GetTransactionResponse } from '@/dto/response/getTransactionResponse';
import { defineStore } from 'pinia';
import {useLoginStore} from "@/store/login";
import {TRANSACTIONS_ENDPOINT} from "@/store";

export interface TransactionsState {
    transactions: GetTransactionResponse[]
}

export const useTransactionsStore = defineStore('transactions', {
    state: (): TransactionsState => ({
        transactions: [],
    }),
    getters: {
        getTransactions: (state)  => {
            return state.transactions;
        }
    },
    actions: {
        async setTransactions() {
            const loginStore = useLoginStore();
            let transactionsEndpoint = TRANSACTIONS_ENDPOINT;
            if (loginStore.isStudent) {
                transactionsEndpoint += 'student/' + loginStore.getUserGUID;
            } else {
                transactionsEndpoint += 'instructor/' + loginStore.getUserGUID;
            }
            const response: Response = await fetch(transactionsEndpoint, {
                method: 'GET',
                credentials: 'include'
            })
            if (response.ok) {
                this.transactions = await response.json();
            }
        }
    }
})
