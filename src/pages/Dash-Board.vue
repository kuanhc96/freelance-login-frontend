<template>
   <section>
      <BaseCard
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
                           <router-link to="/announcements/create" class="btn btn-primary btn-sm">Add New</router-link>
                        </div>
                     </h2>
                     <DashboardAnnouncement
                        v-for="announcement in mostRecentActiveAnnouncements"
                        :key="announcement.announcementGUID"
                        :announcement-id="announcement.announcementGUID"
                        :title="announcement.title"
                        :date="announcement.createdDate"
                        :name="announcement.instructorName"
                        :status="announcement.announcementStatus"
                        :announcement="announcement.announcement"
                        @announcement-updated="refreshAnnouncements()"
                     ></DashboardAnnouncement>
                     <div v-if="role === 'STUDENT' && announcements.length > 3" class="d-flex justify-content-center">
                        <div class="fs-bold fs-2">...</div>
                     </div>
                     <div v-if="role === 'STUDENT' && announcements.length > 3" class="d-flex justify-content-center">
                        <router-link to="/announcements" class="btn btn-primary btn-sm stretched-link">View All</router-link>
                     </div>
                     <div v-if="role === 'INSTRUCTOR'" class="d-flex justify-content-center">
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
                     <dashboard-lesson></dashboard-lesson>
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
                        <div v-if="role==='STUDENT'" class="d-flex gap-2">
                           <router-link to="/instructors/search" class="btn btn-primary btn-sm">Search</router-link>
                        </div>
                     </h3>
                     <DashboardInstructor v-for="instructor in subscribedInstructors"
                        :key="instructor.userGUID"
                        :instructorGUID="instructor.userGUID"
                        :instructorName="instructor.name"
                        :email="instructor.email"
                        :portrait-path="'/alice.jpg'">
                     </DashboardInstructor>
                     <div v-if="subscribedInstructors.length > 3" class="d-flex justify-content-center">
                        <div class="fs-bold fs-2">...</div>
                     </div>
                     <div v-if="subscribedInstructors.length > 3" class="d-flex justify-content-center">
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
   </BaseCard>
   </section>
</template>

<script setup lang="ts">
import BaseCard from '../components/ui/BaseCard.vue'
import DashboardAnnouncement from '../components/announcements/DashboardAnnouncement.vue';
import DashboardInstructor from '../components/instructors/DashboardInstructor.vue';
import DashboardLesson from '../components/lessons/DashboardLesson.vue';

import { useStore } from 'vuex';
import { computed, onBeforeMount } from 'vue';
import { GetUserResponse } from '@/dto/response/getUserResponse';
import type { RootState } from '@/store/types'
import { GetAnnouncementResponse } from '@/dto/response/getAnnouncementResponse';
const store = useStore<RootState>();

const subscribedInstructorsEndpoint = computed<string>(() =>
   store.getters['login/backendService'] + 'subscription/' + store.getters['login/getUserGUID']
)

const subscribedInstructors = computed<Array<GetUserResponse>>(() => 
   store.getters['instructors/getSubscribedInstructors']
)

const announcements = computed<Array<GetAnnouncementResponse>>(() =>
   store.getters['announcements/getAnnouncements']
)

const mostRecentActiveAnnouncements = computed<Array<GetAnnouncementResponse>>(() => {
   const activeAnnouncements = announcements.value.filter(
      announcement => announcement.announcementStatus === 'ACTIVE'
   );
   return activeAnnouncements.slice(0, 3);
})

const role = computed<String>(() => 
   store.getters['login/getRole']
)

function getAnnouncementsUrl(instructorGUID: string): string {
   return store.getters['login/backendService'] + 'announcement/' + instructorGUID
}

async function refreshAnnouncements(): Promise<void> {
   if (store.getters['login/getRole'] === 'STUDENT') {
      const response: Response = await fetch(subscribedInstructorsEndpoint.value, {
         method: 'GET',
         credentials: 'include'
      })

      if (response.ok) {
         const data: Array<GetUserResponse> = await response.json();
         store.dispatch('instructors/setInstructors', { instructors: data })
      }

      const subscribedInstructors: Array<GetUserResponse> = store.getters['instructors/instructors'];
      var allAnnouncements = [];
      for (const instructor of subscribedInstructors) {
         const instructorGUID: string = instructor.userGUID;

         const response: Response = await fetch(getAnnouncementsUrl(instructorGUID), {
            method: 'GET',
            credentials: 'include'
         });

         if (response.ok) {
            const data: Array<GetAnnouncementResponse> = await response.json();
            if (data.length > 0)  {
               allAnnouncements.push(...data);
               store.dispatch('announcements/setAnnouncements', {announcements: allAnnouncements})
            }
         }
      }
   } else {
      const instructorGUID: string = store.getters['login/getUserId'];

      const response: Response = await fetch(getAnnouncementsUrl(instructorGUID), {
         method: 'GET',
         credentials: 'include'
      });
      if (response.ok) {
         const data: Array<GetAnnouncementResponse> = await response.json();
         store.dispatch('announcements/setAnnouncements', { announcements: data });
      }
   } 

}

async function refreshAll(): Promise<void> {
   await refreshAnnouncements();
}

onBeforeMount(
   async () => await refreshAnnouncements()
)
</script>