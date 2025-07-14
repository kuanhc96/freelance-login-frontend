<template>
    <section>
        <base-card
            :card-title="isStudent? 'Instructors': 'Students'"
            @refresh="refresh"
        >
            <div class="d-flex align-items-center flex-column">
                <div v-if="isStudent" class="col-md-10 col-10">
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
                <div v-else class="col-md-10 col-10">
                    <MyStudents></MyStudents>
                </div>

            </div>
        </base-card>
    </section>
</template>

<script lang="ts">
import {Ref, computed, defineComponent, onBeforeMount} from 'vue'
import { useInstructorsOrStudentsStore } from "@/store/instructorsOrStudents";
import { useLoginStore } from "@/store/login";
import SubscribedInstructors from "@/components/instructors/SubscribedInstructors.vue";
import UnsubscribedInstructors from "@/components/instructors/UnsubscribedInstructors.vue";
import MyStudents from "@/components/students/MyStudents.vue";
export default defineComponent({
    name: 'InstructorOrStudentsList',
    components: {
        SubscribedInstructors,
        UnsubscribedInstructors,
        MyStudents
    },
    setup() {
        const instructorsOrStudentsStore = useInstructorsOrStudentsStore();
        const loginStore = useLoginStore();
        const isStudent: Ref<boolean> = computed(function() {
            return loginStore.isStudent;
        })
        async function refresh(): Promise<void> {
            await instructorsOrStudentsStore.setInstructorsOrStudents();
        }

        onBeforeMount(async () => {
            await refresh();
        });

        return {
            isStudent,
            refresh
        }
    }
})
</script>
