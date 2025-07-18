<script lang="ts">
import { defineComponent, PropType } from 'vue'
export default defineComponent({
    name: 'DashboardTransaction',
    props: {
        subjectName: String as PropType<string>,
        instructorOrStudentName: String as PropType<string>,
        numberOfLessons: Number as PropType<number>,
        paymentAmount: Number as PropType<number>
    }
})

</script>

<template>
    <div class="card bg-light m-3">
        <div class="card-body">
            <h5 class="card-title"> <span class="badge bg-primary text-dark">{{ subjectName }}</span> with {{ instructorOrStudentName }}</h5>
            <div class="card-text">
                <p>Number of Lessons: <span class="fw-bold">{{numberOfLessons}}</span></p>
                <p>Payment Amount: <span class="fw-bold">{{paymentAmount}}</span></p>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
