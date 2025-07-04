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
import store from '@/store'


export default defineComponent({
    name: 'SubjectsList',
    components: {
        SubjectSummary
    },
    setup() {
        const subscribedInstructorsEndpoint: Ref<string> = computed(function() {
            return 'http://localhost:8081/subscription/' + store.getters['login/getUserGUID'];
        })
        const subscribedInstructors: Ref<GetUserResponse[]> = computed(function() {
            return store.getters['instructors/getSubscribedInstructors'];
        })
        function getSubjectsByInstructorEndpoint(instructorGUID: string): string {
            return 'http://localhost:8081/subject/' + instructorGUID;
        }
        function getSubjectsByInstructorGUID(instructorGUID: string): GetSubjectResponse[] {
            return store.getters['subjects/getSubjectsByInstructorGUID'](instructorGUID);
        }

        async function refresh(): Promise<void> {
            for (const instructor of subscribedInstructors.value) {
                const response: Response = await fetch(getSubjectsByInstructorEndpoint(instructor.userGUID), {
                    method: 'GET',
                    credentials: 'include'
                });

                if (response.ok) {
                    const data: GetSubjectResponse[] = await response.json();
                    store.dispatch('subjects/addSubjects', {instructorGUID: instructor.userGUID, subjects: data})
                }
            }
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
    async created(): Promise<void> {
        const response: Response = await fetch(this.subscribedInstructorsEndpoint, {
            method: 'GET',
            credentials: 'include'
        });

        if (response.ok) {
            const data: GetUserResponse[] = await response.json();
            store.dispatch('instructors/setSubscribedInstructors', data);
        }

        for (const instructor of this.subscribedInstructors) {
            const response: Response = await fetch(this.getSubjectsByInstructorEndpoint(instructor.userGUID), {
                method: 'GET',
                credentials: 'include'
            });

            if (response.ok) {
                const data: GetSubjectResponse[] = await response.json();
                store.dispatch('subjects/addSubjects', {instructorGUID: instructor.userGUID, subjects: data})
            }

        }

    },
})
</script>
