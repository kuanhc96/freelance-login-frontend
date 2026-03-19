<template>
    <section>
        <base-card
            :cardTitle="'Make Announcement'"
            @refresh="refresh"
        >
            <div class="row">
                <div class="col-12">
                    <form action="">
                        <div class="m-3">
                            <input v-model="subject" type="text" name="subject" placeholder="Subject"
                                   class="form-control form-control-lg">
                        </div>
                        <div class="m-3">
                            <textarea v-model="announcement" class="form-control form-control-lg" name="announcement"
                                      rows="6" placeholder="Announcement"></textarea>
                        </div>
                        <div class="d-grid">
                            <button class="btn btn-secondary mt-3" type="submit" @click="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </base-card>
    </section>

</template>
<script lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue';
import {defineComponent, Ref, ref} from 'vue'
import AnnouncementService from "@/services/AnnouncementService";

export default defineComponent({
    name: 'AnnouncementForm',
    components: {
        BaseCard,
    },
    setup() {
        const subject: Ref<string> = ref('');
        const announcement: Ref<string> = ref('');
        function refresh(): void {
            subject.value = ''
            announcement.value = ''
        }
        async function submit(): Promise<void> {
            if (subject.value !== '' && announcement.value !== '') {
                AnnouncementService.createAnnouncement('aa02e645-55ea-4aa3-953e-3ea543c8290f', subject.value, announcement.value)
                    .then((res) => {
                        console.log(res.data);
                    });
            } else {
                console.log('invalid input')
            }
        }

        return {
            subject,
            announcement,
            submit,
            refresh
        }
    }
})
</script>
