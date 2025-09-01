<script lang="ts">
import {defineComponent, Ref, computed, ref} from 'vue';
import {useSubjectsStore} from "@/store/subjects";
import {GetSubjectResponse} from "@/dto/response/getSubjectResponse";
import {useLoginStore} from "@/store/login";
import {CreatePackageRequest} from "@/dto/request/createPackageRequest";
import {PACKAGES_ENDPOINT} from "@/store";
import Cookies from "js-cookie";
import router from "@/router/router";
import {usePackagesStore} from "@/store/packages";
export default defineComponent({
    name: 'PackageRegistrationForm',
    setup() {
        const subjectsStore = useSubjectsStore();
        const packagesStore = usePackagesStore();
        const loginStore = useLoginStore();
        const selectedSubjectGUID: Ref<string> = ref('');
        const numberOfLessons: Ref<number> = ref(1);
        const discountCode: Ref<string> = ref('NONE');
        const percentOff: Ref<number> = ref(1.0);
        const subjects: Ref<GetSubjectResponse[]> = computed(function() {
            return subjectsStore.getSubjectsByInstructorGUID(loginStore.getUserGUID);
        })

        async function registerPackage() {
            const createPackageRequest: CreatePackageRequest = {
                subjectGUID: selectedSubjectGUID.value,
                numberOfLessons: numberOfLessons.value,
                discountCode: discountCode.value,
                discountRate: 1 - percentOff.value/100
            }
            const csrfToken = Cookies.get('XSRF-TOKEN');
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
                await router.push('/subjects');
            }
        }

        return {
            selectedSubjectGUID,
            numberOfLessons,
            discountCode,
            percentOff,
            subjects,
            registerPackage
        }
    }

})

</script>

<template>
<section>
    <base-card card-title="Register New Plan">
        <form action="" @submit.prevent="registerPackage">
            <div class="d-flex justify-content-center m-3">
                <div class="w-100 row d-flex justify-content-between align-items-center">
                    <div class="col-md-4">
                        <label for="subjectsDropdown" class="form-label fs-5">Associated Subject</label>
                    </div>
                    <div class="col-md-6">
                        <select
                            class="w-100 form-select"
                            id="subjectsDropdown"
                            v-model="selectedSubjectGUID"
                        >
                            <option selected="">Select Subject</option>
                            <option
                                v-for="subject in subjects"
                                :key="subject.subjectGUID"
                                :value="subject.subjectGUID"
                            >
                                {{ subject.subjectName }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-center m-3">
                <div class="col-md-4">
                    <label for="numberOfLessonsInput" class="form-label fs-5">Number Of Lessons</label>
                </div>
                <div class="col-md-6">
                    <input
                        type="number"
                        class="form-control"
                        id="numberOfLessonsInput"
                        placeholder="Subject Name"
                        value="1"
                        min="1"
                        step="1"
                        v-model="numberOfLessons"
                    />
                </div>
            </div>
            <div class="d-flex justify-content-center m-3">
                <div class="col-md-4">
                    <label for="discountCodeInput" class="form-label fs-5">New Discount Code</label>
                </div>
                <div class="col-md-6">
                    <input
                        type="text"
                        class="form-control"
                        id="discountCodeInput"
                        placeholder="NONE"
                        v-model="discountCode"
                    />
                </div>
            </div>
            <div class="d-flex justify-content-center m-3">
                <div class="col-md-4">
                    <label for="discountRateInput" class="form-label fs-5">Discount (% Off)</label>
                </div>
                <div class="col-md-6">
                    <input
                        type="number"
                        class="form-control"
                        id="discountRateInput"
                        value="10"
                        step="1"
                        max="99"
                        min="1"
                        v-model="percentOff"
                    />
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
                            Register New Plan
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </base-card>
</section>
</template>

<style scoped>

</style>
