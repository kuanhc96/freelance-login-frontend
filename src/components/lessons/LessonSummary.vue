<template>
    <div class="card w-100 h-100 bg-white m-3">
        <div class="card-body">
            <div class="d-flex justify-content-center align-items-center position-relative">
                <h2 class="card-title">{{ subjectName }}  with {{ studentOrInstructor }}</h2>
                <span class="badge bg-secondary position-absolute end-0">{{ status }}</span>
            </div>
            <div class="d-flex justify-content-center">
                <div class="card-text">
                    <h3 class="row ">On {{ humanReadableDate }} At {{ humanReadableTime }} At {{ location }}</h3>
                    <div class="d-flex justify-content-between">
                        <button class="btn btn-primary">View Lesson Details</button>
                        <button class="btn btn-secondary">Update Lesson Details</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, Ref} from 'vue'
export default defineComponent({
    props: {
        subjectName: {
            type: String as PropType<string>,
            required: true
        },
        studentOrInstructor: {
            type: String as PropType<string>,
            required: true
        },
        lessonGUID: {
            type: String as PropType<string>,
            required: true
        },
        status: {
            type: String as PropType<string>,
            required: true
        },
        dateTime: {
            type: String as PropType<string>,
            required: true
        },
        location: {
            type: String as PropType<string>,
            required: true
        },
    },
    setup(props) {
        const humanReadableDate: Ref<string> = computed(function() {
            if (props.dateTime == null) {
                return 'unscheduled';
            }
            const date = new Date(props.dateTime);
            const options: Intl.DateTimeFormatOptions = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };

            return date.toLocaleDateString('en-US', options);
        })

        const humanReadableTime: Ref<string> = computed(function() {
            if (props.dateTime == null) {
                return '';
            }
            const time = new Date(props.dateTime);
            const options: Intl.DateTimeFormatOptions = {
                hour: 'numeric',
                minute: 'numeric',
            };

            return time.toLocaleTimeString('en-US', options);
        })

        return {
            humanReadableDate,
            humanReadableTime
        }
    }
})
</script>
