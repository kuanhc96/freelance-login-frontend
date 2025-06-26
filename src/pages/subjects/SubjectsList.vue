<template>
    <section>
        <base-card 
            :card-title="'Courses'"
            @refresh="refresh"
        >
            <subject-summary
                v-for="instructor in getSubscribedInstructors" 
                :key="instructor.userGUID"
                :instructorGUID="instructor.userGUID"
                :instructorName="instructor.name"
                :subjects="getSubjectsByInstructorGUID(instructor.userGUID)"
            ></subject-summary>
        
        </base-card>
    </section>
</template>

<script>
import SubjectSummary from '@/components/subjects/SubjectAccordion.vue';
export default {
    components: {
        SubjectSummary
    },
    async created() {
        const response = await fetch(this.getSubscribedInstructorsEndpoint, {
            method: 'GET',
            credentials: 'include'
        });

        if (response.ok) {
            const data = await response.json();
            this.$store.dispatch('instructors/setSubscribedInstructors', { subscribedInstructors: data });
        }

        for (const instructor of this.$store.getters['instructors/getSubscribedInstructors'].subscribedInstructors) {
            const response = await fetch(this.getSubjectsByInstructorEndpoint(instructor.userGUID), {
                method: 'GET',
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                this.$store.dispatch('subjects/addSubjects', {instructorGUID: instructor.userGUID, subjects: data})
            }

        }

    },
    methods: {
        async refresh() {
            for (const instructor of this.$store.getters['instructors/getSubscribedInstructors']) {
                const response = await fetch(this.getSubjectsByInstructorEndpoint(instructor.userGUID), {
                    method: 'GET',
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    this.$store.dispatch('subjects/addSubjects', {instructorGUID: instructor.userGUID, subjects: data})
                }

            }


        },
        getSubjectsByInstructorEndpoint(instructorGUID) {
            return 'http://localhost:8081/subject/' + instructorGUID;
        },
        getSubjectsByInstructorGUID(instructorGUID) {
            return this.$store.getters['subjects/getSubjectsByInstructorGUID'](instructorGUID);
        }
    },
    computed: {
        getSubscribedInstructorsEndpoint() {
            return 'http://localhost:8081/subscription/' + this.$store.getters['login/getUserGUID'];
        },
        getSubscribedInstructors() {
            return this.$store.getters['instructors/getSubscribedInstructors'].subscribedInstructors;
        },
        
    }
}
</script>