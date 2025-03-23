<template>
    <base-summary :baseUrl='instructors' :id="`$instructorGUID`">
        <h3>{{ instructorName }}</h3> 
        <p>Email: {{email}}</p>
        <p>ID: {{instructorGUID}}</p>
    </base-summary>
</template>

<script>
import BaseSummary from './BaseSummary.vue';
export default {
    data() {
        return {
            instructorGUID: 'Test1234',
            email: 'example@test.com',
            instructorName: 'Alice Ho'
        }
    },
    components: {
        BaseSummary
    }
    
}
</script>