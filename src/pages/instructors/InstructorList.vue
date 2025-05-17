<template>
    <section>
        <base-card card-title="Instructors">
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
import BaseCard from '../../components/ui/BaseCard.vue'
export default {
    components: {
        InstructorSummary,
        BaseCard
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
</style>