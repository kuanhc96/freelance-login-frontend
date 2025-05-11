<template>
    <base-summary summary-title="Alice Ho">
        <p>Email: {{email}}</p>
        <div class="mb-3">
            <span class="badge bg-info me-2" 
                v-for="subject in filteredSubjects" 
                :key="subject.subjectName"
            >{{subject.subjectName}}</span>
        </div>
        <div class="actions">
            <router-link :to="contactLink" class="btn btn-primary me-2">Contact</router-link>
            <router-link :to="detailsLink" class="btn btn-secondary">View Details</router-link>
        </div>
    </base-summary>
</template>

<script>
import BaseSummary from '../ui/BaseSummary.vue';
export default {
    props: [
        'instructorGUID', 'instructorName', 'email'
    ],
    components: {
        BaseSummary
    },
    computed: {
        contactLink() {
            return this.$route.path + '/' + this.instructorGUID + '/contact';
        },
        detailsLink() {
            return this.$route.path + '/' + this.instructorGUID;
        },
        filteredSubjects() {
            return this.$store.getters['subjects/subjects'];
        },
        hasSubjects() {
            return this.$store.getters['subjects/hasSubjects']
        }
    }
    
}
</script>