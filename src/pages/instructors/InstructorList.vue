<template>
    <section>
        <base-card
            card-title="Subscribed Instructors"
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
                            v-for="instructor in subscribedInstructors"
                            :key="instructor.userGUID"
                            :instructorGUID="instructor.userGUID"
                            :instructorName="instructor.name"
                            :email="instructor.email"
                            :portraitPath="'/alice.jpg'"
                            :display-subscribe="false"
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
                            :display-subscribe="false"
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
import TheSearchBar from '../../components/layout/TheSearchBar.vue'
import {defineComponent, Ref, ref, computed, onBeforeMount} from 'vue'
import { useLoginStore } from "@/store/login";
import { useInstructorsStore } from "@/store/instructors";
import { GetUserResponse } from '@/dto/response/getUserResponse'
export default defineComponent({
    name: 'InstructorList',
    components: {
        InstructorSummary,
        BaseCard,
        TheSearchBar
    },
    setup() {
        const loginStore = useLoginStore();
        const instructorsStore = useInstructorsStore();
        const keyword: Ref<string> = ref('');
        const isKeywordBlank: Ref<boolean> = computed(function() {
            return keyword.value === '';
        });
        const subscribedInstructors: Ref<GetUserResponse[]> = computed(function() {
            return instructorsStore.getSubscribedInstructors;
        });
        const hasSubscribedInstructors: Ref<boolean> = computed(function() {
            return instructorsStore.hasSubscribedInstructors;
        });
        const userGUID: Ref<string> = computed(function() {
            return loginStore.getUserGUID;
        });
        const filteredInstructors: Ref<GetUserResponse[]> = computed(function() {
            return subscribedInstructors.value.filter(
                (instructor: GetUserResponse) => instructor.name.toLowerCase().includes(keyword.value.toLowerCase())
            );
        });
        const subscribedInstructorsEndpoint: Ref<string> = computed(function() {
            return 'http://localhost:8081/subscription/instructors/' + userGUID.value;
        });

        async function refresh(): Promise<void> {
            const response: Response = await fetch(subscribedInstructorsEndpoint.value, {
                method: 'GET',
                credentials: 'include'
            })

            if (response.ok) {
                const data: GetUserResponse[] = await response.json();
                instructorsStore.setSubscribedInstructors(data);
            }
        }

        onBeforeMount(async () => {
            await refresh();
        });

        return {
            keyword,
            isKeywordBlank,
            subscribedInstructors,
            hasSubscribedInstructors,
            userGUID,
            filteredInstructors,
            subscribedInstructorsEndpoint,
            refresh
        }
    }
})
</script>
