<template>
    <h1>InstructorDetails</h1>
    <section>
        <base-card
            card-title="Instructor Details">
            <h2>{{instructorName}} </h2>
            <p>{{ description }}</p>
            <h2>Available Subjects</h2>
            <span v-for="subject in filteredSubjects"
                  :key="subject.subjectGUID"
            >{{subject.subjectName}}</span>
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
import {PropType, defineComponent, ref, Ref, computed, onBeforeMount} from 'vue';
import { useInstructorsStore} from "@/store/instructorsOrStudents";
import { useSubjectsStore} from "@/store/subjects";

export default defineComponent({
    name: 'InstructorDetails',
    props: {
        id: {
            type: String as PropType<string>,
            required: true
        }
    },
    setup(props) {
        const instructorsStore = useInstructorsStore();
        const subjectsStore = useSubjectsStore();
        const selectedInstructor: Ref<GetUserResponse | null> = ref(null);
        const instructorName: Ref<string> = ref('');
        const description: Ref<string> = ref('The best golf coach ever!');

        const filteredSubjects: Ref<GetSubjectResponse[]> = computed(function() {
            return subjectsStore.getSubjectsByInstructorGUID(props.id);
        })

        const subscribedInstructors: Ref<GetUserResponse[]> = computed(function() {
            return instructorsStore.getSubscribedInstructors;
        })

        onBeforeMount(function(): void {
            selectedInstructor.value = subscribedInstructors.value.find(
                (instructor: GetUserResponse) => instructor.userGUID === props.id
            )!;
            instructorName.value = selectedInstructor.value? selectedInstructor.value.name : '';
        })
        return {
            selectedInstructor,
            instructorName,
            description,
            filteredSubjects,
            subscribedInstructors
        }
    }
});
</script>
