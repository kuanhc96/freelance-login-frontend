<script lang="ts">

import { defineComponent, PropType, Ref, computed } from 'vue'
import { GetTransactionResponse } from '@/dto/response/getTransactionResponse'
import TransactionDetailsModal from "@/components/transactions/TransactionDetailsModal.vue";
import { useLoginStore } from "@/store/login";

export default defineComponent({
    name: 'TransactionTable',
    components: {
        TransactionDetailsModal
    },
    props: {
        transactions: Array as PropType<GetTransactionResponse[]>,
    },
    setup() {
        const loginStore = useLoginStore();
        const isStudent: Ref<boolean> = computed(function() {
            return loginStore.isStudent;
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

        function getHumanReadablePercentage(value: number) {
            return (100*value).toPrecision(2);
        }

        async function cancelTransaction() {

        }

        return {
            isStudent,
            getHumanReadableDate,
            getHumanReadablePercentage,
            cancelTransaction
        }
    }

})
</script>

<template>
    <table
        v-if="transactions.length > 0"
        class="table-hover w-100">
        <thead>
        <tr>
            <th scope="col"></th>
            <th scope="col">#</th>
            <th scope="col">{{isStudent? 'Instructor' : 'Student'}}</th>
            <th scope="col">Subject</th>
            <th scope="col">#Lessons</th>
            <th scope="col">Payment</th>
            <th scope="col">Creation</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="(transaction, index) in transactions"
            :key="transaction.transactionGUID"
        >
            <td><button
                type="button"
                @click="cancelTransaction"
                class="btn btn-secondary badge"
            >Cancel</button></td>
            <th scope="row">{{ index }}</th>
            <td>{{ isStudent? transaction.instructorName : transaction.studentName}}</td>
            <td>{{transaction.subjectName}}</td>
            <td>{{transaction.numberOfLessons}}</td>
            <td>{{transaction.paymentAmount}}</td>
            <td>{{getHumanReadableDate(transaction.creationDate)}}</td>
            <td><button
                class="btn btn-primary badge"
                data-bs-toggle="modal"
                :data-bs-target="'#modal' + transaction.transactionGUID"
            >View Details</button></td>
            <transaction-details-modal
                :transaction-g-u-i-d="transaction.transactionGUID"
                :subject-name="transaction.subjectName"
                :instructor-or-student-name="isStudent? transaction.instructorName : transaction.studentName"
                :payment-amount="transaction.paymentAmount"
                :number-of-lessons="transaction.numberOfLessons"
                :percent-off="getHumanReadablePercentage(1 - transaction.discountRate)"
                :discount-code="transaction.discountCode"
                :date="getHumanReadableDate(transaction.creationDate)"
                :subject-description="transaction.subjectDescription"
            ></transaction-details-modal>
        </tr>
        </tbody>
    </table>
    <div v-else>
        No Transactions to Display
    </div>

</template>
