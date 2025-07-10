<template>
    <div class="card bg-light m-3">
        <div class="card-body">
<!--            <div class="d-flex align-items-center justify-content-start">-->
            <h5 class="card-title"> <span class="badge bg-primary text-dark">{{ subject }}</span> with {{ studentOrInstructorName }}</h5>
            <div class="card-text">
                <p>
                    On <span class="fw-bold">{{ humanReadableDate }}</span>
                    At <span class="fw-bold">{{ humanReadableTime }}</span>
                    At <span class="fw-bold">{{ location }}</span>
                </p>
                <div class="d-flex justify-content-end">
                    <button  class="btn badge bg-secondary border-0">View Details >></button>
                </div>
            </div>
<!--            </div>-->
        </div>
    </div>
</template>
<script lang="ts">
import {Ref, computed, defineComponent, PropType} from 'vue'
export default defineComponent({
    props: {
        lessonGUID: {
            type: String as PropType<string>,
            required: true
        },
        studentOrInstructorName: {
            type: String as PropType<string>,
            required: true
        },
        subject: {
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
            const date = new Date(props.dateTime);
            const options: Intl.DateTimeFormatOptions = {
                month: 'long',
                day: 'numeric'
            };

            return date.toLocaleDateString('en-US', options);

        })

        const humanReadableTime: Ref<string> = computed(function() {
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
