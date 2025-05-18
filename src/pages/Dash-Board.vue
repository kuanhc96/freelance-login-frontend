<template>
   <section>
      <base-card card-title="Dashboard">
         <div class="row d-flex justify-content-center my-3">
            <div class="col-md-10">
               <base-summary summaryTitle="Announcements">
                  <p class="card-text">
                     Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos harum sapiente, cumque rerum minus rem saepe consequuntur at culpa molestiae.
                  </p>
               </base-summary>
            </div>
         </div>
         <div class="row d-flex justify-content-center mb-3">
            <div class="col-md-4">
               <base-summary summaryTitle="Upcoming Lessons">
                  <p class="card-text">
                     Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos harum sapiente, cumque rerum minus rem saepe consequuntur at culpa molestiae.
                  </p>
               </base-summary>
            </div>
            <div class="col-md-4">
               <base-summary summaryTitle="Most Recent Transactions">
                  <p class="card-text">
                     Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos harum sapiente, cumque rerum minus rem saepe consequuntur at culpa molestiae.
                  </p>
               </base-summary>
            </div>
         </div>
         <div class="row d-flex justify-content-center mb-3">
            <div class="col-md-4">
               <base-summary summaryTitle="Subscribed Instructors">
                  <p class="card-text">
                     Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos harum sapiente, cumque rerum minus rem saepe consequuntur at culpa molestiae.
                  </p>
               </base-summary>
            </div>
            <div class="col-md-4">
               <base-summary summaryTitle="Acount Information">
                  <p class="card-text">
                     Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos harum sapiente, cumque rerum minus rem saepe consequuntur at culpa molestiae.
                  </p>
               </base-summary>
            </div>
         </div>
      </base-card>
   </section>
</template>

<script>
import BaseCard from '../components/ui/BaseCard.vue';
import BaseSummary from '../components/ui/BaseSummary.vue';
export default {
    components: {
        BaseCard,
        BaseSummary
    },
   
}
</script>