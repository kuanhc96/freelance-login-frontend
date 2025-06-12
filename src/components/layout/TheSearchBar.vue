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

<script>
export default {
    data() {
        return {
            input: ''
        }
    },
    props: {
        placeholder: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        },
        modelValue: String
    },
    methods: {
        onInput(event) {
            this.$emit('update:modelValue', event.target.value)
        }
    }
}
</script>