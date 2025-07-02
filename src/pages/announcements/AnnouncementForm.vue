<template>
    <section>
        <base-card :cardTitle="'Make Announcement'">
            <div class="row">
              <div class="col-12">
                <form  action="">
                  <div class="m-3">
                    <input v-model="subject" type="text" name="subject" placeholder="Subject" class="form-control form-control-lg">
                  </div>
                  <div class="m-3">
                    <textarea v-model="announcement" class="form-control form-control-lg" name="announcement" rows="6" placeholder="Announcement"></textarea>
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
import { CreateAnnouncementResponse } from '@/dto/response/createAnnouncementResponse';
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'AnnouncementForm',
    components: {
        BaseCard,
    },
    data(): {
        subject: string,
        announcement: string
    } {
        return {
            subject: '',
            announcement: ''
        }
    },
    methods: {
        async submit(): Promise<void> {
            if (this.subject !== '' && this.announcement !== '') {
                const response: Response = await fetch(
                    'http://localhost:8081/announcement/createAnnouncement', {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        }, 
                        body: JSON.stringify({
                            instructorGUID: 'aa02e645-55ea-4aa3-953e-3ea543c8290f',
                            title: this.subject,
                            announcement: this.announcement
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
    }

})
</script>