<script setup lang="ts">
import {useInstructorsOrStudentsStore} from "@/store/instructorsOrStudents";
import ProfileDetailsModal from "@/components/profile/ProfileDetailsModal.vue";
import {reactive, computed} from "vue";
const store = useInstructorsOrStudentsStore();
const state = reactive({
    myInfo: computed(() => {
        if (store.getMyInfo) {
           return store.getMyInfo;
        } else {
            return {};
        }
    })
});
</script>

<template>
<div class="d-flex align-items-center justify-content-around">
    <div class="portrait-img rounded-circle overflow-hidden border" style="width: 150px; height: 150px">
        <img :src="state.myInfo.profilePicture" alt="portrait" class="h-100 w-100 object-fit-cover">
    </div>
    <div class="">
        <div class="fs-3">
            {{ state.myInfo.name }}
        </div>
        <div class="fs-5">
            {{ state.myInfo.email }}
        </div>
        <div class="fs-5">
            {{ state.myInfo.birthday }}
        </div>
        <div
            class="badge btn btn-secondary stretched-link"
            :data-bs-target="'#modal' + state.myInfo.userGUID"
            data-bs-toggle="modal"
        >See Details >></div>
        <profile-details-modal
            :user="state.myInfo"
        ></profile-details-modal>
    </div>
</div>
</template>

<style scoped>

</style>
