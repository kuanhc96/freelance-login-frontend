<template>
    <section>
        <base-card
            card-title="Dashboard"
            @refresh="refreshAll"
        >
            <div class="d-flex flex-column ">
                <div class="row my-3 justify-content-center">
                    <div class="col-md-10">
                        <div class="card w-100 h-100 shadow">
                            <div class="card-body">
                                <h2 class="card-title d-flex justify-content-between">
                                    <div v-if="role==='STUDENT'" class="">
                                        Announcements
                                    </div>
                                    <div v-else class="">
                                        My Active Announcements
                                    </div>
                                    <div v-if="role==='INSTRUCTOR'" class="d-flex gap-2">
                                        <router-link to="/announcements/create" class="btn btn-primary btn-sm">Add New
                                        </router-link>
                                    </div>
                                </h2>
                                <dashboard-announcement
                                    v-for="announcement in mostRecentActiveAnnouncements"
                                    :key="announcement.announcementGUID"
                                    :announcement-id="announcement.announcementGUID"
                                    :title="announcement.title"
                                    :date="announcement.createdDate"
                                    :name="announcement.instructorName"
                                    :status="announcement.announcementStatus"
                                    :announcement="announcement.announcement"
                                    @announcement-updated="refreshAll"
                                ></dashboard-announcement>
                                <div v-if="role === 'STUDENT' && announcements.length > 3"
                                     class="d-flex justify-content-center">
                                    <div class="fs-bold fs-2">...</div>
                                </div>
                                <div v-if="role === 'STUDENT' && announcements.length > 3"
                                     class="d-flex justify-content-center">
                                    <router-link to="/announcements" class="btn btn-primary btn-sm stretched-link">View
                                        All
                                    </router-link>
                                </div>
                                <div v-if="role === 'INSTRUCTOR'" class="d-flex justify-content-center">
                                    <router-link to="/announcements" class="btn btn-primary btn-sm ">View All
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mb-3 justify-content-center">
                    <div class="col-md-5">
                        <div class="card w-100 h-100 shadow">
                            <div class="card-body">
                                <h2 class="card-title">Upcoming Lessons</h2>
                                <dashboard-lesson
                                    v-for="lesson in upcomingLessons"
                                    :key="lesson.lessonGUID"
                                    :lesson-g-u-i-d="lesson.lessonGUID"
                                    :student-or-instructor-name="getInstructorOrStudentName(lesson)"
                                    :date-time="lesson.startDate"
                                    :location="lesson.location"
                                    :subject="lesson.subject"
                                ></dashboard-lesson>
                                <div v-if="lessons.length > 3" class="d-flex justify-content-center">
                                    <div class="fs-bold fs-2">...</div>
                                </div>
                                <div v-if="lessons.length > 3"
                                     class="d-flex justify-content-center">
                                    <router-link to="/lessons" class="btn btn-primary btn-sm stretched-link">View
                                        All
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="card w-100 h-100 shadow">
                            <div class="card-body">
                                <h2 class="card-title">Most Recent Transactions</h2>
                                <p class="card-text">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos harum sapiente, cumque
                                    rerum minus rem saepe consequuntur at culpa molestiae.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mb-3 justify-content-center">
                    <div class="col-md-5">
                        <div class="card w-100 h-100 shadow">
                            <div class="card-body">
                                <h3 class="card-title d-flex justify-content-between align-items-center">
                                    <div class="">
                                        Subscribed Instructors
                                    </div>
                                    <div v-if="role==='STUDENT'" class="d-flex gap-2">
                                        <router-link to="/instructors" class="btn btn-primary btn-sm">Search
                                        </router-link>
                                    </div>
                                </h3>
                                <dashboard-instructor v-for="instructor in subscribedInstructors"
                                                      :key="instructor.userGUID"
                                                      :instructorGUID="instructor.userGUID"
                                                      :instructorName="instructor.name"
                                                      :email="instructor.email"
                                                      :portrait-path="'/alice.jpg'"></dashboard-instructor>
                                <div v-if="subscribedInstructors.length > 3" class="d-flex justify-content-center">
                                    <div class="fs-bold fs-2">...</div>
                                </div>
                                <div v-if="subscribedInstructors.length > 3" class="d-flex justify-content-center">
                                    <router-link to="/instructors" class="btn btn-primary btn-sm stretched-link">View
                                        All
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="card w-100 h-100 shadow">
                            <div class="card-body">
                                <h2 class="card-title">Account Information</h2>
                                <p class="card-text">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos harum sapiente, cumque
                                    rerum minus rem saepe consequuntur at culpa molestiae.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </base-card>
    </section>
</template>

<script lang="ts">
import BaseCard from '../components/ui/BaseCard.vue';
import DashboardAnnouncement from '../components/announcements/DashboardAnnouncement.vue';
import DashboardInstructor from '../components/instructors/DashboardInstructor.vue'
import DashboardLesson from '../components/lessons/DashboardLesson.vue'
import {defineComponent, computed, Ref, onBeforeMount} from 'vue';
import {GetUserResponse} from '@/dto/response/getUserResponse';
import {GetAnnouncementResponse} from '@/dto/response/getAnnouncementResponse';
// import { useStore } from 'vuex';
import { useLoginStore } from '@/store/login';
import { useInstructorsStore } from '@/store/instructors';
import { useAnnouncementsStore } from '@/store/announcements';
import { useRouter } from 'vue-router';
import {GetLessonResponse} from "@/dto/response/getLessonResponse";
import {AddLessonsPayload, useLessonsStore} from "@/store/lessons";

export default defineComponent({
    name: 'Dash-Board',
    components: {
        BaseCard,
        DashboardAnnouncement,
        DashboardInstructor,
        DashboardLesson
    },
    setup() {
        const loginStore = useLoginStore();
        const lessonsStore = useLessonsStore();
        const instructorsStore = useInstructorsStore();
        const announcementsStore = useAnnouncementsStore();
        const router = useRouter();
        const userGUID: Ref<string> = computed(function() {
            return loginStore.getUserGUID;
        })
        const role: Ref<string> = computed(function() {
            return loginStore.getRole;
        })
        const isLoggedIn: Ref<boolean> = computed(function() {
            return loginStore.isLoggedIn;
        })
        const subscribedInstructorsEndpoint: Ref<string> = computed(function() {
            return 'http://localhost:8081/subscription/' + userGUID.value;
        })
        const getLessonsEndpoint: Ref<string> = computed(function() {
            let endpoint = 'http://localhost:8081/lessons?';
            if (role.value === 'INSTRUCTOR')  {
                endpoint = endpoint + 'instructorGUID=';
            } else {
                endpoint = endpoint + 'studentGUID=';
            }
            endpoint = endpoint + userGUID.value;
            return endpoint
        });
        const lessons: Ref<GetLessonResponse[]> = computed(function() {
            if (role.value === 'STUDENT') {
                return lessonsStore.getLessonsByStudentGUID(userGUID.value);
            } else {
                return lessonsStore.getLessonsByInstructorGUID(userGUID.value);
            }
        });
        const upcomingLessons: Ref<GetLessonResponse[]> = computed(function() {
            return lessons.value.slice(0, 3);
        });
        const subscribedInstructors: Ref<GetUserResponse[]> = computed(function() {
            return instructorsStore.getSubscribedInstructors;
        });
        const announcements: Ref<GetAnnouncementResponse[]> = computed(function() {
            return announcementsStore.getAnnouncements;
        });
        const mostRecentActiveAnnouncements: Ref<GetAnnouncementResponse[]> = computed(function() {
            return announcements.value.filter((announcement: {
                announcementStatus: string;
            }) => announcement.announcementStatus === 'ACTIVE').slice(0, 3);

        });
        function announcementsUrl(instructorGUID: string): string {
            return "http://localhost:8081/announcement/" + instructorGUID;
        }
        async function refreshInstructorsOrStudents(): Promise<void> {
            if (role.value === 'STUDENT') {
                const response: Response = await fetch(subscribedInstructorsEndpoint.value, {
                    method: 'GET',
                    credentials: 'include'
                })

                if (response.ok) {
                    const data: GetUserResponse[] = await response.json();
                    instructorsStore.setSubscribedInstructors(data)
                }
            } else {
                // refresh students
            }
        }
        async function refreshAnnouncements(): Promise<void> {
            if (role.value === 'STUDENT') {
                const response: Response = await fetch(subscribedInstructorsEndpoint.value, {
                    method: 'GET',
                    credentials: 'include'
                })

                if (response.ok) {
                    const data: GetUserResponse[] = await response.json();
                    instructorsStore.setSubscribedInstructors(data)
                }

                for (const instructor of subscribedInstructors.value) {
                    const instructorGUID: string = instructor.userGUID;

                    const response: Response = await fetch(announcementsUrl(instructorGUID), {
                        method: 'GET',
                        credentials: 'include'
                    });
                    if (response.ok) {
                        const data: GetAnnouncementResponse[] = await response.json();
                        if (data.length > 0) {
                            announcementsStore.setAnnouncements(data);
                        }
                    }
                }
            } else {
                // userGUID is the instructorGUID
                const response: Response = await fetch(announcementsUrl(userGUID.value), {
                    method: 'GET',
                    credentials: 'include'
                });
                if (response.ok) {
                    const data: GetAnnouncementResponse[] = await response.json();
                    announcementsStore.setAnnouncements(data);
                }
            }
        }
        function getInstructorOrStudentName(lesson: GetLessonResponse) {
            if (role.value === 'INSTRUCTOR')  {
                return lesson.studentName;
            } else {
                return lesson.instructorName;
            }
        }

        async function refreshLessons(): Promise<void> {
            const response: Response = await fetch(getLessonsEndpoint.value, {
                method: 'GET',
                credentials: 'include',
            })

            if (response.ok) {
                const data: GetLessonResponse[] = await response.json()
                const addLessonsPayload: AddLessonsPayload = {
                    userGUID: userGUID.value,
                    lessons: data
                }
                lessonsStore.addLessonsByStudentGUID(addLessonsPayload);
            }
        }
        async function refreshAll(): Promise<void> {
            await refreshAnnouncements();
            await refreshInstructorsOrStudents();
            await refreshLessons();
        }

        onBeforeMount(async() => {
            if (!isLoggedIn.value) {
                router.push('/login');
            } else {
                await refreshAll();
            }
        })
        return {
            userGUID,
            role,
            isLoggedIn,
            subscribedInstructorsEndpoint,
            subscribedInstructors,
            announcements,
            mostRecentActiveAnnouncements,
            lessons,
            upcomingLessons,
            getInstructorOrStudentName,
            refreshAll
        }
    },
})
</script>
