<template>
    <section>
        <base-card 
            card-title="Instructors"
            @refresh="refresh"
        >
            <div class="d-flex align-items-center flex-column">
                <div class="col-md-10">
                    <div class="input-group mt-3">
                        <label for="search-instructors" class="border rounded-start input-group-text">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </label>
                        <input 
                            id="search-instructors" 
                            type="text" 
                            placeholder="Search Instructors" 
                            class="form-control fs-6 rounded-end col-md-10"
                            v-model="keyword"
                        >
                    </div>
                    <ul class="d-flex align-items-center list-group my-3 p-1" v-if="isKeywordBlank">
                        <instructor-summary
                            class="mb-3"
                            v-for="instructor in allInstructors"
                            :key="instructor.id"
                            :instructorGUID="instructor.instructorGUID"
                            :instructorName="instructor.instructorName"
                            :email="instructor.email"
                            :portraitPath="'../../assets/images/alice.jpg'"
                        ></instructor-summary>
                    
                    </ul> 
                    <ul class="d-flex align-items-center list-group my-3 p-1" v-else>
                        <instructor-summary
                            class="mb-3"
                            v-for="instructor in filteredInstructors"
                            :key="instructor.id"
                            :instructorGUID="instructor.instructorGUID"
                            :instructorName="instructor.instructorName"
                            :email="instructor.email"
                        ></instructor-summary>
                    </ul> 
                </div>
            </div>
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
    data() {
        return {
            keyword: ''
        }
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
        isKeywordBlank() {
            return this.keyword === '';
        },
        filteredInstructors() {
            const allInstructors = this.$store.getters['instructors/allInstructors'];
            const filtered = allInstructors.filter(instructor => instructor.instructorName.toLowerCase().includes(this.keyword.toLowerCase()));
            return filtered
        },
        allInstructors() {
            return this.$store.getters['instructors/allInstructors'];
        },
        hasAllInstructors() {
            return this.$store.getters['instructors/hasAllInstructors']
        }
    }
    
}
</script>