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
<script>
import BaseCard from '@/components/ui/BaseCard.vue';
export default {
    components: {
        BaseCard,
    },
    data() {
        return {
            subject: '',
            announcement: ''
        }
    },
    methods: {
        async submit() {
            if (this.subject !== '' && this.announcement !== '') {
                console.log('valid input')
                const response = await fetch(
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
                    const data = await response.json();
                    console.log(data);
                }
            } else {
                console.log('invalid input')

            }
        }
    }

}
</script>