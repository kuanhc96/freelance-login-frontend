<template>
    <the-search-bar
        :id="'search-instructorsOrStudents'"
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

</template>

<script lang="ts">

import InstructorSummary from "@/components/instructors/InstructorSummary.vue";
import TheSearchBar from "@/components/layout/TheSearchBar.vue";
import {computed, defineComponent, ref, Ref} from "vue";
import {useInstructorsOrStudentsStore} from "@/store/instructorsOrStudents";
import {GetUserResponse} from "@/dto/response/getUserResponse";

export default defineComponent({
    name: 'SubscribedInstructors',
    components: {
        InstructorSummary,
        TheSearchBar,
    },
    setup() {
        const instructorsStore = useInstructorsOrStudentsStore();
        const keyword: Ref<string> = ref('');
        const isKeywordBlank: Ref<boolean> = computed(function () {
            return keyword.value === '';
        });
        const subscribedInstructors: Ref<GetUserResponse[]> = computed(function () {
            return instructorsStore.getSubscribedInstructors;
        });
        const hasSubscribedInstructors: Ref<boolean> = computed(function () {
            return instructorsStore.hasSubscribedInstructors;
        });
        const filteredInstructors: Ref<GetUserResponse[]> = computed(function () {
            return subscribedInstructors.value.filter(
                (instructor: GetUserResponse) => instructor.name.toLowerCase().includes(keyword.value.toLowerCase())
            );
        });

        return {
            keyword,
            isKeywordBlank,
            subscribedInstructors,
            hasSubscribedInstructors,
            filteredInstructors
        }
    }

})
</script>
