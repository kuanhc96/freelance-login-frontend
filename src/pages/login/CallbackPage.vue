<script setup lang="ts">
import {onBeforeMount} from "vue";
import LoginService from "@/services/LoginService";

onBeforeMount(async () => {
    const data = await LoginService.tokenLogin();
    if (data.successUrl) {
        console.log(data.successUrl);
        window.location.href = data.successUrl;
    }

})

</script>

<template>
    <div>Redirecting...</div>
</template>
