<template>
            <the-search-bar
                id="search-unsubscribed-instructors"
                placeholder="Search Instructors"
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
</template>

<script lang="ts">
import {computed, defineComponent, ref, Ref} from "vue";
import InstructorSummary from "@/components/instructors/InstructorSummary.vue";
import TheSearchBar from "@/components/layout/TheSearchBar.vue";
import {useLoginStore} from "@/store/login";
import {useInstructorsStore} from "@/store/instructorsOrStudents";
import {GetUserResponse} from "@/dto/response/getUserResponse";

export default defineComponent({
    components: {
        InstructorSummary,
        TheSearchBar
    },
    setup() {
        const loginStore = useLoginStore();
        const instructorsStore = useInstructorsStore();
        const keyword: Ref<string> = ref('');
        const unsubscribedInstructors: Ref<GetUserResponse[]> = computed(function() {
            return instructorsStore.getUnsubscribedInstructors;
        });
        const hasUnsubscribedInstructors: Ref<boolean> = computed(function() {
            return instructorsStore.hasUnsubscribedInstructors;
        });
        const userGUID: Ref<string> = computed(function() {
            return loginStore.getUserGUID;
        });
        const isKeywordBlank: Ref<boolean> = computed(function() {
            return keyword.value === '';
        });
        const filteredInstructors: Ref<GetUserResponse[]> = computed(function() {
            return unsubscribedInstructors.value
                .filter((instructor: GetUserResponse) => instructor.name.toLowerCase().includes(keyword.value.toLowerCase()));
        });
        return {
            keyword,
            unsubscribedInstructors,
            hasUnsubscribedInstructors,
            userGUID,
            isKeywordBlank,
            filteredInstructors,
        }
    },

})
</script>
