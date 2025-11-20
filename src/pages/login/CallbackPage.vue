<script setup lang="ts">
// import {useOAuthClient} from "@volverjs/auth-vue";
import {onBeforeMount} from "vue";
// import router from "@/router/router";

// const authClient = useOAuthClient();
onBeforeMount(async () => {
    // authClient.handleCodeResponse(new URLSearchParams(urlParams));
    // router.replace("/");
    const urlString: string = window.location.search;
    const urlParams = new URLSearchParams(urlString);
    console.log("callback!!!!!");
    console.log(urlParams);
    // const authCode = urlParams
    const response: Response = await fetch(
        'http://localhost:8072/callback' + urlString, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }
    );
    console.log(response);
})

</script>

<template>
    <div>Redirecting...</div>
</template>

<style scoped>

</style>
