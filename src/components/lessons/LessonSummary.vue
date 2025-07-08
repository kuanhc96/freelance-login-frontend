<template>
    <h4>12/1</h4>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
export default defineComponent({
    props: {
        subject: {
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
        date: {
            type: String as PropType<string>,
            required: true
        }
    }
})
</script>
