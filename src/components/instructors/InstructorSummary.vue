<template>
    <base-summary>
        <div class="d-flex justify-content-center align-items-stretch w-100 hstack gap-4">
            <div class="d-flex flex-column align-items-center">
                <div class="portrait-img rounded-circle overflow-hidden border " style="width:250px; height:250px;">
                    <img class="h-100 w-100 object-fit-cover" src="../../assets/images/alice.jpg" alt="portrait"> 
                </div>
            </div>
            <div class="d-flex flex-column align-items-center justify-content-center">
                <div class="display-5">Alice Ho</div>
                <div class="my-3 d-flex flex-wrap flex-md-nowrap w-100 gap-2 justify-content-center">
                    <span class="badge text-bg-light fs-6" 
                        v-for="subject in filteredSubjects" 
                        :key="subject.subjectName"
                    >{{subject.subjectName}}</span>
                </div>
                <div class="actions d-flex flex-wrap flex-md-nowrap w-100 gap-2 justify-content-center">
                    <router-link :to="contactLink" class="btn btn-primary  flex-fill text-center">Contact</router-link>
                    <router-link :to="detailsLink" class="btn btn-secondary flex-fill text-center">View Details</router-link>
                </div>
            </div>
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