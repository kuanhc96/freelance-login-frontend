<template>
    <div class="mt-7">
        <button @click="startOAuth">Login with Auth Server</button>
    </div>
</template>

<script>
export default {
    methods: {
        startOAuth() {
            window.location.href = "http://localhost:8072/authorize"
        }
    }
}
</script>
