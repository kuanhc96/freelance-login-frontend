<template>
    <section>
        <base-card 
            :card-title="'Courses'"
            @refresh="refresh"
        >
            <subject-summary
                v-for="instructor in getSubscribedInstructors" 
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
import { mapGetters } from 'vuex';
import { GetSubjectResponse } from '@/dto/response/getSubjectResponse';
import { GetUserResponse } from '@/dto/response/getUserResponse';
import { defineComponent } from 'vue';
import store from '@/store'


export default defineComponent({
    name: 'SubjectsList',
    components: {
        SubjectSummary
    },
    computed: {
        getSubscribedInstructorsEndpoint(): string {
            return 'http://localhost:8081/subscription/' + store.getters['login/getUserGUID'];
        },
        ...mapGetters('instructors', ['getSubscribedInstructors'])
    },
    methods: {
        async refresh(): Promise<void> {
            for (const instructor of this.getSubscribedInstructors) {
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
        getSubjectsByInstructorEndpoint(instructorGUID: string): string {
            return 'http://localhost:8081/subject/' + instructorGUID;
        },
        getSubjectsByInstructorGUID(instructorGUID: string): GetSubjectResponse[] {
            return store.getters['subjects/getSubjectsByInstructorGUID'](instructorGUID);
        }
    },
    async created(): Promise<void> {
        const response: Response = await fetch(this.getSubscribedInstructorsEndpoint, {
            method: 'GET',
            credentials: 'include'
        });

        if (response.ok) {
            const data: GetUserResponse[] = await response.json();
            store.dispatch('instructors/setSubscribedInstructors', data);
        }

        for (const instructor of this.getSubscribedInstructors) {
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