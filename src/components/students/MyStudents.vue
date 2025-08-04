<template>
    <the-search-bar
        :id="'search-instructorsOrStudents'"
        placeholder="Search Students"
        v-model="keyword"
    ></the-search-bar>
    <ul class="d-flex align-items-center list-group my-3 p-1" v-if="isKeywordBlank">
        <student-summary
            class="mb-3"
            v-for="student in myStudents"
            :key="student.userGUID"
            :student-g-u-i-d="student.userGUID"
            :student-name="student.name"
            :email="student.email"
            :portraitPath="student.profilePicture"
            :display-subscribe="false"
        ></student-summary>
    </ul>
    <ul class="d-flex align-items-center list-group my-3 p-1" v-else>
        <student-summary
            class="mb-3"
            v-for="student in filteredStudents"
            :key="student.userGUID"
            :student-g-u-i-d="student.userGUID"
            :student-name="student.name"
            :email="student.email"
            :portraitPath="student.profilePicture"
            :display-subscribe="false"
        ></student-summary>
    </ul>
</template>
<script lang="ts">
import {computed, defineComponent, ref, Ref} from 'vue'
import TheSearchBar from "@/components/layout/TheSearchBar.vue";
import StudentSummary from "@/components/students/StudentSummary.vue";
import {useInstructorsOrStudentsStore} from "@/store/instructorsOrStudents";
import {GetUserResponse} from "@/dto/response/getUserResponse";
export default defineComponent({
    name: 'MyStudents',
    components: {StudentSummary, TheSearchBar},
    setup() {
        const studentsStore = useInstructorsOrStudentsStore();
        const keyword: Ref<string> = ref('');
        const isKeywordBlank: Ref<boolean> = computed(function () {
            return keyword.value === '';
        });
        const myStudents: Ref<GetUserResponse[]> = computed(function() {
            return studentsStore.getMyStudents;
        });

        const filteredStudents: Ref<GetUserResponse[]> = computed(function () {
            return myStudents.value.filter(
                (student: GetUserResponse) => student.name.toLowerCase().includes(keyword.value.toLowerCase())
            );
        });

        return {
            keyword,
            isKeywordBlank,
            myStudents,
            filteredStudents
        }
    }
})

</script>

