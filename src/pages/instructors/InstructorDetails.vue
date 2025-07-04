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
import {PropType, defineComponent, ref, Ref, computed} from 'vue';
import store from "@/store";
export default defineComponent({
    name: 'InstructorDetails',
    props: {
        id: {
            type: String as PropType<string>,
            required: true
        }
    },
    setup(props) {
        const selectedInstructor: Ref<GetUserResponse | null> = ref(null);
        const instructorName: Ref<string> = ref('');
        const description: Ref<string> = ref('The best golf coach ever!');

        const filteredSubjects: Ref<GetSubjectResponse[]> = computed(function() {
            return store.getters['subjects/getSubjectsByInstructorGUID'](props.id)
        })

        const subscribedInstructors: Ref<GetUserResponse[]> = computed(function() {
            return store.getters["instructors/getSubscribedInstructors"]
        })

        return {
            selectedInstructor,
            instructorName,
            description,
            filteredSubjects,
            subscribedInstructors
        }
    },
    created(): void {
        this.selectedInstructor = this.subscribedInstructors.find(
            (instructor: GetUserResponse) => instructor.userGUID === this.id
        )!;
        this.instructorName = this.selectedInstructor? this.selectedInstructor.name : '';
    }
});
</script>
