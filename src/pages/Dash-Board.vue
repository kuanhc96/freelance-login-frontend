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
                                <dashboard-course></dashboard-course>
                                <p class="card-text">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos harum sapiente, cumque
                                    rerum minus rem saepe consequuntur at culpa molestiae.
                                </p>
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
                                        <router-link to="/instructors/search" class="btn btn-primary btn-sm">Search
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
import DashboardCourse from '../components/lessons/DashboardLesson.vue'
import {defineComponent, computed, Ref, onBeforeMount} from 'vue';
import {GetUserResponse} from '@/dto/response/getUserResponse';
import {GetAnnouncementResponse} from '@/dto/response/getAnnouncementResponse';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'Dash-Board',
    components: {
        BaseCard,
        DashboardAnnouncement,
        DashboardInstructor,
        DashboardCourse
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        const userGUID: Ref<string> = computed(function() {
            return store.getters['login/getUserGUID'];
        })
        const role: Ref<string> = computed(function() {
            return store.getters['login/getRole'];
        })
        const isLoggedIn: Ref<boolean> = computed(function() {
            return store.getters['login/isLoggedIn'];
        })
        const subscribedInstructorsEndpoint: Ref<string> = computed(function() {
            return 'http://localhost:8081/subscription/' + userGUID.value;
        })
        const subscribedInstructors: Ref<GetUserResponse[]> = computed(function() {
            return store.getters['instructors/getSubscribedInstructors'];
        })
        const announcements: Ref<GetAnnouncementResponse[]> = computed(function() {
            return store.getters['announcements/getAnnouncements'];
        })
        const mostRecentActiveAnnouncements: Ref<GetAnnouncementResponse[]> = computed(function() {
            return announcements.value.filter((announcement: {
                announcementStatus: string;
            }) => announcement.announcementStatus === 'ACTIVE').slice(0, 3);

        })
        function announcementsUrl(instructorGUID: string): string {
            return "http://localhost:8081/announcement/" + instructorGUID;
        }
        async function refreshAnnouncements(): Promise<void> {
            if (role.value === 'STUDENT') {
                const response: Response = await fetch(subscribedInstructorsEndpoint.value, {
                    method: 'GET',
                    credentials: 'include'
                })

                if (response.ok) {
                    const data: GetUserResponse[] = await response.json();
                    store.dispatch('instructors/setSubscribedInstructors', data)
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
                            store.dispatch('announcements/setAnnouncements', data)
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
                    store.dispatch('announcements/setAnnouncements', data);
                }
            }
        }
        async function refreshAll(): Promise<void> {
            await refreshAnnouncements();
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
            refreshAll
        }
    },
})
</script>
