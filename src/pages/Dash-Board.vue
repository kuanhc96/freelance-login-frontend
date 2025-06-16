<template>
   <section>
      <base-card card-title="Dashboard">
      <div class="d-flex flex-column ">
         <div class="row my-3 justify-content-center">
            <div class="col-md-10">
               <div class="card w-100 h-100 shadow">
                  <div class="card-body">
                     <h2 class="card-title d-flex justify-content-between">
                        <div class="">
                           Announcements
                        </div>
                        <div v-if="getRole==='INSTRUCTOR'" class="d-flex gap-2">
                           <router-link to="/announcements/create" class="btn btn-secondary btn-sm">Add New</router-link>
                        </div>
                     </h2>
                     <dashboard-announcement 
                        v-for="announcement in getMostRecentAnnouncements"
                        :key="announcement.announcementGUID"
                        :announcement-id="announcement.announcementGUID"
                        :title="announcement.title"
                        :date="announcement.createdDate"
                        :name="announcement.instructorName"
                        :announcement="announcement.announcement"
                     ></dashboard-announcement>
                     <div v-if="getMostRecentAnnouncements.length > 3" class="d-flex justify-content-center">
                        <div class="fs-bold fs-2">...</div>
                     </div>
                     <div v-if="getMostRecentAnnouncements.length > 3" class="d-flex justify-content-center">
                        <router-link to="/announcements" class="btn btn-primary btn-sm stretched-link">View All</router-link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div class="row mb-3 justify-content-center">
            <div class="col-md-5">
               <div class="card w-100 h-100 shadow">
                  <div class="card-body">
                     <h2 class="card-title">Upcoming Courses</h2>
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
                     <h2 class="card-title">Subscribed Instructors</h2>
                     <p class="card-text">
                        {{ getSubscribedInstructors }}
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos harum sapiente, cumque rerum minus rem saepe consequuntur at culpa molestiae.
                     </p>
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

<script>
import BaseCard from '../components/ui/BaseCard.vue';
import DashboardAnnouncement from '../components/announcements/DashboardAnnouncement.vue';
export default {
    components: {
        BaseCard,
        DashboardAnnouncement
    },
   async created() {
      if (!this.$store.getters['login/isLoggedIn']) {
         this.$router.push('/login');
      } else {
        const response = await fetch(this.getSubscribedInstructorsEndpoint, {
          method: 'GET',
          credentials: 'include'
        })

        if (response.ok) {
            const data = await response.json();
            this.$store.dispatch('instructors/setInstructors', { instructors: data })
        }
      }

      if (!this.$store.getters['announcements/getAnnouncements']) {
         const subscribedInstructors = this.$store.getters['instructors/instructors'];
         for (const instructor of subscribedInstructors) {
            const instructorGUID = instructor.userGUID;

            const response = await fetch(this.getAnnouncementsUrl(instructorGUID), {
               method: 'GET',
               credentials: 'include'
            });
            if (response.ok) {
               const data = await response.json();
               console.log(data);
               this.$store.dispatch('announcements/setAnnouncements', { announcements: data });
            }

         }
      }
   },
   computed: {
      getSubscribedInstructorsEndpoint() {
         return 'http://localhost:8081/subscription/' + this.$store.getters['login/getUserId'];
      },
      getSubscribedInstructors() {
         return this.$store.getters['instructors/instructors']
      },
      getMostRecentAnnouncements() {
         return this.$store.getters['announcements/getAnnouncements'].slice(0, 3)
      },
      getRole() {
         return this.$store.getters['login/getRole'];
      }
   },
   methods: {
      getAnnouncementsUrl(instructorGUID) {
         return "http://localhost:8081/announcement/" + instructorGUID;
      },
   }
   
}
</script>