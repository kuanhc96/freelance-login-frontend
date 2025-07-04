<template>
    <section>
        <base-card
            card-title="Search For Instructors"
            @refresh="refresh"
        >
            <div class="d-flex align-items-center flex-column">
                <div class="col-md-10 col-10">
                    <div class="input-group mt-3">
                        <label for="search-instructors" class="border rounded-start input-group-text">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </label>
                        <input
                            id="search-instructors"
                            type="text"
                            placeholder="Search Instructors"
                            class="form-control fs-6 rounded-end col-md-10"
                            v-model="keyword"
                        >
                    </div>
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

<script lang="ts">
import InstructorSummary from '../../components/instructors/InstructorSummary.vue'
import BaseCard from '../../components/ui/BaseCard.vue'
import {defineComponent, Ref, ref, computed, onBeforeMount} from 'vue'
import { useStore } from 'vuex'
import { GetUserResponse } from '@/dto/response/getUserResponse'
export default defineComponent({
    name: 'SearchInstructors',
    components: {
        InstructorSummary,
        BaseCard
    },
    setup() {
        const store = useStore();
        const keyword: Ref<string> = ref('');
        const unsubscribedInstructors: Ref<GetUserResponse[]> = computed(function() {
            return store.getters['instructors/getUnsubscribedInstructors'];
        });
        const hasUnsubscribedInstructors: Ref<GetUserResponse[]> = computed(function() {
            return store.getters['instructors/hasUnsubscribedInstructors'];
        });
        const userGUID: Ref<string> = computed(function() {
            return store.getters['login/getUserGUID'];
        });
        const isKeywordBlank: Ref<boolean> = computed(function() {
            return keyword.value === '';
        });
        const unsubscribedInstructorsEndpoint: Ref<string> = computed(function() {
            return 'http://localhost:8081/subscription/unsubscribed/' + userGUID.value;
        });
        const filteredInstructors: Ref<GetUserResponse[]> = computed(function() {
            return unsubscribedInstructors.value
                .filter((instructor: GetUserResponse) => instructor.name.toLowerCase().includes(keyword.value.toLowerCase()));
        });
        async function refresh(): Promise<void> {
            const response: Response = await fetch(unsubscribedInstructorsEndpoint.value, {
                method: 'GET',
                credentials: 'include'
            })
            if (response.ok) {
                const data: GetUserResponse[] = await response.json();
                store.dispatch('instructors/setUnsubscribedInstructors', data)
            }
        }

        onBeforeMount(async () => {
            await refresh();
        })

        return {
            keyword,
            unsubscribedInstructors,
            hasUnsubscribedInstructors,
            userGUID,
            isKeywordBlank,
            unsubscribedInstructorsEndpoint,
            filteredInstructors,
            refresh
        }
    },
})
</script>
