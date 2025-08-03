<script lang="ts">

import {defineComponent, PropType} from "vue";
import {GetSubjectResponse} from "@/dto/response/getSubjectResponse";

export default defineComponent({
    name: 'SubjectDetailsModal',
    props: {
        subject: {
            type: Object as PropType<GetSubjectResponse>,
            required: true
        }
    }
})
</script>

<template>
    <span
        class="badge btn text-bg-secondary text-white fs-7 mx-2"
        :data-bs-target="'#modal' + subject.subjectGUID"
        data-bs-toggle="modal"
    >
        {{subject.subjectName}}
    </span>
    <div class="modal fade" :id="'modal' + subject.subjectGUID">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">{{subject.subjectName}}</h1>
                    <button class="btn btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="d-flex justify-content-between align-items-center flex-column">
                        <div class="col-md-10 md-10">
                            <div class="row w-10">
                                <h5>Instructor: </h5>
                                <span>{{subject.instructorName}}</span>
                            </div>
                            <div class="row w-10">
                                <h5>Price: </h5>
                                <span>{{subject.price}}</span>
                            </div>
                            <div class="row w-10">
                                <h5>Description: </h5>
                                <span>{{subject.subjectDescription}}</span>
                            </div>
                            <div class="row w-10">
                                <h5>Duration: </h5>
                                <span>{{subject.duration}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
