<template>
    <base-summary summary-title="Alice Ho">
        <p>Email: {{email}}</p>
        <div>
            <base-badge v-for="subject in filteredSubjects" 
                :key="subject.subjectName"
                :type="subject.subjectName"
                :title="subject.subjectName"
            ></base-badge>
        </div>
        <div class="actions">
            <base-button link mode="outline" :to="contactLink">Contact</base-button>
            <base-button link :to="detailsLink">View Details</base-button>
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