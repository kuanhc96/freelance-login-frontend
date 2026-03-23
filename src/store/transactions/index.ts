import { GetTransactionResponse } from '@/dto/response/getTransactionResponse';
import { defineStore } from 'pinia';
import {useLoginStore} from "@/store/login";
import TransactionService from "@/services/TransactionService";

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
            this.transactions = await TransactionService.getTransactionsByUserGUID(loginStore.getUserGUID);
        }
    }
})
