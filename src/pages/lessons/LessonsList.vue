<template>
    <section>
        <base-card
            :card-title="'Lessons'"
            @refresh="refresh"
        >
            <the-calendar
                calendar-id="lessonListCalendar"
                :key="lessons.length"
                :lessons="lessons"
            ></the-calendar>
            <div class="d-flex justify-content-center align-items-center my-2">
                <router-link to="/lessons/schedule" class="btn btn-secondary my-2">+ Schedule New Lesson</router-link>
            </div>
            <nav class="nav nav-tabs mt-3" id="nav-tab" role="tablist">
                <router-link
                    class="nav-link"
                    :class="{active: activeTab==='scheduled'}"
                    @click.prevent="activeTab = 'scheduled'"
                    id="nav-scheduled-tab"
                    data-bs-toggle="tab"
                    to="#nav-scheduled"
                    role="tab"
                > Scheduled </router-link>
                <router-link
                    class="nav-link"
                    :class="{active: activeTab==='unscheduled'}"
                    @click.prevent="activeTab = 'unscheduled'"
                    id="nav-unscheduled-tab"
                    data-bs-toggle="tab"
                    to="#nav-unscheduled"
                    role="tab"
                > Unscheduled </router-link>
                <router-link
                    class="nav-link"
                    :class="{active: activeTab==='completed'}"
                    @click.prevent="activeTab = 'completed'"
                    id="nav-completed-tab"
                    data-bs-toggle="tab"
                    to="#nav-completed"
                    role="tab"
                > Completed </router-link>
            </nav>
            <div class="tab-content" id="nav-tabContent">
                <div
                    class="tab-pane fade"
                    :class="{show: activeTab==='scheduled', active: activeTab==='scheduled'}"
                    id="nav-scheduled"
                    role="tabpanel"
                >
                    <ul class="d-flex align-items-center list-group my-3 p-1">
                        <lesson-summary
                            v-for="lesson in lessons"
                            :key="lesson.lessonGUID"
                            :lesson-g-u-i-d="lesson.lessonGUID"
                            :subject-name="lesson.subjectName"
                            :student-or-instructor="getInstructorOrStudentName(lesson)"
                            :date-time="lesson.startDate"
                            :location="lesson.location"
                            :status="lesson.lessonStatus"
                        ></lesson-summary>
                    </ul>
                </div>
                <div
                    class="tab-pane fade"
                    id="nav-unscheduled"
                    role="tabpanel"
                    v-show="activeTab==='unscheduled'"
                >
<!--                    TODO: unscheduled lessons-->
                </div>
                <div
                    class="tab-pane fade"
                    id="nav-unscheduled"
                    role="tabpanel"
                    v-show="activeTab==='completed'"
                >
                <!--                    TODO: completed lessons-->
                </div>
            </div>
        </base-card>
    </section>
</template>

<script lang="ts">
import {computed, defineComponent, onBeforeMount, ref, Ref} from 'vue';
import LessonSummary from '@/components/lessons/LessonSummary.vue';
import { useLoginStore } from "@/store/login";
import { useLessonsStore } from "@/store/lessons";
import TheWeeklyCalendar from '@/components/layout/TheWeeklyCalendar.vue';
import { GetLessonResponse } from '@/dto/response/getLessonResponse';
export default defineComponent({
    name: 'LessonsList',
    components: {
        LessonSummary,
        TheCalendar: TheWeeklyCalendar
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
        const activeTab: Ref<string> = ref('scheduled');
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
            activeTab,
            lessons,
            getInstructorOrStudentName,
            refresh
        }
    }
})
</script>
