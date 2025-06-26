<template>
    <section>
        <base-card 
            card-title="Subscribed Instructors"
            @refresh="refresh"
        >
            <div class="d-flex align-items-center flex-column">
                <div class="col-md-10 col-10">
                    <the-search-bar
                        :id="'search-instructors'" 
                        :placeholder="'Search Instructors'" 
                        v-model="keyword"
                    ></the-search-bar>
                    <ul class="d-flex align-items-center list-group my-3 p-1" v-if="isKeywordBlank">
                        <instructor-summary
                            class="mb-3"
                            v-for="instructor in subscribedInstructors"
                            :key="instructor.userGUID"
                            :instructorGUID="instructor.userGUID"
                            :instructorName="instructor.name"
                            :email="instructor.email"
                            :portraitPath="'/alice.jpg'"
                            :display-subscribe="false"
                        ></instructor-summary>
                    
                    </ul> 
                    <ul class="d-flex align-items-center list-group my-3 p-1" v-else>
                        <instructor-summary
                            class="mb-3"
                            v-for="instructor in filteredInstructors"
                            :key="instructor.userGUID"
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
import TheSearchBar from '../../components/layout/TheSearchBar.vue'
export default {
    data() {
        return {
            keyword: ''
        }
    },
    components: {
        InstructorSummary,
        BaseCard,
        TheSearchBar
    },
    computed: {
        isKeywordBlank() {
            return this.keyword === '';
        },
        subscribedInstructors() {
            return this.$store.getters['instructors/getSubscribedInstructors'].subscribedInstructors;
        },
        hasSubscribedInstructors() {
            return this.$store.getters['instructors/hasSubscribedInstructors']
        },
        filteredInstructors() {
            const subscribedInstructors = this.$store.getters['instructors/getSubscribedInstructors'];
            const filtered = subscribedInstructors.filter(instructor => instructor.name.toLowerCase().includes(this.keyword.toLowerCase()));
            return filtered
        },
        getSubscribedInstructorsEndpoint() {
            return 'http://localhost:8081/subscription/' + this.$store.getters['login/getUserGUID'];
        }
    },
    async created() {
        const response = await fetch(this.getSubscribedInstructorsEndpoint, {
            method: 'GET',
            credentials: 'include'
        })

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            this.$store.dispatch('instructors/setSubscribedInstructors', { subscribedInstructors: data })
            console.log((this.subscribedInstructors));
        }

    },
    methods: {
        async refresh() {
            const response = await fetch(this.getSubscribedInstructorsEndpoint, {
                method: 'GET',
                credentials: 'include'
            })

            if (response.ok) {
                const data = await response.json();
                this.$store.dispatch('instructors/setSubscribedInstructors', { subscribedInstructors: data })
            }
        }
    }
    
}
</script>