<template>

    <div class="accordion w-100 h-100" id="myAccordion">
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button 
                    class="accordion-button" 
                    data-bs-toggle="collapse" 
                    :data-bs-target="'#' + announcementId"
                >
                    <div class="w-100 me-2 d-flex justify-content-between align-items-center">
                        <span><span v-if="isNew" class="badge bg-secondary">New!</span> {{ title }} </span>
                        <span>by {{ name }} </span>
                    </div>
                </button>
            </h2>
            <div class="accordion-collapse collapse show" :id="announcementId" data-bs-parent="#myAccordion">
                <div class="accordion-body d-flex justify-content-between align-items-center">
                    <div class="">
                        {{ announcement }}
                    </div>
                    <div class="">
                        <button class="btn btn-primary btn-sm">See Details</button>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        announcement: {
            type: String,
            required: true,
            default: ''
        },
        name: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true,
        },
        announcementId: {
            type: String,
            required: true
        }
    },
    async created() {
    },
    computed: {
        isNew() {
            const inputDate = new Date(this.date);
            const now = new Date();
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(now.getDate() - 7);

            return inputDate >= oneWeekAgo && inputDate <= now;
        },
    }
}
</script>