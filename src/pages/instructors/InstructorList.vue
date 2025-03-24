<template>
    <h1>Instructors</h1>
    <button>Refresh</button>
    <ul v-if="hasInstructors">
        <li v-for="instructor in filteredInstructors" :key="instructor.id">
            {{ instructor.instructorName }} 
        </li>
    </ul>
    <h2 v-else>No coaches found</h2>
</template>

<script>
// import InstructorSummary from '../../components/summary/InstructorSummary.vue'
export default {
    components: {
        // InstructorSummary
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
