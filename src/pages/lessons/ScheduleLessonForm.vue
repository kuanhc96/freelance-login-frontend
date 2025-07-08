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
                <div class="d-flex justify-content-center m-3">
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
                <div class="d-flex justify-content-center m-3">
                    <div class="w-100 row d-flex justify-content-between align-items-center">
                        <div class="col-md-4">
                            <label for="repeat" class="form-label fs-5">Repeat</label>
                        </div>
                        <div class="col-md-6">
                            <input
                                type="number"
                                id="repeat"
                                min="0"
                                step="1"
                                class="form-control"
                                v-model="repeat"
                            >
                        </div>
                    </div>
                </div>
                <div
                    v-if="repeat > 0"
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
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                                <option value="none">Decide Later</option>
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
import { useInstructorsStore } from '@/store/instructors';
import {GetUserResponse} from "@/dto/response/getUserResponse";
import {CreateLessonRequest} from '@/dto/request/createLessonRequest'
import Cookies from "js-cookie";

export default defineComponent({
    name: 'ScheduleLessonForm',
    setup() {
        const subjectsStore = useSubjectsStore();
        const loginStore = useLoginStore();
        const instructorsStore = useInstructorsStore();
        const selectedInstructorGUID: Ref<string> = ref('');
        const selectedSubjectGUID: Ref<string> = ref('');
        const inputDateTime: Ref<string> = ref('');
        const repeat: Ref<number> = ref(0);
        const frequency: Ref<string> = ref('');
        const selectedLocation: Ref<string> = ref('');
        const userGUID: Ref<string> = computed(function() {
            return loginStore.getUserGUID;
        })
        const subscribedInstructors: Ref<GetUserResponse[]> = computed(function() {
            return instructorsStore.getSubscribedInstructors;
        })
        const role: Ref<string> = computed(function() {
            return loginStore.getRole;
        })
        const subjects: Ref<GetSubjectResponse[]> = computed(function() {
            if (role.value === 'INSTRUCTOR') {
                return subjectsStore.getSubjectsByInstructorGUID(userGUID.value);
            } else {
                return subjectsStore.getSubjectsByInstructorGUID(selectedInstructorGUID.value);
            }
        })

        async function submitSchedule(): Promise<void> {
            const csrfToken = Cookies.get('XSRF-TOKEN');
            console.log(selectedInstructorGUID.value)
            console.log(selectedSubjectGUID.value)
            console.log(inputDateTime.value)
            console.log(frequency.value)
            console.log(repeat.value)
            console.log(selectedLocation.value)
            const createLessonRequest: CreateLessonRequest = {
                studentGUID: userGUID.value,
                instructorGUID: selectedInstructorGUID.value,
                startDate: inputDateTime.value,
                location: selectedLocation.value,
                subject: selectedSubjectGUID.value,
                topic: 'testTopic',
                repeat: repeat.value,
                frequency: frequency.value
            };
            const response: Response = await fetch(
                'http://localhost:8081/lessons/createLesson', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-XSRF-TOKEN': csrfToken
                    },
                    body: JSON.stringify(createLessonRequest)
                }
            );
            console.log(response);
        }

        return {
            selectedInstructorGUID,
            selectedSubjectGUID,
            inputDateTime,
            repeat,
            frequency,
            selectedLocation,
            subjects,
            subscribedInstructors,
            submitSchedule
        }
    }
})

</script>


