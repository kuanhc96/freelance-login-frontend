<template>
    <section>
        <base-card
            card-title="Transactions"
            @refresh="refresh"
        >
            <div class="d-flex align-items-center flex-column">
                <div class="col-md-12 col-12">
                    <nav class="nav nav-tabs mt-3">
                        <router-link
                            class="nav-link"
                            :class="{active: activeTab === 'pending'}"
                            @click.prevent="activeTab = 'pending'"
                            id="nav-pending-tab"
                            to="#nav-pending"
                            role="tab"
                        >Pending</router-link>
                        <router-link
                            class="nav-link"
                            :class="{active: activeTab === 'completed'}"
                            @click.prevent="activeTab = 'completed'"
                            id="nav-completed-tab"
                            to="#nav-completed"
                            role="tab"
                        >Completed</router-link>
                        <router-link
                            class="nav-link"
                            :class="{active: activeTab === 'canceled'}"
                            @click.prevent="activeTab = 'canceled'"
                            id="nav-canceled-tab"
                            to="#nav-canceled"
                            role="tab"
                        >Canceled</router-link>
                    </nav>
                    <div class="tab-content bg-white" id="nav-tabContent">
                        <!--                            list of pending transactions -->
                        <div
                            class="tab-pane fade"
                            :class="{show: activeTab === 'pending', active: activeTab === 'pending'}"
                            id="nav-pending"
                            role="tabpanel"
                        >
                            <transaction-table
                                :transactions="pendingTransactions"
                            ></transaction-table>
                        </div>
                        <!--                            list of completed transactions -->
                        <div
                            class="tab-pane fade"
                            :class="{show: activeTab === 'completed', active: activeTab === 'completed'}"
                            id="nav-completed"
                            role="tabpanel"
                        >
                            <transaction-table
                                :transactions="completedTransactions"
                            ></transaction-table>
                        </div>
                        <!--                            list of pending transactions -->
                        <div
                            class="tab-pane fade"
                            :class="{show: activeTab === 'canceled', active: activeTab === 'canceled'}"
                            id="nav-canceled"
                            role="tabpanel"
                        >
                            <transaction-table
                                :transactions="canceledTransactions"
                            ></transaction-table>
                        </div>
                    </div>
                </div>
            </div>
        </base-card>
    </section>
</template>
<script lang="ts">
import {computed, defineComponent, ref, Ref} from 'vue';
import TransactionTable from "@/components/transactions/TransactionTable.vue";
import {GetTransactionResponse} from "@/dto/response/getTransactionResponse";
import {useTransactionsStore} from "@/store/transactions";
import {useLoginStore} from "@/store/login";

export default defineComponent({
    name: 'TransactionsList',
    components: {
        TransactionTable
    },
    setup() {
        const transactionsStore = useTransactionsStore();
        const loginStore = useLoginStore();
        const activeTab: Ref<string> = ref('pending');
        const transactions: Ref<GetTransactionResponse[]> = computed(function() {
            return transactionsStore.getTransactions;
        });
        const isStudent: Ref<boolean> = computed(function() {
            return loginStore.isStudent;
        })
        const pendingTransactions: Ref<GetTransactionResponse[]> = computed(function() {
            return transactions.value
                .filter(transaction => transaction.transactionStatus === 'PENDING');
        });
        const completedTransactions: Ref<GetTransactionResponse[]> = computed(function() {
            return transactionsStore.getTransactions
                .filter(transaction => transaction.transactionStatus === 'COMPLETED');
        });
        const canceledTransactions: Ref<GetTransactionResponse[]> = computed(function() {
            return transactionsStore.getTransactions
                .filter(transaction => transaction.transactionStatus === 'CANCELED');
        });

        async function refresh() {
            await transactionsStore.setTransactions();
        }

        return {
            activeTab,
            pendingTransactions,
            completedTransactions,
            canceledTransactions,
            isStudent,
            refresh,
        }
    }
});
</script>
