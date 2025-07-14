<template>
    <section>
        <base-card
            :card-title="'Courses'"
            @refresh="refresh"
        >
            <subject-summary
                v-for="instructor in subscribedInstructors"
                :key="instructor.userGUID"
                :instructorGUID="instructor.userGUID"
                :instructorName="instructor.name"
                :subjects="getSubjectsByInstructorGUID(instructor.userGUID)"
            ></subject-summary>

        </base-card>
    </section>
</template>

<script lang="ts">
import SubjectSummary from '@/components/subjects/SubjectAccordion.vue';
import { GetSubjectResponse } from '@/dto/response/getSubjectResponse';
import { GetUserResponse } from '@/dto/response/getUserResponse';
import {defineComponent, computed, Ref, onBeforeMount} from 'vue';
import { useLoginStore} from "@/store/login";
import { useInstructorsOrStudentsStore } from "@/store/instructorsOrStudents";
import { useSubjectsStore} from "@/store/subjects";


export default defineComponent({
    name: 'SubjectsList',
    components: {
        SubjectSummary
    },
    setup() {
        const loginStore = useLoginStore();
        const instructorsStore = useInstructorsOrStudentsStore();
        const subjectsStore = useSubjectsStore();
        const subscribedInstructorsEndpoint: Ref<string> = computed(function() {
            return 'http://localhost:8081/subscription/instructors/' + loginStore.getUserGUID;
        })
        const subscribedInstructors: Ref<GetUserResponse[]> = computed(function() {
            return instructorsStore.getSubscribedInstructors;
        })
        function getSubjectsByInstructorEndpoint(instructorGUID: string): string {
            return 'http://localhost:8081/subject/' + instructorGUID;
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
            subscribedInstructors,
            subscribedInstructorsEndpoint,
            refresh,
            getSubjectsByInstructorGUID,
            getSubjectsByInstructorEndpoint
        }
    },
})
</script>
