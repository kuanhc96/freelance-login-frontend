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
                        <router-link :to="contactLink" class="btn btn-primary  flex-fill text-center">Subscribe</router-link>
                        <router-link :to="detailsLink" class="btn btn-secondary flex-fill text-center">View Details</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
            return this.$store.getters['subjects/subjects'];
        },
        hasSubjects() {
            return this.$store.getters['subjects/hasSubjects']
        },
        resolvedPortrait() {
            return new URL(this.portraitPath, import.meta.url).href;
        }
    },
    methods: {
        resolveImage(path) {
            return new URL(path, import.meta.url).href;
        }

    }
    
}
</script>