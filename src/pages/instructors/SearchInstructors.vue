<template>
    <section>
        <base-card 
            card-title="Instructors"
            @refresh="refresh"
        >
            <ul class="my-3 p-1" v-if="hasAllInstructors">
                <instructor-summary
                    class="mb-3"
                    v-for="instructor in allInstructors"
                    :key="instructor.id"
                    :instructorGUID="instructor.instructorGUID"
                    :instructorName="instructor.instructorName"
                    :email="instructor.email"
                ></instructor-summary>
            </ul> 
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
    async created() {
        const response = await fetch('http://localhost:8081/instructor/getAllInstructors', {
            method: 'GET',
            credentials: 'include'
        });

        var allInstructors = [];
        if (response.ok) {
            allInstructors = await response.json();
        }

        this.$store.dispatch('instructors/setAllInstructors', {allInstructors: allInstructors})
    },
    methods: {
        async refresh() {
            const response = await fetch('http://localhost:8081/instructor/getAllInstructors', {
                method: 'GET',
                credentials: 'include'
            });

            var allInstructors = [];
            if (response.ok) {
                allInstructors = await response.json();
            } 
            this.$store.dispatch('instructors/setAllInstructors', {allInstructors: allInstructors})

        }
    },
    computed: {
        allInstructors() {
            return this.$store.getters['instructors/allInstructors'];
        },
        hasAllInstructors() {
            return this.$store.getters['instructors/hasAllInstructors']
        }
    }
    
}
</script>