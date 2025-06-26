<template>
    <h1>InstructorDetails</h1>
    <section>
        <base-card>
            <h2>{{instructorName}} </h2> 
            <p>{{ description }}</p> 
        </base-card>
    </section>
    <section>
        <base-card>
            <h2>Available Subjects</h2>
            <span v-for="subject in filteredSubjects" 
                :key="subject.subjectName"
            >{{subject.subjectName}}</span>
        </base-card>
    </section>
    <section>
        <base-card>
            <header>
                <h2> Interested? Reach out now! </h2> 
                <button link :to="contactLink">Contact</button>
            </header>
            <router-view/>
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
            return this.$store.getters['subjects/getSubjectsByInstructorGUID'](this.id);
        }
    },
    created() {
        this.selectedInstructor = this.$store.getters['instructors/getSubscribedInstructors'].find(
            (instructor) => instructor.id === this.id
        );
        this.instructorName = this.selectedInstructor.instructorName;
    }
};
</script>
