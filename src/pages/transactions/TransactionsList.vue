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
                            <table class="table-hover w-100">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Student</th>
                                    <th scope="col">Instructor</th>
                                    <th scope="col">Subject</th>
                                    <th scope="col">Details</th>
                                    <th scope="col">Code</th>
                                    <th scope="col">#Lessons</th>
                                    <th scope="col">% Off</th>
                                    <th scope="col">Payment</th>
                                    <th scope="col">Creation</th>
                                    <th scope="col">Completion</th>
                                    <th scope="col">Cancellation</th>
                                    <th scope="col">Comments</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr
                                    v-for="(transaction, index) in pendingTransactions"
                                    :key="transaction.transactionGUID"
                                >
                                    <th scope="row">{{ index }}</th>
                                    <td>{{transaction.studentName}}</td>
                                    <td>{{transaction.instructorName}}</td>
                                    <td>{{transaction.subjectName}}</td>
                                    <td>{{transaction.subjectDescription}}</td>
                                    <td>{{transaction.discountCode}}</td>
                                    <td>{{transaction.numberOfLessons}}</td>
                                    <td>{{1.00 - transaction.discountRate}}</td>
                                    <td>{{transaction.paymentAmount}}</td>
                                    <td>{{getHumanReadableDate(transaction.creationDate)}}</td>
                                    <td>{{getHumanReadableDate(transaction.confirmedDate)}}</td>
                                    <td>{{getHumanReadableDate(transaction.canceledDate)}}</td>
                                    <td>{{transaction.comments}}</td>
                                    <td><button class="btn btn-secondary badge">Do Something</button></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <!--                            list of completed transactions -->
                        <div
                            class="tab-pane fade"
                            :class="{show: activeTab === 'completed', active: activeTab === 'completed'}"
                            id="nav-completed"
                            role="tabpanel"
                        >
                            <table class="table-hover">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Student Name</th>
                                    <th scope="col">Instructor Name</th>
                                    <th scope="col">Course Subject</th>
                                    <th scope="col">Subject Desc</th>
                                    <th scope="col">Discount Code</th>
                                    <th scope="col">Number of Lessons</th>
                                    <th scope="col">% Off</th>
                                    <th scope="col">Payment Amount</th>
                                    <th scope="col">Creation Date</th>
                                    <th scope="col">Completion Date</th>
                                    <th scope="col">Cancellation Date</th>
                                    <th scope="col">Comments</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr
                                    v-for="(transaction, index) in completedTransactions"
                                    :key="transaction.transactionGUID"
                                >
                                    <th scope="row">{{ index }}</th>
                                    <td>{{transaction.studentName}}</td>
                                    <td>{{transaction.instructorName}}</td>
                                    <td>{{transaction.subjectName}}</td>
                                    <td>{{transaction.subjectDescription}}</td>
                                    <td>{{transaction.discountCode}}</td>
                                    <td>{{transaction.numberOfLessons}}</td>
                                    <td>{{1.00 - transaction.discountRate}}</td>
                                    <td>{{transaction.paymentAmount}}</td>
                                    <td>{{getHumanReadableDate(transaction.creationDate)}}</td>
                                    <td>{{getHumanReadableDate(transaction.confirmedDate)}}</td>
                                    <td>{{getHumanReadableDate(transaction.canceledDate)}}</td>
                                    <td>{{transaction.comments}}</td>
                                    <td><button class="btn btn-secondary badge">Do Something</button></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <!--                            list of pending transactions -->
                        <div
                            class="tab-pane fade"
                            :class="{show: activeTab === 'canceled', active: activeTab === 'canceled'}"
                            id="nav-canceled"
                            role="tabpanel"
                        >
                            <table class="table-hover">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Student Name</th>
                                    <th scope="col">Instructor Name</th>
                                    <th scope="col">Course Subject</th>
                                    <th scope="col">Subject Desc</th>
                                    <th scope="col">Discount Code</th>
                                    <th scope="col">Number of Lessons</th>
                                    <th scope="col">% Off</th>
                                    <th scope="col">Payment Amount</th>
                                    <th scope="col">Creation Date</th>
                                    <th scope="col">Completion Date</th>
                                    <th scope="col">Cancellation Date</th>
                                    <th scope="col">Comments</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr
                                    v-for="(transaction, index) in canceledTransactions"
                                    :key="transaction.transactionGUID"
                                >
                                    <th scope="row">{{ index }}</th>
                                    <td>{{transaction.studentName}}</td>
                                    <td>{{transaction.instructorName}}</td>
                                    <td>{{transaction.subjectName}}</td>
                                    <td>{{transaction.subjectDescription}}</td>
                                    <td>{{transaction.discountCode}}</td>
                                    <td>{{transaction.numberOfLessons}}</td>
                                    <td>{{1.00 - transaction.discountRate}}</td>
                                    <td>{{transaction.paymentAmount}}</td>
                                    <td>{{getHumanReadableDate(transaction.creationDate)}}</td>
                                    <td>{{getHumanReadableDate(transaction.confirmedDate)}}</td>
                                    <td>{{getHumanReadableDate(transaction.canceledDate)}}</td>
                                    <td>{{transaction.comments}}</td>
                                    <td><button class="btn btn-secondary badge">Do Something</button></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </base-card>
    </section>
</template>
<script lang="ts">
import {computed, defineComponent, ref, Ref} from 'vue';
import {GetTransactionResponse} from "@/dto/response/getTransactionResponse";
import {useTransactionsStore} from "@/store/transactions";
export default defineComponent({
    name: 'TransactionsList',
    setup() {
        const transactionsStore = useTransactionsStore();
        const activeTab: Ref<string> = ref('pending');
        const transactions: Ref<GetTransactionResponse[]> = computed(function() {
            return transactionsStore.getTransactions;
        });
        console.log(transactions);
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
        function getHumanReadableDate(dateString: string): string {
            if (dateString == null) {
                return '';
            }
            const date = new Date(dateString);
            const options: Intl.DateTimeFormatOptions = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };

            return date.toLocaleDateString('en-US', options);
        }

        async function refresh() {
            await transactionsStore.setTransactions();
        }

        return {
            activeTab,
            pendingTransactions,
            completedTransactions,
            canceledTransactions,
            refresh,
            getHumanReadableDate
        }
    }
});
</script>
