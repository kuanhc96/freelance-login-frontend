<template>
   <section>
      <base-card card-title="Dashboard">
      <div class="d-flex flex-column ">
         <div class="row my-3 justify-content-center">
            <div class="col-md-10">
               <div class="card w-100 h-100">
                  <div class="card-body">
                     <h2 class="card-title">Announcements</h2>
                     <p class="card-text">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos harum sapiente, cumque rerum minus rem saepe consequuntur at culpa molestiae.
                     </p>
                  </div>
               </div>
            </div>
         </div>
         <div class="row mb-3 justify-content-center">
            <div class="col-md-4">
               <div class="card w-100 h-100">
                  <div class="card-body">
                     <h2 class="card-title">Upcoming Courses</h2>
                     <p class="card-text">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos harum sapiente, cumque rerum minus rem saepe consequuntur at culpa molestiae.
                     </p>
                  </div>
               </div>
            </div>
            <div class="col-md-4">
               <div class="card w-100 h-100">
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
            <div class="col-md-4">
               <div class="card w-100 h-100">
                  <div class="card-body">
                     <h2 class="card-title">Subscribed Instructors</h2>
                     <p class="card-text">
                        {{ getSubscribedInstructors }}
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos harum sapiente, cumque rerum minus rem saepe consequuntur at culpa molestiae.
                     </p>
                  </div>
               </div>
            </div>
            <div class="col-md-4">
               <div class="card w-100 h-100">
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
export default {
    components: {
        BaseCard,
    },
   async created() {
        const response = await fetch(this.getSubscribedInstructorsEndpoint, {
          method: 'GET',
          credentials: 'include'
        })

        if (response.ok) {
            const data = await response.json();
            this.$store.dispatch('instructors/setInstructors', { instructors: data })
        }
        
   },
   computed: {
      getSubscribedInstructorsEndpoint() {
         return 'http://localhost:8081/subscription/' + this.$store.getters['login/getUserId'];
      },
      getSubscribedInstructors() {
         return this.$store.getters['instructors/instructors']
      }
   }
   
}
</script>