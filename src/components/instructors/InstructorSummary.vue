<template>
    <div class="card w-100 h-100">
        <div class="card-body">
            <div class="d-flex justify-content-center align-items-stretch w-100 hstack gap-4">
                <div class="d-flex flex-column align-items-center justify-content-center">
                    <div class="portrait-img rounded-circle overflow-hidden border " style="width:250px; height:250px;">
                        <img class="h-100 w-100 object-fit-cover" :src="portraitPath" alt="portrait"> 
                    </div>
                </div>
                <div class="d-flex flex-column align-items-center justify-content-center">
                    <div class="display-5">{{ instructorName }}</div>
                    <div class="my-3 d-flex flex-wrap flex-md-nowrap w-100 gap-2 justify-content-center">
                        <span class="badge text-bg-light fs-6" 
                            v-for="subject in filteredSubjects" 
                            :key="subject.subjectName"
                        >{{subject.subjectName}}</span>
                    </div>
                    <div class="actions d-flex flex-wrap flex-md-nowrap w-100 gap-2 justify-content-center">
                        <router-link :to="detailsLink" class="btn btn-primary  flex-fill text-center">View Details</router-link>
                        <button @click="subscribeOrUnsubscribe" class="btn btn-secondary flex-fill text-center">
                            {{ getSubscribeOrUnsubscribeText }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';

export default {
    props: {
        instructorGUID: {
            type: String,
            required: true
        },
        instructorName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        portraitPath: {
            type: String,
            required: true
        },
        displaySubscribe: {
            type: Boolean,
            default: true
        }

    },
    components: {
    },
    computed: {
        contactLink() {
            return this.$route.path + '/' + this.instructorGUID + '/contact';
        },
        detailsLink() {
            return this.$route.path + '/' + this.instructorGUID;
        },
        filteredSubjects() {
            return this.$store.getters['subjects/getSubjectsByInstructorGUID'](this.instructorGUID);
        },
        hasSubjects() {
            return this.$store.getters['subjects/hasSubjectsByInstructorGUID'](this.instructorGUID);
        },
        resolvedPortrait() {
            return new URL(this.portraitPath, import.meta.url).href;
        },
        getSubscribeOrUnsubscribeText() {
            if (this.displaySubscribe) {
                return 'Subscribe'
            } else {
                return 'Unsubscribe'
            }
        }
    },
    methods: {
        resolveImage(path) {
            return new URL(path, import.meta.url).href;
        },
        async subscribeOrUnsubscribe() {
            try {
                const csrfToken = Cookies.get('XSRF-TOKEN');
                const response = await fetch(
                    'http://localhost:8081/subscription', {
                        method: this.displaySubscribe? 'POST' : 'DELETE',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-XSRF-TOKEN': csrfToken
                        },
                        body: JSON.stringify({
                            'studentGUID': this.$store.getters['login/getUserGUID'],
                            'instructorGUID': this.instructorGUID
                        })
                    }
                );
                
                if (!this.displaySubscribe) {
                    this.$store.dispatch('instructors/unsubscribeFromInstructor', { instructorGUID: this.instructorGUID });
                } else {
                    this.$store.dispatch('instructors/subscribeToInstructor', { instructorGUID: this.instructorGUID });
                }
                
                console.log('success?')
                if (response.ok) {
                    const result = await response.json()
                    console.log(result)
                    // TODO: should have a pop-up that says success
                } else {
                    const result = await response.json()
                    console.log(result)
                    // TODO: should have a pop-up that says failed

                }
            } catch(err) {
                    console.log('FAILED')
                    // TODO: should have a pop-up that says failed
            }
        }

    }
    
}
</script>