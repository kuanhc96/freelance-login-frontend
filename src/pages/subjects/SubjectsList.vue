<template>
    <section>
        <base-card
            :card-title="'Courses'"
            @refresh="refresh"
        >
            <ul v-if="isStudent">
                <subject-accordion
                    v-for="instructor in subscribedInstructors"
                    :key="instructor.userGUID"
                    :instructorGUID="instructor.userGUID"
                    :instructorName="instructor.name"
                    :subjects="getSubjectsByInstructorGUID(instructor.userGUID)"
                ></subject-accordion>
            </ul>
            <ul v-else>
                <div
                    v-if="!isStudent"
                    class="d-flex justify-content-around align-items-center m-3">
                    <router-link class="btn btn-primary" to="/subjects/register">Register New Course</router-link>
                    <router-link class="btn btn-secondary" to="/packages/register">Register New Course Plan</router-link>
                </div>
                <subject-accordion
                    :key="userGUID"
                    :instructorGUID="userGUID"
                    instructorName="Me"
                    :subjects="getSubjectsByInstructorGUID(userGUID)"
                ></subject-accordion>
            </ul>

        </base-card>
    </section>
</template>

<script lang="ts">
import SubjectAccordion from '@/components/subjects/SubjectAccordion.vue';
import { GetSubjectResponse } from '@/dto/response/getSubjectResponse';
import { GetUserResponse } from '@/dto/response/getUserResponse';
import {defineComponent, computed, Ref, onBeforeMount} from 'vue';
import { useLoginStore} from "@/store/login";
import { useInstructorsOrStudentsStore } from "@/store/instructorsOrStudents";
import { useSubjectsStore} from "@/store/subjects";
import {SUBJECTS_ENDPOINT, SUBSCRIBED_INSTRUCTORS_ENDPOINT} from "@/store";


export default defineComponent({
    name: 'SubjectsList',
    components: {
        SubjectAccordion
    },
    setup() {
        const loginStore = useLoginStore();
        const instructorsStore = useInstructorsOrStudentsStore();
        const subjectsStore = useSubjectsStore();
        const isStudent: Ref<boolean> = computed(function() {
            return loginStore.isStudent;
        });
        const userGUID: Ref<string> = computed(function() {
            return loginStore.getUserGUID;
        })
        const subscribedInstructorsEndpoint: Ref<string> = computed(function() {
            return SUBSCRIBED_INSTRUCTORS_ENDPOINT + loginStore.getUserGUID;
        })
        const subscribedInstructors: Ref<GetUserResponse[]> = computed(function() {
            return instructorsStore.getSubscribedInstructors;
        })
        function getSubjectsByInstructorEndpoint(instructorGUID: string): string {
            return SUBJECTS_ENDPOINT + instructorGUID;
        }
        function getSubjectsByInstructorGUID(instructorGUID: string): GetSubjectResponse[] {
            return subjectsStore.getSubjectsByInstructorGUID(instructorGUID);
        }

        async function refresh(): Promise<void> {
            await subjectsStore.setSubjects();
        }

        onBeforeMount(async(): Promise<void> => {
            await refresh();
        })

        return {
            isStudent,
            userGUID,
            subscribedInstructors,
            subscribedInstructorsEndpoint,
            refresh,
            getSubjectsByInstructorGUID,
            getSubjectsByInstructorEndpoint
        }
    },
})
</script>
