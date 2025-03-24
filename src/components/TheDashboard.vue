<template>
  <base-card>
    <h1>Dashboard</h1> 
    <base-container title="Upcoming Courses">
        <course-summary></course-summary> 
    </base-container>
    <base-container title="Profile"></base-container>
    <base-container title="Instructors"></base-container>
  </base-card>
</template>

<script>
import BaseContainer from './ui/BaseContainer.vue';
import BaseCard from './ui/BaseCard.vue';
import CourseSummary from './Courses/CourseSummary.vue';
export default {
  components: {
    BaseContainer,
    BaseCard,
    CourseSummary
  }
    
}
</script>