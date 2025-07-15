<template>
    <section>
        <base-card :card-title="'Schedule Lesson'">
            <form action="" @submit.prevent="submitSchedule">
                <div class="d-flex justify-content-center m-3">
                    <div class="w-100 row d-flex justify-content-between align-items-center">
                        <div class="col-md-4">
                            <label class="form-label fs-5" for="instructorDropdown">Schedule Lesson With</label>
                        </div>
                        <div class="col-md-6">
                            <select
                                class="w-100 form-select"
                                id="instructorDropdown"
                                v-model="selectedInstructorGUID"
                            >
                                <option selected="">Select Instructor</option>
                                <option
                                    v-for="instructor in subscribedInstructors"
                                    :key="instructor.userGUID"
                                    :value="instructor.userGUID"
                                >{{ instructor.name }}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div
                    class="d-flex justify-content-center m-3"
                    v-if="selectedInstructorGUID !== ''"
                >
                    <div class="w-100 row d-flex justify-content-between align-items-center">
                        <div class="col-md-4">
                            <label class="form-label fs-5" for="subjectDropdown">Choose Course Subject</label>
                        </div>
                        <div class="col-md-6">
                            <select
                                class="w-100 form-select"
                                id="subjectDropdown"
                                v-model="selectedSubjectGUID"
                            >
                                <option selected="">Select Subject</option>
                                <option
                                    v-for="subject in subjects"
                                    :key="subject.subjectGUID"
                                    :value="subject.subjectGUID"
                                >{{ subject.subjectName }}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div
                    class="d-flex justify-content-center m-3"
                    v-if="selectedSubjectGUID !== ''"
                >
                    <div class="w-100 row d-flex justify-content-between align-items-center">
                        <div class="col-md-4">
                            <label for="packagesDropdown" class="form-label fs-5">Plan</label>
                        </div>
                        <div class="col-md-6">
                            <select
                                class="w-100 form-select"
                                id="packagesDropdown"
                                v-model="selectedPackageGUID"
                            >
                                <option selected="">Select Plan</option>
                                <option
                                    v-for="package_ in packages"
                                    :key="package_.packageGUID"
                                    :value="package_.packageGUID"
                                >{{ package_.discountCode }}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-center m-3">
                    <div class="w-100 row d-flex justify-content-between align-items-center">
                        <div class="col-md-4">
                            <label for="dateTimeInput" class="form-label fs-5">
                                Start Date &amp; Time
                            </label>
                        </div>
                        <div class="col-md-6">
                            <input
                                type="datetime-local"
                                id="dateTimeInput"
                                class="form-control"
                                v-model="inputDateTime"
                            >
                        </div>
                    </div>
                </div>
                <div
                    v-if="numberOfLessons > 0"
                    class="d-flex justify-content-center m-3"
                >
                    <div class="w-100 row d-flex justify-content-between align-items-center">
                        <div class="col-md-4">
                            <label for="frequency" class="form-label fs-5">Frequency</label>
                        </div>
                        <div class="col-md-6">
                            <select
                                class="w-100 form-select"
                                id="frequencyDropdown"
                                v-model="frequency"
                            >
                                <option selected="">Frequency</option>
                                <option value="DAILY">Daily</option>
                                <option value="WEEKLY">Weekly</option>
                                <option value="MONTHLY">Monthly</option>
                                <option value="NONE">Decide Later</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-center m-3">
                    <div class="w-100 row d-flex justify-content-between align-items-center">
                        <div class="col-md-4">
                            <label for="locationDropdown" class="form-label fs-5">Location</label>
                        </div>
                        <div class="col-md-6">
                            <select
                                class="w-100 form-select"
                                id="locationDropdown"
                                v-model="selectedLocation"
                            >
                                <option selected="">Location</option>
                                <option value="test1">Test1</option>
                                <option value="test2">Test2</option>
                                <option value="test3">Test3</option>
                                <option value="none">Decide Later</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="d-grid">
                    <button
                        @click="submitSchedule"
                        type="button"
                        class="btn btn-secondary"
                    >
                        Submit Schedule
                    </button>
                </div>
            </form>
        </base-card>
    </section>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue'
import { GetSubjectResponse } from "@/dto/response/getSubjectResponse";
import { useSubjectsStore } from "@/store/subjects";
import { useLoginStore } from "@/store/login";
import { useInstructorsOrStudentsStore } from '@/store/instructorsOrStudents';
import { usePackagesStore } from '@/store/packages';
import { useRouter } from 'vue-router';
import {GetUserResponse} from "@/dto/response/getUserResponse";
import {CreateLessonsRequest} from '@/dto/request/createLessonsRequest'
import Cookies from "js-cookie";
import {GetPackageResponse} from "@/dto/response/getPackageResponse";

export default defineComponent({
    name: 'ScheduleLessonForm',
    setup() {
        const subjectsStore = useSubjectsStore();
        const loginStore = useLoginStore();
        const instructorsStore = useInstructorsOrStudentsStore();
        const packagesStore = usePackagesStore();
        const router = useRouter();

        const selectedInstructorGUID: Ref<string> = ref('');
        const selectedSubjectGUID: Ref<string> = ref('');
        const selectedPackageGUID: Ref<string> = ref('');
        const inputDateTime: Ref<string> = ref('');
        const frequency: Ref<string> = ref('');
        const selectedLocation: Ref<string> = ref('');
        const userGUID: Ref<string> = computed(function() {
            return loginStore.getUserGUID;
        });
        const subscribedInstructors: Ref<GetUserResponse[]> = computed(function() {
            return instructorsStore.getSubscribedInstructors;
        });
        const subjects: Ref<GetSubjectResponse[]> = computed(function() {
            if (loginStore.isStudent) {
                return subjectsStore.getSubjectsByInstructorGUID(selectedInstructorGUID.value);
            } else {
                return subjectsStore.getSubjectsByInstructorGUID(userGUID.value);
            }
        });

        const packages: Ref<GetPackageResponse[]> = computed(function() {
            return packagesStore.getPackagesBySubjectGUID(selectedSubjectGUID.value)
        });

        const numberOfLessons: Ref<number> = computed(function() {
            const package_ = packages.value.find(package_ => package_.packageGUID === selectedPackageGUID.value);
            return package_?.numberOfLessons!;
        })

        async function submitSchedule(): Promise<void> {
            const csrfToken = Cookies.get('XSRF-TOKEN');
            const createLessonsRequest: CreateLessonsRequest = {
                studentGUID: userGUID.value,
                instructorGUID: selectedInstructorGUID.value,
                startDate: inputDateTime.value,
                location: selectedLocation.value,
                subjectGUID: selectedSubjectGUID.value,
                topic: 'testTopic',
                packageGUID: selectedPackageGUID.value,
                lessonFrequency: frequency.value
            };
            const response: Response = await fetch(
                'http://localhost:8081/lessons/createLessons', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-XSRF-TOKEN': csrfToken
                    },
                    body: JSON.stringify(createLessonsRequest)
                }
            );
            if (response.ok) {
                await router.push('/lessons')
            }
        }

        return {
            selectedInstructorGUID,
            selectedSubjectGUID,
            inputDateTime,
            selectedPackageGUID,
            numberOfLessons,
            frequency,
            selectedLocation,
            subjects,
            packages,
            subscribedInstructors,
            submitSchedule
        }
    }
})

</script>


