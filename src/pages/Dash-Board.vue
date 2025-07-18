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
                                    <div v-if="isStudent" class="">
                                        Announcements
                                    </div>
                                    <div v-else class="">
                                        My Active Announcements
                                    </div>
                                    <div v-if="!isStudent" class="d-flex gap-2">
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
                                <div v-if="isStudent && announcements.length > 3"
                                     class="d-flex justify-content-center">
                                    <div class="fs-bold fs-2">...</div>
                                </div>
                                <div v-if="isStudent && announcements.length > 3"
                                     class="d-flex justify-content-center">
                                    <router-link to="/announcements" class="btn btn-primary btn-sm stretched-link">View
                                        All
                                    </router-link>
                                </div>
                                <div v-if="!isStudent" class="d-flex justify-content-center">
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
                                    :subject="lesson.subjectName"
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
                                    <dashboard-transaction
                                        v-for="transaction in mostRecentPendingTransactions"
                                        :key="transaction.transactionGUID"
                                        :subject-name="transaction.subjectName"
                                        :instructor-or-student-name="isStudent? transaction.instructorName: transaction.studentName"
                                        :payment-amount="transaction.paymentAmount"
                                        :number-of-lessons="transaction.numberOfLessons"
                                    ></dashboard-transaction>
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
                                    <div v-if="isStudent" class="">
                                        Subscribed Instructors
                                    </div>
                                    <div v-else class="">
                                        My Students
                                    </div>
                                    <div class="d-flex gap-2">
                                        <router-link to="/instructorsOrStudents" class="btn btn-primary btn-sm">Search
                                        </router-link>
                                    </div>
                                </h3>
                                <div v-if="isStudent" class="">
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
                                <div v-else class="">
                                    <dashboard-student v-for="student in myStudents"
                                                          :key="student.userGUID"
                                                          :studentGUID="student.userGUID"
                                                          :studentName="student.name"
                                                          :email="student.email"
                                                          :portrait-path="'/alice.jpg'">

                                    </dashboard-student>
                                    <div v-if="myStudents.length > 3" class="d-flex justify-content-center">
                                        <div class="fs-bold fs-2">...</div>
                                    </div>
                                    <div v-if="myStudents.length > 3" class="d-flex justify-content-center">
                                        <router-link to="/instructorsOrStudents" class="btn btn-primary btn-sm stretched-link">View
                                            All
                                        </router-link>
                                    </div>
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
import { useLoginStore } from '@/store/login';
import { useInstructorsOrStudentsStore } from '@/store/instructorsOrStudents';
import { useAnnouncementsStore } from '@/store/announcements';
import { useRouter } from 'vue-router';
import {GetLessonResponse} from "@/dto/response/getLessonResponse";
import { useLessonsStore } from "@/store/lessons";
import DashboardStudent from "@/components/students/DashboardStudent.vue";
import DashboardTransaction from "@/components/transactions/DashboardTransaction.vue";
import {useTransactionsStore} from "@/store/transactions";
import {GetTransactionResponse} from "@/dto/response/getTransactionResponse";

export default defineComponent({
    name: 'Dash-Board',
    components: {
        DashboardStudent,
        BaseCard,
        DashboardAnnouncement,
        DashboardInstructor,
        DashboardLesson,
        DashboardTransaction
    },
    setup() {
        const loginStore = useLoginStore();
        const lessonsStore = useLessonsStore();
        const instructorsOrStudentsStore = useInstructorsOrStudentsStore();
        const announcementsStore = useAnnouncementsStore();
        const transactionsStore = useTransactionsStore();
        const router = useRouter();
        const userGUID: Ref<string> = computed(function() {
            return loginStore.getUserGUID;
        })
        const isLoggedIn: Ref<boolean> = computed(function() {
            return loginStore.isLoggedIn;
        })
        const subscribedInstructorsEndpoint: Ref<string> = computed(function() {
            return 'http://localhost:8081/subscription/instructors/' + userGUID.value;
        })
        const isStudent: Ref<boolean> = computed(function() {
            return loginStore.isStudent;
        })
        const lessons: Ref<GetLessonResponse[]> = computed(function() {
            if (isStudent.value) {
                return lessonsStore.getLessonsByStudentGUID(userGUID.value);
            } else {
                return lessonsStore.getLessonsByInstructorGUID(userGUID.value);
            }
        });
        const upcomingLessons: Ref<GetLessonResponse[]> = computed(function() {
            return lessons.value.slice(0, 3);
        });
        const subscribedInstructors: Ref<GetUserResponse[]> = computed(function() {
            return instructorsOrStudentsStore.getSubscribedInstructors;
        });
        const myStudents: Ref<GetUserResponse[]> = computed(function() {
            return instructorsOrStudentsStore.getMyStudents;
        })
        const announcements: Ref<GetAnnouncementResponse[]> = computed(function() {
            return announcementsStore.getAnnouncements;
        });
        const mostRecentActiveAnnouncements: Ref<GetAnnouncementResponse[]> = computed(function() {
            return announcements.value.filter((announcement: {
                announcementStatus: string;
            }) => announcement.announcementStatus === 'ACTIVE').slice(0, 3);

        });
        const mostRecentPendingTransactions: Ref<GetTransactionResponse[]> = computed(function() {
            return transactionsStore.getTransactions.filter(
                (transaction: GetTransactionResponse) => transaction.transactionStatus === 'PENDING'
            ).slice(0, 3)
        });
        async function refreshInstructorsOrStudents(): Promise<void> {
            await    instructorsOrStudentsStore.setInstructorsOrStudents()
        }
        async function refreshAnnouncements(): Promise<void> {
            await announcementsStore.setAnnouncements();
        }
        function getInstructorOrStudentName(lesson: GetLessonResponse) {
            if (isStudent.value)  {
                return lesson.instructorName;
            } else {
                return lesson.studentName;
            }
        }

        async function refreshLessons(): Promise<void> {
            await lessonsStore.setLessons();
        }
        async function refreshTransactions(): Promise<void> {
            await transactionsStore.setTransactions();
        }
        async function refreshAll(): Promise<void> {
            await refreshAnnouncements();
            await refreshInstructorsOrStudents();
            await refreshLessons();
            await refreshTransactions();
        }

        onBeforeMount(async() => {
            if (!isLoggedIn.value) {
                await router.push('/login');
            } else {
                await refreshAll();
            }
        })
        return {
            userGUID,
            isStudent,
            isLoggedIn,
            subscribedInstructorsEndpoint,
            subscribedInstructors,
            myStudents,
            announcements,
            mostRecentActiveAnnouncements,
            lessons,
            upcomingLessons,
            mostRecentPendingTransactions,
            getInstructorOrStudentName,
            refreshAll
        }
    },
})
</script>
