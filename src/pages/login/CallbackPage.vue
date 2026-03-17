<script setup lang="ts">
import {onBeforeMount} from "vue";

onBeforeMount(async () => {
    const urlString: string = window.location.search;
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
