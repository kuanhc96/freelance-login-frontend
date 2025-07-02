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
                        <div v-if="getRole==='STUDENT'" class="">
                           Announcements
                        </div>
                        <div v-else class="">
                           My Active Announcements
                        </div>
                        <div v-if="getRole==='INSTRUCTOR'" class="d-flex gap-2">
                           <router-link to="/announcements/create" class="btn btn-primary btn-sm">Add New</router-link>
                        </div>
                     </h2>
                     <dashboard-announcement 
                        v-for="announcement in getMostRecentActiveAnnouncements"
                        :key="announcement.announcementGUID"
                        :announcement-id="announcement.announcementGUID"
                        :title="announcement.title"
                        :date="announcement.createdDate"
                        :name="announcement.instructorName"
                        :status="announcement.announcementStatus"
                        :announcement="announcement.announcement"
                        @announcement-updated="refreshAnnouncements()"
                     ></dashboard-announcement>
                     <div v-if="getRole === 'STUDENT' && getAnnouncements.length > 3" class="d-flex justify-content-center">
                        <div class="fs-bold fs-2">...</div>
                     </div>
                     <div v-if="getRole === 'STUDENT' && getAnnouncements.length > 3" class="d-flex justify-content-center">
                        <router-link to="/announcements" class="btn btn-primary btn-sm stretched-link">View All</router-link>
                     </div>
                     <div v-if="getRole === 'INSTRUCTOR'" class="d-flex justify-content-center">
                        <router-link to="/announcements" class="btn btn-primary btn-sm ">View All</router-link>
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
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos harum sapiente, cumque rerum minus rem saepe consequuntur at culpa molestiae.
                     </p>
                  </div>
               </div>
            </div>
            <div class="col-md-5">
               <div class="card w-100 h-100 shadow">
                  <div class="card-body">
                     <h2 class="card-title">Most Recent Transactions</h2>
                     <p class="card-text">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos harum sapiente, cumque rerum minus rem saepe consequuntur at culpa molestiae.
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
                        <div v-if="getRole==='STUDENT'" class="d-flex gap-2">
                           <router-link to="/instructors/search" class="btn btn-primary btn-sm">Search</router-link>
                        </div>
                     </h3>
                     <dashboard-instructor v-for="instructor in getSubscribedInstructors"
                        :key="instructor.userGUID"
                        :instructorGUID="instructor.userGUID"
                        :instructorName="instructor.name"
                        :email="instructor.email"
                        :portrait-path="'/alice.jpg'"></dashboard-instructor>
                     <div v-if="getSubscribedInstructors.length > 3" class="d-flex justify-content-center">
                        <div class="fs-bold fs-2">...</div>
                     </div>
                     <div v-if="getSubscribedInstructors.length > 3" class="d-flex justify-content-center">
                        <router-link to="/instructors" class="btn btn-primary btn-sm stretched-link">View All</router-link>
                     </div>
                  </div>
               </div>
            </div>
            <div class="col-md-5">
               <div class="card w-100 h-100 shadow">
                  <div class="card-body">
                     <h2 class="card-title">Account Information</h2>
                     <p class="card-text">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos harum sapiente, cumque rerum minus rem saepe consequuntur at culpa molestiae.
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
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import { GetUserResponse } from '@/dto/response/getUserResponse';
import { GetAnnouncementResponse } from '@/dto/response/getAnnouncementResponse';
import store from '@/store';

export default defineComponent({
    name: 'Dash-Board',
    components: {
        BaseCard,
        DashboardAnnouncement,
        DashboardInstructor,
        DashboardCourse
    },
   computed: {
      getSubscribedInstructorsEndpoint(): string {
         return 'http://localhost:8081/subscription/' + this.getUserGUID;
      },
      getMostRecentActiveAnnouncements(): GetAnnouncementResponse[] {
         // const activeAnnouncements: GetAnnouncementResponse[] = this.getAnnouncements.filter(announcement => announcement.announcementStatus === 'ACTIVE');
         return this.getAnnouncements.filter((announcement: { announcementStatus: string; }) => announcement.announcementStatus === 'ACTIVE').slice(0, 3);
      },
      ...mapGetters('login', ['getRole', 'getUserGUID', 'isLoggedIn']),
      ...mapGetters('instructors', ['getSubscribedInstructors']),
      ...mapGetters('announcements', ['getAnnouncements']),
   },
   methods: {
      getAnnouncementsUrl(instructorGUID: string): string {
         return "http://localhost:8081/announcement/" + instructorGUID;
      },
      async refreshAnnouncements(): Promise<void> {
         if (this.getRole === 'STUDENT') {
            const response: Response = await fetch(this.getSubscribedInstructorsEndpoint, {
               method: 'GET',
               credentials: 'include'
            })

            if (response.ok) {
               const data: GetUserResponse[] = await response.json();
               store.dispatch('instructors/setSubscribedInstructors', data)
            }

            for (const instructor of this.getSubscribedInstructors) {
               const instructorGUID: string = instructor.userGUID;

               const response: Response = await fetch(this.getAnnouncementsUrl(instructorGUID), {
                  method: 'GET',
                  credentials: 'include'
               });
               if (response.ok) {
                  const data: GetAnnouncementResponse[] = await response.json();
                  if (data.length > 0)  {
                     store.dispatch('announcements/setAnnouncements', data)
                  }
               }
            }
         } else {
            // userGUID is the instructorGUID
            const response: Response = await fetch(this.getAnnouncementsUrl(this.getUserGUID), {
               method: 'GET',
               credentials: 'include'
            });
            if (response.ok) {
               const data: GetAnnouncementResponse[] = await response.json();
               store.dispatch('announcements/setAnnouncements', data);
            }
         } 

      },
      async refreshAll(): Promise<void> {
         await this.refreshAnnouncements();
      }
   },
   async created(): Promise<void> {
      if (!this.isLoggedIn) {
         this.$router.push('/login');
      } else {
         if (this.getRole === 'STUDENT') {
            const response: Response = await fetch(this.getSubscribedInstructorsEndpoint, {
               method: 'GET',
               credentials: 'include'
            })

            if (response.ok) {
               const data: GetUserResponse[] = await response.json();
               store.dispatch('instructors/setSubscribedInstructors', data)
            }

            var allAnnouncements = [];
            for (const instructor of this.getSubscribedInstructors) {
               const response: Response = await fetch(this.getAnnouncementsUrl(instructor.userGUID), {
                  method: 'GET',
                  credentials: 'include'
               });
               if (response.ok) {
                  const data: GetAnnouncementResponse[] = await response.json();
                  if (data.length > 0)  {
                     allAnnouncements.push(...data);
                     store.dispatch('announcements/setAnnouncements', allAnnouncements)
                  }
               }
            }
         } else {
            const response = await fetch(this.getAnnouncementsUrl(this.getUserGUID), {
               method: 'GET',
               credentials: 'include'
            });
            if (response.ok) {
               const data = await response.json();
               store.dispatch('announcements/setAnnouncements', data);
            }
         } 
      }
   },
})
</script>