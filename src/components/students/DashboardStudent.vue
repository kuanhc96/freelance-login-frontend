<script lang="ts">
import { defineComponent, PropType } from 'vue'
import {GetUserResponse} from "@/dto/response/getUserResponse";
import ProfileDetailsModal from "@/components/profile/ProfileDetailsModal.vue";
export default defineComponent({
    props: {
        student: {
            type: Object as PropType<GetUserResponse>,
            required: true
        }
    },
    components: {
        ProfileDetailsModal
    }
})

</script>

<template>
    <div class="card bg-light m-3">
        <div class="card-body">
            <div class="d-flex align-items-center justify-content-around">
                <div class="portrait-img rounded-circle overflow-hidden border" style="width:100px; height:100px">
                    <img :src="student.profilePicture" alt="portrait" class="h-100 w-100 object-fit-cover">
                </div>
                <div class="">
                    <div class="fs-3">
                        {{ student.name }}
                    </div>
                    <div
                        class="badge btn btn-secondary stretched-link"
                        :data-bs-target="'#modal' + student.userGUID"
                        data-bs-toggle="modal"
                    >See Details >></div>
                    <profile-details-modal :user="student"></profile-details-modal>
                </div>
            </div>
        </div>
    </div>
</template>
