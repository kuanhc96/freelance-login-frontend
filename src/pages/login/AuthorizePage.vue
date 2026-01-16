<template>
    <div class="mt-7">
        <button @click="startOAuth">Login with Auth Server</button>
        <button @click="checkSession">Check Session</button>
        <button @click="testConnection">Test Connection</button>
    </div>
</template>

<script>
export default {
    methods: {
        startOAuth() {
            window.location.href = "http://localhost:8072/login"
        },
        async testConnection() {
            const response = await fetch("http://localhost:8072/freelance/appInfo/version", {
                method: "GET",
            });

            if (response.ok) {
                console.log("response",  await response.json())
            }
        },
        async checkSession() {
            const response = await fetch("http://localhost:8072/status", {
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
