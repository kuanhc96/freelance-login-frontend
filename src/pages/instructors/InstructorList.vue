<template>
    <h1>Instructors</h1>
    <ul>
        <li>
            <instructor-summary/>
        </li>
    </ul>
</template>

<script>
import InstructorSummary from '../../components/summary/InstructorSummary.vue'
export default {
    components: {
        InstructorSummary
    }
    
}
</script>
