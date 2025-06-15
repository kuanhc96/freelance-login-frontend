<template>
    <div class="m-2 d-flex justify-content-center">
        <div class="col-md-10 col-10">
            <div class="card bg-light w-100">
                <div class="card-body">
                    <div class="w-100 me-2 d-flex justify-content-between align-items-center">
                        <span><span v-if="isNew" class="badge bg-secondary">New!</span> {{ title }} </span>
                        <span>by {{ name }} </span>
                    </div>
                    <div class="card-text">
                        <div class="text-truncate">{{ announcement }}</div>
                    </div>
                    <div class="d-flex justify-content-end">
                        <!-- modal button -->
                        <button 
                            class="badge btn btn-secondary stretched-link text-white"
                            data-bs-toggle="modal"
                            :data-bs-target="'#modal' + announcementId"
                        >See Details >></button>
                        <!-- modal -->
                         <div class="modal fade" :id="'modal' + announcementId">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5">{{ title }}</h1>
                                        <button class="btn btn-close" data-bs-dismiss="modal"></button>
                                    </div>
                                    <div class="modal-body">
                                        {{ announcement }}
                                    </div>
                                    <div class="modal-footer d-flex justify-content-between">
                                        <span class="fw-bold">
                                            Published On {{ getHumanReadableDate }}
                                            by {{ name }}
                                        </span>
                                        <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                         </div>
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
            required: true
        },
        announcementId: {
            type: String,
            required: true
        }
    },
    computed: {
        isNew() {
            const inputDate = new Date(this.date);
            const now = new Date();
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(now.getDate() - 7);

            return inputDate >= oneWeekAgo && inputDate <= now;
        },
        getHumanReadableDate() {
            const date = new Date(this.date);
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };

            return date.toLocaleDateString('en-US', options);
        }
    }
}
</script>