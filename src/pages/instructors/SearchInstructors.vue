<template>
    <section>
        <base-card 
            card-title="Search For Instructors"
            @refresh="refresh"
        >
            <div class="d-flex align-items-center flex-column">
                <div class="col-md-10 col-10">
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
                            v-for="instructor in getUnsubscribedInstructors"
                            :key="instructor.id"
                            :instructorGUID="instructor.userGUID"
                            :instructorName="instructor.name"
                            :email="instructor.email"
                            :portraitPath="'/alice.jpg'"
                            :display-subscribe="true"
                        ></instructor-summary>
                    
                    </ul> 
                    <ul class="d-flex align-items-center list-group my-3 p-1" v-else>
                        <instructor-summary
                            class="mb-3"
                            v-for="instructor in filteredInstructors"
                            :key="instructor.id"
                            :instructorGUID="instructor.userGUID"
                            :instructorName="instructor.name"
                            :email="instructor.email"
                            :portraitPath="'/alice.jpg'"
                            
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
import { mapGetters } from 'vuex'
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
        const response = await fetch(this.getUnsubscribedInstructorsEndpoint, {
            method: 'GET',
            credentials: 'include'
        })

        if (response.ok) {
            const data = await response.json();
            this.$store.dispatch('instructors/setUnsubscribedInstructors', data)
        }
    },
    methods: {
        async refresh() {
            const response = await fetch(this.getUnsubscribedInstructorsEndpoint, {
                method: 'GET',
                credentials: 'include'
            })
            console.log(response)

            if (response.ok) {
                const data = await response.json();
                this.$store.dispatch('instructors/setUnsubscribedInstructors', data)
                console.log(this.unsubscribedInstructors)
            }
        }
    },
    computed: {
        ...mapGetters('instructors', ['getUnsubscribedInstructors', 'hasUnsubscribedInstructors']),
        isKeywordBlank() {
            return this.keyword === '';
        },
        getUnsubscribedInstructorsEndpoint() {
            return 'http://localhost:8081/subscription/unsubscribed/' + this.$store.getters['login/getUserGUID'];
        },
        // unsubscribedInstructors() {
        //     return this.$store.getters['instructors/getUnsubscribedInstructors'].unsubscribedInstructors;
        // },
        filteredInstructors() {
            const filtered = this.getUnsubscribedInstructors
                .filter(instructor => instructor.instructorName.toLowerCase().includes(this.keyword.toLowerCase()));
            return filtered
        },
    }
    
}
</script>