<template>
    <h1>Instructors</h1>
    <section>
        <base-card>
        <div class="refresh">
            <base-button mode="outline">Refresh</base-button>
        </div>
        <ul v-if="hasInstructors">
            <instructor-summary 
                v-for="instructor in filteredInstructors" 
                :key="instructor.id"
                :instructorGUID="instructor.instructorGUID"
                :instructorName="instructor.instructorName"
                :email="instructor.email"
            ></instructor-summary>
        </ul>
        <h2 v-else>No coaches found</h2>
        </base-card>
    </section>
</template>

<script>
import InstructorSummary from '../../components/instructors/InstructorSummary.vue'
export default {
    components: {
        InstructorSummary
    },
    computed: {
        filteredInstructors() {
            return this.$store.getters['instructors/instructors'];
        },
        hasInstructors() {
            return this.$store.getters['instructors/hasInstructors']
        }
    }
    
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.refresh {
  display: flex;
  justify-content: space-between;
}

</style>