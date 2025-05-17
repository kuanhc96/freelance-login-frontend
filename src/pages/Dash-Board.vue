<template>
   <section>
      <base-card card-title="Dashboard">
         <div class="row">
            <div class="m-3">
               <div class="card ">
                  <div class="card-body">
                     <h4 class="card-title">Announcement</h4>
                     <p class="card-text">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos harum sapiente, cumque rerum minus rem saepe consequuntur at culpa molestiae.
                     </p>
                  </div>
               </div>
            </div>
            <div class="col-md-6">
               <div class="card ">
                  <div class="card-body">
                     <h4 class="card-title">Upcoming Lesson</h4>
                     <p class="card-text">Lorem ipsum dolor sit amet.</p>
                  </div>
               </div>
            </div>
            <div class="col-md-6">
               <div class="card ">
                  <div class="card-body">
                     <h4 class="card-title">Most Recent Transaction</h4>
                     <p class="card-text">Lorem ipsum dolor sit amet.</p>
                  </div>
               </div>
            </div>
            <div class="col-md-6">
               <div class="card ">
                  <div class="card-body">
                     <h4 class="card-title">Subscribed Instructors</h4>
                     <p class="card-text">Lorem ipsum dolor sit amet.</p>
                  </div>
               </div>
            </div>
            <div class="col-md-6">
               <div class="card ">
                  <div class="card-body">
                     <h4 class="card-title">Account Information</h4>
                     <p class="card-text">Lorem ipsum dolor sit amet.</p>
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
        BaseCard
    },
   
}
</script>