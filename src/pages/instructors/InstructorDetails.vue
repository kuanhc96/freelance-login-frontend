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
                <button link :to="'#'">Contact</button>
            </header>
            <router-view/>
        </base-card>
    </section>
</template>

<script lang="ts">
import { GetSubjectResponse } from '@/dto/response/getSubjectResponse';
import { GetUserResponse } from '@/dto/response/getUserResponse';
import { PropType, defineComponent } from 'vue';
import { mapGetters } from 'vuex';
export default defineComponent({
    name: 'InstructorDetails',
    props: {
        id: {
            type: String as PropType<string>,
            required: true
        }
    },
    data(): {
        selectedInstructor: GetUserResponse | null,
        instructorName: string,
        description: string
    } {
        return {
            selectedInstructor: null,
            instructorName: '',
            description: 'The best golf coach ever!'
        };
    },
    computed: {
        filteredSubjects(): GetSubjectResponse[] {
            return this.getSubjectsByInstructorGUID(this.id);
        },
        ...mapGetters('instructors', ['getSubscribedInstructors']),
        ...mapGetters('subjects', ['getSubjectsByInstructorGUID'])
    },
    created(): void {
        this.selectedInstructor = this.getSubscribedInstructors.find(
            (instructor: { id: string; }) => instructor.id === this.id
        );
        this.instructorName = this.selectedInstructor? this.selectedInstructor.name : '';
    }
});
</script>
