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

<script setup lang="ts">
import SubjectSummary from '@/components/subjects/SubjectAccordion.vue';
import { computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import type { RootState } from '@/store/types'
import { GetSubjectResponse } from '@/dto/response/getSubjectResponse';
import { GetUserResponse } from '@/dto/response/getUserResponse';

const store = useStore<RootState>();

// const subscribedInstructorsEndpoint = computed<URL>(() =>
//     new URL(store.getters['login/backendService'] + 'subscription/' + store.getters['login/getUserId'])
// )

const subscribedInstructors = computed<Array<GetUserResponse>>(() =>
    store.getters['instructors/getSubscribedInstructors']
)

function getSubjectsByInstructorEndpoint(instructorGUID: string): URL {
    return new URL(store.getters['login/backendService'] + 'subject/' + instructorGUID)
}

function getSubjectsByInstructorGUID(instructorGUID: string): Array<GetSubjectResponse> {
    return store.getters['subjects/getSubjectsByInstructorGUID'](instructorGUID);

}

async function refresh(): Promise<void> {
    for (const instructor of store.getters['instructors/instructors']) {
        const response: Response = await fetch(getSubjectsByInstructorEndpoint(instructor.userGUID), {
            method: 'GET',
            credentials: 'include'
        });

        if (response.ok) {
            const data: Array<GetSubjectResponse> = await response.json();
            store.dispatch('subjects/addSubjects', {instructorGUID: instructor.userGUID, subjects: data})
        }
    }
}

onBeforeMount(
    async () => await refresh()
)

</script>