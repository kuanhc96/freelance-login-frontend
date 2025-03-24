<template>
    <h1>InstructorDetails</h1>
    <section>
        <base-card>
            <h2>{{instructorName}} </h2> 
        </base-card>
    </section>
    <section>
        <base-card>
            <header>
                <h2> Interested? Reach out now! </h2> 
                <base-button link :to="contactLink">Contact</base-button>
            </header>
            <router-view/>
        </base-card>
    </section>
    <section>
        <base-card>
            <base-badge v-for="subject in filteredSubjects" 
                :key="subject.subjectName"
                :type="subject.subjectName"
                :title="subject.subjectName"
            >{{subject.subjectName}}</base-badge>
            <p>{{ description }}</p> 
        </base-card>
    </section>
</template>

<script>
export default {
    props: ['id'],
    data() {
        return {
            selectedInstructor: null,
            instructorName: '',
            description: 'The best golf coach ever!'
        };
    },
    computed: {
        filteredSubjects() {
            return this.$store.getters['subjects/subjects'];
        }
    },
    created() {
        this.selectedInstructor = this.$store.getters['instructors/instructors'].find(
            (instructor) => instructor.id === this.id
        );
        this.instructorName = this.selectedInstructor.instructorName;
    }
};
</script>
