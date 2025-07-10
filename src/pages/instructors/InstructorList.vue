<template>
    <section>
        <base-card
            card-title="Instructors"
            @refresh="refresh"
        >
            <div class="d-flex align-items-center flex-column">
                <div class="col-md-10 col-10">
                    <nav class="nav nav-tabs" id="nav-tab" role="tablist">
                        <router-link
                            class="nav-link active"
                            id="nav-home-tab"
                            data-bs-toggle="tab"
                            to="#nav-home"
                            role="tab"
                            aria-controls="nav-home"
                            aria-selected="true"
                        >Subscribed</router-link>
                        <router-link
                            class="nav-link"
                            id="nav-search-tab"
                            data-bs-toggle="tab"
                            to="#nav-search"
                            role="tab"
                            aria-controls="nav-search"
                            aria-selected="false"
                        >Search</router-link>
                    </nav>
                    <div class="tab-content" id="nav-tabContent">
                        <div
                            class="tab-pane fade show active"
                            id="nav-home"
                            role="tabpanel"
                            aria-labelledby="nav-home-tab"
                        >
                            <SubscribedInstructors></SubscribedInstructors>
                        </div>
                        <div
                            class="tab-pane fade"
                            id="nav-search"
                            role="tabpanel"
                            aria-labelledby="nav-search-tab"
                        >
                            <UnsubscribedInstructors></UnsubscribedInstructors>
                        </div>
                    </div>
                </div>
            </div>
        </base-card>
    </section>
</template>

<script lang="ts">
import {defineComponent, Ref, computed, onBeforeMount} from 'vue'
import { useLoginStore } from "@/store/login";
import { useInstructorsStore } from "@/store/instructors";
import { GetUserResponse } from '@/dto/response/getUserResponse'
import SubscribedInstructors from "@/components/instructors/SubscribedInstructors.vue";
import UnsubscribedInstructors from "@/components/instructors/UnsubscribedInstructors.vue";
export default defineComponent({
    name: 'InstructorList',
    components: {
        SubscribedInstructors,
        UnsubscribedInstructors
    },
    setup() {
        const loginStore = useLoginStore();
        const instructorsStore = useInstructorsStore();
        const userGUID: Ref<string> = computed(function() {
            return loginStore.getUserGUID;
        });
        const subscribedInstructorsEndpoint: Ref<string> = computed(function() {
            return 'http://localhost:8081/subscription/instructors/' + userGUID.value;
        });
        const unsubscribedInstructorsEndpoint: Ref<string> = computed(function() {
            return 'http://localhost:8081/subscription/unsubscribed/' + userGUID.value;
        });
        async function refresh(): Promise<void> {
            const subscriptionResponse: Response = await fetch(subscribedInstructorsEndpoint.value, {
                method: 'GET',
                credentials: 'include'
            })

            if (subscriptionResponse.ok) {
                const data: GetUserResponse[] = await subscriptionResponse.json();
                instructorsStore.setSubscribedInstructors(data);
            }

            const unsubscribedResponse: Response = await fetch(unsubscribedInstructorsEndpoint.value, {
                method: 'GET',
                credentials: 'include'
            })
            if (unsubscribedResponse.ok) {
                const data: GetUserResponse[] = await unsubscribedResponse.json();
                instructorsStore.setUnsubscribedInstructors(data);
            }
        }

        onBeforeMount(async () => {
            await refresh();
        });

        return {
            refresh
        }
    }
})
</script>
