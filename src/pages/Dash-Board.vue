<template>
   <section>
      <base-card card-title="Dashboard">
         <div class="row d-flex justify-content-center my-3">
            <div class="col-md-10">
               <!-- <base-container title="Announcements"> -->
               <div class="card">
                  <div class="card-body">
                     <h2 class="card-title">Announcements</h2>
                     <p class="card-text">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos harum sapiente, cumque rerum minus rem saepe consequuntur at culpa molestiae.
                     </p>
                  </div>
               </div>
               <!-- </base-container> -->
            </div>
         </div>
         <div class="row d-flex justify-content-center mb-3">
            <div class="col-md-4">
               <base-container title="Upcoming Lessons">
                  <p class="card-text">
                     Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos harum sapiente, cumque rerum minus rem saepe consequuntur at culpa molestiae.
                  </p>
               </base-container>
            </div>
            <div class="col-md-4">
               <base-container title="Most Recent Transactions">
                  <p class="card-text">
                     Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos harum sapiente, cumque rerum minus rem saepe consequuntur at culpa molestiae.
                  </p>
               </base-container>
            </div>
         </div>
         <div class="row d-flex justify-content-center mb-3">
            <div class="col-md-4">
               <base-container title="Subscribed Instructors">
                  <p class="card-text">
                     {{ getSubscribedInstructors }}
                     Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos harum sapiente, cumque rerum minus rem saepe consequuntur at culpa molestiae.
                  </p>
               </base-container>
            </div>
            <div class="col-md-4">
               <base-container title="Acount Information">
                  <p class="card-text">
                     Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos harum sapiente, cumque rerum minus rem saepe consequuntur at culpa molestiae.
                  </p>
               </base-container>
            </div>
         </div>
      </base-card>
   </section>
</template>

<script>
import BaseCard from '../components/ui/BaseCard.vue';
import BaseContainer from '../components/ui/BaseContainer.vue';
export default {
    components: {
        BaseCard,
        BaseContainer
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