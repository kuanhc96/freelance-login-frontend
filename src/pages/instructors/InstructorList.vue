<template>
    <h1>Instructors</h1>
    <button>Refresh</button>
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
</template>

<script>
import InstructorSummary from '../../components/summary/InstructorSummary.vue'
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
