<template>
    <section>
        <base-card
            :card-title="'Lessons'"
            @refresh="refresh"
        >
            <ul class="d-flex align-items-center list-group my-3 p-1">
                <router-link to="/lessons/schedule" class="btn btn-secondary my-2">+ Schedule New Lesson</router-link>
                <lesson-summary
                    v-for="lesson in lessons"
                    :key="lesson.lessonGUID"
                    :lesson-g-u-i-d="lesson.lessonGUID"
                    :subject-g-u-i-d="lesson.subjectGUID"
                    :student-or-instructor="getInstructorOrStudentName(lesson)"
                    :date-time="lesson.startDate"
                    :location="lesson.location"
                    :status="lesson.lessonStatus"
                ></lesson-summary>
            </ul>
        </base-card>
    </section>
</template>

<script lang="ts">
import {computed, defineComponent, onBeforeMount, Ref} from 'vue';
import LessonSummary from '@/components/lessons/LessonSummary.vue';
import { useLoginStore } from "@/store/login";
import { useLessonsStore } from "@/store/lessons";
import { GetLessonResponse } from '@/dto/response/getLessonResponse';
export default defineComponent({
    name: 'LessonsList',
    components: {
        LessonSummary
    },
    setup() {
        const loginStore = useLoginStore();
        const lessonsStore = useLessonsStore();
        const userGUID: Ref<string> = computed(function() {
            return loginStore.getUserGUID;
        });
        const role: Ref<string> = computed(function() {
            return loginStore.getRole;
        });
        function getInstructorOrStudentName(lesson: GetLessonResponse) {
            if (role.value === 'INSTRUCTOR')  {
                return lesson.studentName;
            } else {
                return lesson.instructorName;
            }
        }
        const lessons: Ref<GetLessonResponse[]> = computed(function() {
            return role.value === 'INSTRUCTOR'? lessonsStore.getLessonsByInstructorGUID(userGUID.value):
                lessonsStore.getLessonsByStudentGUID(userGUID.value);
        })
        async function refresh(): Promise<void> {
            await lessonsStore.setLessons();
        }

        onBeforeMount(async () => {
            await refresh();
        });

        return {
            lessons,
            getInstructorOrStudentName,
            refresh
        }
    }
})
</script>
