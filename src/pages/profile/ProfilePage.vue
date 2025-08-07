<script lang="ts">
import {computed, defineComponent, Ref} from 'vue'
import {GetUserResponse} from "@/dto/response/getUserResponse";
import {useInstructorsOrStudentsStore} from "@/store/instructorsOrStudents";
import ProfileDetails from "@/components/profile/ProfileDetails.vue";

export default defineComponent({
    name: 'ProfilePage',
    components: {
        ProfileDetails
    },
    setup() {
        const usersStore = useInstructorsOrStudentsStore();

        const myInfo: Ref<GetUserResponse | null> = computed(function() {
            return usersStore.getMyInfo;
        })

        return {
            myInfo
        }
    }
})

</script>

<template>
    <section>
        <base-card
            card-title="Profile"
        >
            <div class="card shadow m-4">
                <div class="card-body">
                    <profile-details :userInfo="myInfo"></profile-details>
                </div>
            </div>
        </base-card>
    </section>
</template>

<style scoped>

</style>
