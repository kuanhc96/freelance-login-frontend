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
                        <span><span v-if="isNew && getRole==='STUDENT'" class="badge bg-secondary">New!</span> {{ title }} </span>
                        <span v-if="getRole==='STUDENT'">by {{ name }} </span>
                        <span v-else>Published On {{ getHumanReadableDate }} </span>
                    </div>
                </button>
            </h2>
            <div class="accordion-collapse collapse " :id="announcementId" data-bs-parent="#myAccordion">
                <div class="accordion-body ">
                    <div class="">
                        <span class="fs-4">
                            {{ title }}
                        </span>
                    </div>
                    <div class="">
                        <span class="fw-bold">
                            Published on {{ getHumanReadableDate }}
                            by {{ name }}
                        </span>
                    </div>
                    <div class="text-truncate mb-2">
                        {{ announcement }}
                    </div>
                    <div class="d-flex justify-content-end">
                        <!-- modal for editing announcement -->
                        <button 
                            v-if="getRole==='INSTRUCTOR'" 
                            class="badge btn btn-primary me-2" 
                            data-bs-toggle="modal" 
                            :data-bs-target="'#modalEdit' + announcementId"
                        >
                            Edit Announcement >>
                        </button>
                        <!-- modal button -->
                        <button 
                            class="badge btn btn-secondary" 
                            data-bs-toggle="modal" 
                            :data-bs-target="'#modal' + announcementId"
                        >
                            See Details >>
                        </button>
                        <!-- modal -->
                        <div class="modal fade" :id="'modal' + announcementId">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5">
                                            {{ title }}
                                        </h1>
                                        <button class="btn btn-close" data-bs-dismiss="modal"></button>
                                    </div>
                                    <div class="modal-body">
                                        {{ announcement }}
                                    </div>
                                    <div class="modal-footer d-flex justify-content-between">
                                        <span class="fw-bold">
                                            Published on {{ getHumanReadableDate }}
                                            by {{ name }}
                                        </span>
                                        <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- modal edit announcement -->
                        <div class="modal fade" :id="'modalEdit' + announcementId">
                           <div class="modal-dialog">
                               <div class="modal-content">
                                    <form @submit.prevent="submitEditedAnnouncement()" action="">
                                        <div class="modal-header">
                                            <div class="w-100 d-flex justify-content-between align-items-center">
                                                <label for="editedTitle" class="form-label m-0">Title</label>
                                                <input type="text" class="form-control mx-3" id="editedTitle" v-model="editedTitle"/>
                                                <button type="button" class="btn btn-close" data-bs-dismiss="modal"></button>
                                            </div>
                                        </div>
                                        <div class="modal-body">
                                            <div class="w-100 d-flex justify-content-between align-items-center mb-2">
                                                <label for="editedAnnouncement" class="form-label m-0">Edit Announcement</label>
                                                <div class="d-flex align-items-center">
                                                    <label for="announcementsStatusDropdown" class="form-label w-100 mx-2 mb-0">Save As... </label>
                                                    <select 
                                                        name="" 
                                                        id="announcementStatusDropdown" 
                                                        v-model="editedStatus" 
                                                        class="form-select w-100 text-bg-light"
                                                    >
                                                        <option value="ACTIVE">Active</option>
                                                        <option value="DRAFT">Draft</option>
                                                        <option value="ARCHIVED">Archive</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <textarea name="" id="editedAnnouncement" class="form-control" rows="6" v-model="editedAnnouncement"></textarea>
                                        </div>
                                        <div class="modal-footer d-flex justify-content-between">
                                            <button class="btn btn-primary" data-bs-dismiss="modal" @click="submitEditedAnnouncement">Save</button>
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        </div>
                                    </form>
                               </div>
                           </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Cookies from 'js-cookie';
import { defineComponent, PropType } from 'vue';
import { mapGetters } from 'vuex';
export default defineComponent({
    emits: [
        'announcementUpdated'
    ],
    data(): {
        editedTitle: string,
        editedAnnouncement: string,
        editedStatus: string
    } {
        return {
            editedTitle: this.title,
            editedAnnouncement: this.announcement,
            editedStatus: this.status
        }
    },
    props: {
        title: {
            type: String as PropType<string>,
            required: true
        },
        announcement: {
            type: String as PropType<string>,
            required: true,
            default: ''
        },
        name: {
            type: String as PropType<string>,
            required: true
        },
        date: {
            type: String as PropType<string>,
            required: true,
        },
        announcementId: {
            type: String as PropType<string>,
            required: true
        },
        status: {
            type: String as PropType<string>,
            required: true
        }
    },
    computed: {
        ...mapGetters('login', ['getRole']),
        isNew(): boolean {
            const inputDate = new Date(this.date);
            const now = new Date();
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(now.getDate() - 7);

            return inputDate >= oneWeekAgo && inputDate <= now;
        },
        getHumanReadableDate(): string {
            const date = new Date(this.date);
            const options: Intl.DateTimeFormatOptions = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };

            return date.toLocaleDateString('en-US', options);
        },
    },
    methods: {
        async submitEditedAnnouncement(): Promise<void> {
            console.log('Edited Title: ' + this.editedTitle);
            const csrfToken = Cookies.get('XSRF-TOKEN');
            const response: Response = await fetch('http://localhost:8081/announcement/update', {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': csrfToken
                },
                body: JSON.stringify({
                    'announcementGUID': this.announcementId,
                    'title': this.editedTitle,
                    'announcement': this.editedAnnouncement,
                    'announcementStatus': this.editedStatus
                })
            });

            if (response.ok) {
                this.$emit('announcementUpdated');
            }
        }
    }
})
</script>