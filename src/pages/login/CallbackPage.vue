<script setup lang="ts">
import {onBeforeMount} from "vue";
import LoginService from "@/services/LoginService";

onBeforeMount(async () => {
    LoginService.tokenLogin()
        .then((res) => {
            if (res.data.successUrl) {
                console.log(res.data.successUrl);
                window.location.href = res.data.successUrl;
            }

        });
})

</script>

<template>
    <div>Redirecting...</div>
</template>
