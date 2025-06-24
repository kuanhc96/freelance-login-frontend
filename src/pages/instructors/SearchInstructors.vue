<template>
    <section>
        <base-card 
            card-title="Search For Instructors"
            @refresh="refresh"
        >
            <div class="d-flex align-items-center flex-column">
                <div class="col-md-10 col-10">
                    <the-search-bar
                        :id="'search-instructors'" 
                        :placeholder="'Search Instructors'"
                        v-model="keyword"
                    ></the-search-bar>
                    <ul class="d-flex align-items-center list-group my-3 p-1" v-if="isKeywordBlank">
                        <instructor-summary
                            class="mb-3"
                            v-for="instructor in unsubscribedInstructors"
                            :key="instructor.userGUID"
                            :instructorGUID="instructor.userGUID"
                            :instructorName="instructor.name"
                            :email="instructor.email"
                            :portraitPath="'/alice.jpg'"
                            :display-subscribe="true"
                        ></instructor-summary>
                    
                    </ul> 
                    <ul class="d-flex align-items-center list-group my-3 p-1" v-else>
                        <instructor-summary
                            class="mb-3"
                            v-for="instructor in filteredInstructors"
                            :key="instructor.userGUID"
                            :instructorGUID="instructor.userGUID"
                            :instructorName="instructor.name"
                            :email="instructor.email"
                            :portraitPath="'/alice.jpg'"
                            
                        ></instructor-summary>
                    </ul> 
                </div>
            </div>
        </base-card>

    </section>
</template>

<script setup lang="ts">
import { RootState } from '@/store/types'
import InstructorSummary from '../../components/instructors/InstructorSummary.vue'
import BaseCard from '../../components/ui/BaseCard.vue'
import TheSearchBar from '../../components/layout/TheSearchBar.vue'
import { Ref, ref, computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { GetUserResponse } from '@/dto/response/getUserResponse'

const store = useStore<RootState>();

const keyword: Ref<string> = ref('');

const isKeywordBlank = computed<boolean>(() =>
    keyword.value === ''
)

const unsubscribedInstructorsEndpoint = computed<string>(() => 
    store.getters['login/backendService'] + 'subscription/unsubscribed/' + store.getters['login/getUserGUID']
)

const filteredInstructors = computed<Array<GetUserResponse>>(() => {
    const unsubscribedInstructors: Array<GetUserResponse> = store.getters['instructors/getUnsubscribedInstructors'];
    return unsubscribedInstructors.filter(instructor => instructor.name.toLowerCase().includes(keyword.value.toLowerCase()))
})

const unsubscribedInstructors = computed<Array<GetUserResponse>>(() => 
    store.getters['instructors/getUnsubscribedInstructors']
)

// const hasAllInstructors = computed<boolean>(() =>
//     store.getters['instructors/hasUnsubscribedInstructors']
// )

async function refresh(): Promise<void> {
    const response: Response = await fetch(unsubscribedInstructorsEndpoint.value, {
        method: 'GET',
        credentials: 'include'
    })
    console.log(response)

    if (response.ok) {
        const data: Array<GetUserResponse> = await response.json();
        store.dispatch('instructors/setUnsubscribedInstructors', { unsubscribedInstructors: data })
        console.log(unsubscribedInstructors)
    }
}

onBeforeMount(
    async() => refresh()
)
</script>