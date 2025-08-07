<script setup lang="ts">
import {defineProps} from "vue";
import {GetUserResponse} from "@/dto/response/getUserResponse";
import {PropType} from "vue";
import ProfileDetails from "@/components/profile/ProfileDetails.vue";
const props = defineProps({
    user: {
        type: Object as PropType<GetUserResponse>,
        required: true,
    }
});
</script>

<template>
    <div class="modal fade" :id="'modal' + props.user.userGUID">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">{{props.user.name}}'s Profile</h1>
                    <button class="btn btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <ProfileDetails
                        :userInfo="props.user"
                        :disableToggle="true"
                    />
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>

</style>
