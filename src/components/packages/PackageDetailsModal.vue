<script setup lang="ts">
import {GetPackageResponse} from "@/dto/response/getPackageResponse";
import {PropType, defineProps} from "vue";
const props = defineProps({
    package: {
        type: Object as PropType<GetPackageResponse>,
        required: true,
    }
})
</script>
<template>
    <span
        class="badge btn text-bg-light fs-7 mx-2"
        :data-bs-target="'#modal'+ props.package.packageGUID"
        data-bs-toggle="modal"
    >
        {{package.discountCode}}
    </span>
    <div class="modal fade" :id="'modal' + props.package.packageGUID">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">{{props.package.discountCode}}</h1>
                    <button class="btn btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="d-flex justify-content-between align-items-center flex-column">
                        <div class="col-md-10 md-10">
                            <div class="row w-10">
                                <h5>Number of Lessons: </h5>
                                <span>{{props.package.numberOfLessons}}</span>
                            </div>
                            <div class="row w-10">
                                <h5>Percent Off: </h5>
                                <span>{{100 - props.package.discountRate * 100}}%</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer d-flex justify-content-between">
                    <button class="btn btn-danger inactive">Delete</button>
                    <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>

</style>
