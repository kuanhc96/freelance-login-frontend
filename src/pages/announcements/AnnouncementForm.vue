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
import {CreateAnnouncementResponse} from '@/dto/response/createAnnouncementResponse';
import {defineComponent, Ref, ref} from 'vue'
import Cookies from "js-cookie";

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
            const csrfToken = Cookies.get('XSRF-TOKEN');
            if (subject.value !== '' && announcement.value !== '') {
                const response: Response = await fetch(
                    'http://localhost:8081/announcement/createAnnouncement', {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-XSRF-TOKEN': csrfToken
                        },
                        body: JSON.stringify({
                            instructorGUID: 'aa02e645-55ea-4aa3-953e-3ea543c8290f',
                            title: subject.value,
                            announcement: announcement.value
                        })
                    }
                );
                if (response.ok) {
                    const data: CreateAnnouncementResponse = await response.json();
                    console.log(data);
                }
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
