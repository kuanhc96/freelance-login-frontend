<template>
    <div class="modal fade" :id="'modal' + transactionGUID">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title">
                        {{ subjectName }} With {{ instructorOrStudentName }}
                    </h1>
                    <button class="btn btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="d-flex justify-content-center align-items-center">
                        <div class="row d-flex justify-content-between align-items-center w-100">
                            <div class="col-md-4">
                                <h5 class="fs-5">
                                    Course Subject
                                </h5>
                            </div>
                            <div class="col-md-6">
                                <span>{{subjectName}}</span>
                            </div>
                            <div class="col-md-10">
                                <p>{{subjectDescription}}</p>
                            </div>
                            <div class="col-md-4">
                                <h5 class="fs-5 ">
                                    {{ isStudent? 'Instructor' : 'Student' }}
                                </h5>
                            </div>
                            <div class="col-md-6">
                                <span>{{instructorOrStudentName}}</span>
                            </div>
                            <div class="col-md-4">
                                <h5 class="fs-5 ">
                                    Discount Code
                                </h5>
                            </div>
                            <div class="col-md-6">
                                <span>{{discountCode}}</span>
                            </div>
                            <div class="col-md-4">
                                <h5 class="fs-5">
                                    % Off
                                </h5>
                            </div>
                            <div class="col-md-6">
                                <span>{{percentOff}}</span>
                            </div>
                            <div class="col-md-4">
                                <h5 class="fs-5">
                                    Creation Date
                                </h5>
                            </div>
                            <div class="col-md-6">
                                <span>{{date}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, computed } from 'vue'
import {useLoginStore} from "@/store/login";
export default defineComponent({
    name: 'TransactionDetailsModal',
    props: {
        transactionGUID: String as PropType<string>,
        subjectName: String as PropType<string>,
        instructorOrStudentName: String as PropType<string>,
        numberOfLessons: Number as PropType<number>,
        paymentAmount: Number as PropType<number>,
        percentOff: String as PropType<string>,
        studentName: String as PropType<string>,
        instructorName: String as PropType<string>,
        discountCode: String as PropType<string>,
        subjectDescription: String as PropType<string>,
        date: String as PropType<string>
    },
    setup() {
        const loginStore = useLoginStore()
        const isStudent: Ref<boolean> = computed(function() {
            return loginStore.isStudent;
        })

        return {
            isStudent
        }
    }
})
</script>
