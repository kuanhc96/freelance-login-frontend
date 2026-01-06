<template>
    <div class="mt-7">
        <button @click="startOAuth">Login with Auth Server</button>
        <button @click="checkSession">Check Session</button>
    </div>
</template>

<script>
export default {
    methods: {
        startOAuth() {
            window.location.href = "http://localhost:8072/login"
        },
        async checkSession() {
            const response = await fetch("http://localhost:8072/checkSession", {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                const responseBody = await response.json();
                localStorage.setItem("email", responseBody.email)
                localStorage.setItem("role", responseBody.role)
            }
        }
    }
}
</script>
