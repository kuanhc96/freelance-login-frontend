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
                                :class="[ tab-pane, fade ]" 
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

<script>
import BaseCard from '../../components/ui/BaseCard.vue'
import TheSearchBar from '@/components/layout/TheSearchBar.vue';
import AnnouncementSummary from '@/components/announcements/AnnouncementSummary.vue';
export default {
    data() {
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
        isKeywordBlank() {
            return this.keyword === '';
        },
        getSubscribedInstructorsEndpoint() {
            return 'http://localhost:8081/subscription/' + this.$store.getters['login/getUserId'];
        },
        getAnnouncements() {
            return this.$store.getters['announcements/getAnnouncements'];
        },
        getActiveAnnouncements() {
            const allAnnouncements = this.getAnnouncements;
            return allAnnouncements.filter(announcement => announcement.announcementStatus === 'ACTIVE');
        },
        getDraftAnnouncements() {
            const allAnnouncements = this.getAnnouncements;
            return allAnnouncements.filter(announcement => announcement.announcementStatus === 'DRAFT');
        },
        getArchivedAnnouncements() {
            const allAnnouncements = this.getAnnouncements;
            return allAnnouncements.filter(announcement => announcement.announcementStatus === 'Archived');
        },
        getFilteredAnnouncements() {
            const announcements = this.$store.getters['announcements/getAnnouncements'];

            return announcements.filter(announcement => announcement.title.toLowerCase().includes(this.keyword.toLowerCase()))
        },
        getFilteredActiveAnnouncements() {
            const allAnnouncements = this.$store.getters['announcements/getAnnouncements'];
            const activeAnnouncements = allAnnouncements.filter(announcement => announcement.announcementStatus === 'ACTIVE');

            return activeAnnouncements.filter(announcement => announcement.title.toLowerCase().includes(this.keyword.toLowerCase()))
        },
        getRole() {
            return this.$store.getters['login/getRole'];
        }
    },
    async created() {
        if (!this.$store.getters['instructors/hasInstructors']) {
            const response = await fetch(this.getSubscribedInstructorsEndpoint, {
                method: 'GET',
                credentials: 'include'
            })

            if (response.ok) {
                const data = await response.json();
                this.$store.dispatch('instructors/setInstructors', { instructors: data })
            }

        } 

        const subscribedInstructors = this.$store.getters['instructors/instructors'];
        for (const instructor of subscribedInstructors) {
            const instructorGUID = instructor.userGUID;

            const response = await fetch(this.getAnnouncementsUrl(instructorGUID), {
                method: 'GET',
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                this.$store.dispatch('announcements/setAnnouncements', { announcements: data });
            }

        }

    },
    methods: {
        async refresh() {
            if (!this.$store.getters['instructors/hasInstructors']) {
                const response = await fetch(this.getSubscribedInstructorsEndpoint, {
                    method: 'GET',
                    credentials: 'include'
                })

                if (response.ok) {
                    const data = await response.json();
                    this.$store.dispatch('instructors/setInstructors', { instructors: data })
                }

            } 

            const subscribedInstructors = this.$store.getters['instructors/instructors'];
            for (const instructor of subscribedInstructors) {
                const instructorGUID = instructor.userGUID;

                const response = await fetch(this.getAnnouncementsUrl(instructorGUID), {
                    method: 'GET',
                    credentials: 'include'
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    this.$store.dispatch('announcements/setAnnouncements', { announcements: data });
                }

            }

        },
        getAnnouncementsUrl(instructorGUID) {
            return "http://localhost:8081/announcement/" + instructorGUID;
        },
        refreshAnnouncements() {

        }
    }
    
}
</script>