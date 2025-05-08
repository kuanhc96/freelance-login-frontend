<template>
    <button v-if="!link" :to="to" class="btn btn-outline-primary m-1">
        <slot></slot>
    </button>
    <router-link v-else :to="to" class="btn btn-secondary m-1">
        <slot></slot>
    </router-link>
</template>

<script>
export default {
    props: {
        link: {
            type: Boolean,
            required: false,
            default: false
        },
        to: {
            type: String,
            required: false,
            default: '/'
        }
    }
}
</script>

<style scoped>
</style>