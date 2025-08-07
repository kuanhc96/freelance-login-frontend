<script setup lang="ts">
import Cookies from "js-cookie";
import {reactive, defineProps, inject} from "vue";
import {PACKAGES_ENDPOINT} from "@/store";
import {usePackagesStore} from "@/store/packages";

const disableToggle = inject('disableToggle');

const packagesStore = usePackagesStore();

const props = defineProps({
    subjectGUID: {
        type: String,
        required: true
    }
})

const state = reactive({
    percentOff: 0,
    discountCode: '',
    numberOfLessons: 1,
})

async function registerPackage() {
    const csrfToken = Cookies.get('XSRF-TOKEN');
    const createPackageRequest = {
        subjectGUID: props.subjectGUID,
        discountCode: state.discountCode,
        numberOfLessons: state.numberOfLessons,
        discountRate: 1 - state.percentOff / 100
    };

    const response: Response = await fetch(PACKAGES_ENDPOINT + 'createPackage', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': csrfToken
        },
        body: JSON.stringify(createPackageRequest)
    });

    if (response.ok) {
        await packagesStore.setPackages();
    }
}

</script>

<template>
    <button
        class="badge btn text-bg-primary text-dark fs-7 mx-2"
        data-bs-target="#addPackageModal"
        data-bs-toggle="modal"
        :disabled="disableToggle"
    >
        + Add
    </button>
    <div class="modal fade" id="addPackageModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">New Package</h1>
                    <button class="btn btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form action="" @submit.prevent="registerPackage">
                        <div class="d-flex justify-content-center m-3">
                            <div class="col-md-4">
                                <label for="packageDiscountCodeInput" class="form-label fs-5">New Discount Code</label>
                            </div>
                            <div class="col-md-6">
                                <input
                                    type="text"
                                    class="form-control"
                                    id="packageDiscountCodeInput"
                                    placeholder="Discount Code"
                                    v-model="state.discountCode"
                                />
                            </div>
                        </div>
                        <div class="d-flex justify-content-center m-3">
                            <div class="col-md-4">
                                <label for="numberOfLessonsInput" class="form-label fs-5">Number Of Lessons</label>
                            </div>
                            <div class="col-md-6">
                                <input
                                    type="text"
                                    class="form-control"
                                    id="numberOfLessonsInput"
                                    placeholder="Discount Code"
                                    v-model="state.numberOfLessons"
                                />
                            </div>
                        </div>
                        <div class="d-flex justify-content-center m-3">
                            <div class="col-md-4">
                                <label for="discountRateInput" class="form-label fs-5">Percent Off</label>
                            </div>
                            <div class="col-md-6">
                                <input
                                    type="text"
                                    class="form-control"
                                    id="discountRateInput"
                                    placeholder="10"
                                    v-model="state.percentOff"
                                >
                            </div>
                        </div>
                        <div class="d-flex justify-content-center m-3">
                            <div class="col-md-8">
                                <div class="d-grid">
                                    <button
                                        @click="registerPackage"
                                        type="button"
                                        class="btn btn-secondary"
                                    >
                                        Register New Package
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>

</style>
