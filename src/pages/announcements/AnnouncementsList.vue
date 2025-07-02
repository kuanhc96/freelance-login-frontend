<template>
    <section>
        <base-card 
            card-title="Announcements"
            @refresh="refresh"
        >
            <div class="d-flex align-items-center flex-column">
                <div class="col-md-10 col-10">
                    <the-search-bar
                        :id="'search-announcements'"
                        :placeholder="'Search Announcements'"
                        v-model="keyword"
                    ></the-search-bar>

                    <div class="" id="instructor-view" v-if="getRole==='INSTRUCTOR'">
                        <!-- nav bar tab for active/draft/archived announcements -->
                        <nav 
                            class="nav nav-tabs mt-3" 
                            id="nav-tab" 
                            role="tablist" 
                            v-if="isKeywordBlank"
                        >
                            <router-link 
                                class="nav-link " 
                                :class="{active: activeTab === 'active'}"
                                @click.prevent="activeTab = 'active'"
                                id="nav-active-tab" 
                                data-bs-toggle="tab"
                                to="#nav-active"
                                role="tab"
                            >Active</router-link>
                            <router-link 
                                class="nav-link" 
                                :class="{active: activeTab === 'draft'}"
                                @click.prevent="activeTab = 'draft'"
                                id="nav-draft-tab" 
                                data-bs-toggle="tab"
                                to="#nav-draft"
                                role="tab"
                            >Draft</router-link>
                            <router-link 
                                class="nav-link" 
                                :class="{active: activeTab === 'archived'}"
                                @click.prevent="activeTab = 'archived'"
                                id="nav-archived-tab" 
                                data-bs-toggle="tab"
                                to="#nav-archived"
                                role="tab"
                            >Archived</router-link>
                        </nav>
                        <ul class="d-flex align-items-center list-group my-3 p-1" v-else>
                            <announcement-summary 
                                v-for="announcement in getFilteredAnnouncements"
                                :key="announcement.announcementGUID"
                                :announcement-id="announcement.announcementGUID"
                                :title="announcement.title" 
                                :date="announcement.createdDate"
                                :name="announcement.instructorName"
                                :announcement="announcement.announcement"
                                :status="announcement.announcementStatus"
                                @announcement-updated="refreshAnnouncements()"
                            ></announcement-summary>
                        </ul> 
                        
                        <div class="tab-content" id="nav-tabContent" v-if="isKeywordBlank">
                            <!-- List of active announcements -->
                            <div 
                                class="tab-pane fade" 
                                id="nav-active"
                                role="tabpanel"
                                v-show="activeTab === 'active'"
                            >
                                <ul class="d-flex align-items-center list-group my-3 p-1" id="activeAnnouncementList">
                                    <announcement-summary 
                                        v-for="announcement in getActiveAnnouncements"
                                        :key="announcement.announcementGUID"
                                        :announcement-id="announcement.announcementGUID"
                                        :title="announcement.title" 
                                        :date="announcement.createdDate"
                                        :name="announcement.instructorName"
                                        :announcement="announcement.announcement"
                                        :status="announcement.announcementStatus"
                                        @announcement-updated="refreshAnnouncements()"
                                    ></announcement-summary>
                                </ul> 
                            </div>

                            <!-- List of draft announcements -->
                            <div 
                                class="tab-pane fade  " 
                                id="nav-draft"
                                role="tabpanel"
                                v-show="activeTab === 'draft'"
                            >
                                <ul class="d-flex align-items-center list-group my-3 p-1">
                                    <announcement-summary 
                                        v-for="announcement in getDraftAnnouncements"
                                        :key="announcement.announcementGUID"
                                        :announcement-id="announcement.announcementGUID"
                                        :title="announcement.title" 
                                        :date="announcement.createdDate"
                                        :name="announcement.instructorName"
                                        :status="announcement.announcementStatus"
                                        :announcement="announcement.announcement"
                                        @announcement-updated="refreshAnnouncements()"
                                    ></announcement-summary>
                                </ul> 
                            </div>

                            <!-- List of archived announcements -->
                            <div 
                                class="tab-pane fade  " 
                                id="nav-archived"
                                role="tabpanel"
                                v-show="activeTab === 'archived'"
                            >
                                <ul class="d-flex align-items-center list-group my-3 p-1">
                                    <announcement-summary 
                                        v-for="announcement in getArchivedAnnouncements"
                                        :key="announcement.announcementGUID"
                                        :announcement-id="announcement.announcementGUID"
                                        :title="announcement.title" 
                                        :date="announcement.createdDate"
                                        :name="announcement.instructorName"
                                        :announcement="announcement.announcement"
                                        :status="announcement.announcementStatus"
                                        @announcement-updated="refreshAnnouncements()"
                                    ></announcement-summary>
                                </ul> 
                            </div>
                        </div>
                    </div>
                    <div class="" id="student-view" v-else>
                        <ul class="d-flex align-items-center list-group my-3 p-1">
                            <announcement-summary 
                                v-for="announcement in getFilteredActiveAnnouncements"
                                :key="announcement.announcementGUID"
                                :announcement-id="announcement.announcementGUID"
                                :title="announcement.title" 
                                :date="announcement.createdDate"
                                :name="announcement.instructorName"
                                :announcement="announcement.announcement"
                                :status="announcement.announcementStatus"
                                @announcement-updated="refreshAnnouncements()"
                            ></announcement-summary>
                        </ul> 

                    </div>


                </div>
            </div>
        </base-card>
    </section>
</template>

<script lang="ts">
import BaseCard from '../../components/ui/BaseCard.vue'
import TheSearchBar from '@/components/layout/TheSearchBar.vue';
import AnnouncementSummary from '@/components/announcements/AnnouncementSummary.vue';
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex';
import { GetAnnouncementResponse } from '@/dto/response/getAnnouncementResponse';
import store from '@/store'
import { GetUserResponse } from '@/dto/response/getUserResponse';
export default defineComponent({
    name: 'AnnouncementsList',
    data(): {
        keyword: string,
        activeTab: string
    } {
        return {
            keyword: '',
            activeTab: 'active'
        }
    },
    components: {
        BaseCard,
        TheSearchBar,
        AnnouncementSummary
    },
    computed: {
        ...mapGetters('login', ['getUserGUID', 'getRole']),
        ...mapGetters('announcements', ['getAnnouncements']),
        ...mapGetters('instructors', ['getSubscribedInstructors']),
        isKeywordBlank(): boolean {
            return this.keyword === '';
        },
        getSubscribedInstructorsEndpoint(): string {
            return 'http://localhost:8081/subscription/' + this.getUserGUID;
        },
        getActiveAnnouncements(): GetAnnouncementResponse[] {
            return this.getAnnouncements.filter(
                (announcement: { announcementStatus: string; }) =>
                    announcement.announcementStatus === 'ACTIVE'
            );
        },
        getDraftAnnouncements(): GetAnnouncementResponse[] {
            return this.getAnnouncements.filter(
                (announcement: { announcementStatus: string; }) => 
                    announcement.announcementStatus === 'DRAFT'
            );
        },
        getArchivedAnnouncements(): GetAnnouncementResponse[] {
            return this.getAnnouncements.filter(
                (announcement: { announcementStatus: string; }) => 
                    announcement.announcementStatus === 'ARCHIVED'
            );
        },
        getFilteredAnnouncements(): GetAnnouncementResponse[] {
            return this.getAnnouncements.filter(
                (announcement: { title: string; }) => 
                    announcement.title.toLowerCase().includes(this.keyword.toLowerCase())
            );
        },
        getFilteredActiveAnnouncements(): GetAnnouncementResponse[] {
            const activeAnnouncements: GetAnnouncementResponse[] = this.getAnnouncements.filter((announcement: { announcementStatus: string; }) => announcement.announcementStatus === 'ACTIVE');
            return activeAnnouncements.filter(
                (announcement: { title: string; }) => 
                    announcement.title.toLowerCase().includes(this.keyword.toLowerCase())
            );
        },
    },
    async created(): Promise<void> {
        const response: Response = await fetch(this.getSubscribedInstructorsEndpoint, {
            method: 'GET',
            credentials: 'include'
        })

        if (response.ok) {
            const data: GetUserResponse[] = await response.json();
            store.dispatch('instructors/setSubscribedInstructors', data)
        }


        for (const instructor of this.getSubscribedInstructors) {
            const response = await fetch(this.getAnnouncementsUrl(instructor.userGUID), {
                method: 'GET',
                credentials: 'include'
            });
            if (response.ok) {
                const data: GetAnnouncementResponse[] = await response.json();
                store.dispatch('announcements/setAnnouncements', data);
            }
        }
    },
    methods: {
        async refresh() {
            const response: Response = await fetch(this.getSubscribedInstructorsEndpoint, {
                method: 'GET',
                credentials: 'include'
            })

            if (response.ok) {
                const data: GetUserResponse[] = await response.json();
                store.dispatch('instructors/setSubscribedInstructors', { instructors: data })
            }


            for (const instructor of this.getSubscribedInstructors) {
                const response = await fetch(this.getAnnouncementsUrl(instructor.userGUID), {
                    method: 'GET',
                    credentials: 'include'
                });
                if (response.ok) {
                    const data = await response.json();
                    store.dispatch('announcements/setAnnouncements', data);
                }

            }

        },
        getAnnouncementsUrl(instructorGUID: string): string {
            return "http://localhost:8081/announcement/" + instructorGUID;
        },
        refreshAnnouncements() {

        }
    }
    
})
</script>