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
                    <ul class="d-flex align-items-center list-group my-3 p-1" v-if="isKeywordBlank">
                    <!-- List of announcements -->
                        <announcement-summary 
                            v-for="announcement in getAnnouncements"
                            :key="announcement.announcementGUID"
                            :announcement-id="announcement.announcementGUID"
                            :title="announcement.title" 
                            :date="announcement.createdDate"
                            :name="announcement.instructorName"
                            :announcement="announcement.announcement"
                        ></announcement-summary>
                    </ul> 
                    <ul class="d-flex align-items-center list-group my-3 p-1" v-else>
                        <announcement-summary 
                            v-for="announcement in getFilteredAnnouncements"
                            :key="announcement.announcementGUID"
                            :announcement-id="announcement.announcementGUID"
                            :title="announcement.title" 
                            :date="announcement.createdDate"
                            :name="announcement.instructorName"
                            :announcement="announcement.announcement"
                        ></announcement-summary>
                    </ul> 
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
            keyword: ''
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
        getFilteredAnnouncements() {
            const announcements = this.$store.getters['announcements/getAnnouncements'];

            return announcements.filter(announcement => announcement.title.toLowerCase().includes(this.keyword.toLowerCase()))
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
    }
    
}
</script>