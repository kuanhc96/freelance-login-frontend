<script setup lang="ts">
// import {useOAuthClient} from "@volverjs/auth-vue";
import {onBeforeMount} from "vue";
// import router from "@/router/router";

// const authClient = useOAuthClient();
onBeforeMount(async () => {
    // authClient.handleCodeResponse(new URLSearchParams(urlParams));
    // router.replace("/");
    const urlString: string = window.location.search;
    // const authCode = urlParams
    const response: Response = await fetch(
        'http://localhost:8083/api/oauth/tokens' + urlString, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }
    );

    const responseBody = await response.json();
    if (responseBody.successUrl) {
        console.log(responseBody.successUrl);
        window.location.href = responseBody.successUrl;
    }
})

</script>

<template>
    <div>Redirecting...</div>
</template>

<style scoped>

</style>
