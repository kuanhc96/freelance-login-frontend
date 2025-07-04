<template>
    <div class="input-group mt-3">
        <label :for="id" class="border rounded-start input-group-text">
            <i class="fa-solid fa-magnifying-glass"></i>
        </label>
        <input
            class="form-control fs-6 rounded-end col-md-10"
            type="text"
            :id="id"
            :placeholder="placeholder"
            :value="modelValue"
            @input="onInput"
        >
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref } from 'vue';
export default defineComponent({
    setup(_, context) {
        const input: Ref<string> = ref('');
        function onInput(event: Event): void {
            const target = event.target as HTMLInputElement
            context.emit('update:modelValue', target.value)
        }

        return {
            input,
            onInput
        }
    },
    props: {
        placeholder: {
            type: String as PropType<string>,
            required: true
        },
        id: {
            type: String as PropType<string>,
            required: true
        },
        modelValue: String as PropType<string>
    },
})
</script>
