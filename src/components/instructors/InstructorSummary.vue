<template>
    <base-summary>
        <h3>{{ instructorName }}</h3> 
        <h4>Email: {{email}}</h4>
        <div>
            <span v-for="subject in filteredSubjects" :key="subject.subjectName">{{subject.subjectName}}</span>
        </div>
        <div class="actions">
            <router-link :to="contactLink">Contact</router-link>
            <router-link :to="detailsLink">View Details</router-link>
        </div>
    </base-summary>
</template>

<script>
import BaseSummary from '../summary/BaseSummary.vue';
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