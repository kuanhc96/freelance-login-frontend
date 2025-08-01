<script lang="ts">

import {defineComponent, computed, ref, Ref, PropType} from "vue";
import AnnouncementSummary from "@/components/announcements/AnnouncementSummary.vue";
import {GetAnnouncementResponse} from "@/dto/response/getAnnouncementResponse";
import {GetUserResponse} from "@/dto/response/getUserResponse";
import {useLoginStore} from "@/store/login";
import {useInstructorsOrStudentsStore} from "@/store/instructorsOrStudents";
import {useAnnouncementsStore} from "@/store/announcements";

export default defineComponent({
    props: {
        keyword: {
            type: String as PropType<string>,
            default: ''
        },
        refresh: {
            type: Function as PropType<() => void>,
            required: true
        }
    },
    components: {
        AnnouncementSummary
    },
    setup(props) {
        const loginStore = useLoginStore();
        const instructorsStore = useInstructorsOrStudentsStore();
        const announcementsStore = useAnnouncementsStore();
        const activeTab: Ref<string> = ref('active');
        const userGUID: Ref<string> = computed(function() {
            return loginStore.getUserGUID;
        });
        const isStudent: Ref<boolean> = computed(function() {
            return loginStore.isStudent;
        });
        const announcements: Ref<GetAnnouncementResponse[]> = computed(function() {
            return announcementsStore.getAnnouncements;
        });
        const subscribedInstructors: Ref<GetUserResponse[]> = computed(function() {
            return instructorsStore.getSubscribedInstructors;
        });
        const isKeywordBlank: Ref<boolean> = computed(function() {
            return props.keyword === '';
        });
        const activeAnnouncements: Ref<GetAnnouncementResponse[]> = computed(function() {
            return announcements.value.filter(
                (announcement: GetAnnouncementResponse) =>
                    announcement.announcementStatus === 'ACTIVE'
            );
        });
        const draftAnnouncements: Ref<GetAnnouncementResponse[]> = computed(function() {
            return announcements.value.filter(
                (announcement: GetAnnouncementResponse) =>
                    announcement.announcementStatus === 'DRAFT'
            );
        });
        const archivedAnnouncements: Ref<GetAnnouncementResponse[]> = computed(function() {
            return announcements.value.filter(
                (announcement: GetAnnouncementResponse) =>
                    announcement.announcementStatus === 'ARCHIVED'
            );
        });
        const filteredAnnouncements: Ref<GetAnnouncementResponse[]> = computed(function() {
            return announcements.value.filter(
                (announcement: { title: string; }) =>
                    announcement.title.toLowerCase().includes(props.keyword.toLowerCase())
            );
        });

        return {
            activeTab,
            userGUID,
            isStudent,
            announcements,
            subscribedInstructors,
            isKeywordBlank,
            activeAnnouncements,
            draftAnnouncements,
            archivedAnnouncements,
            filteredAnnouncements
        }

    }
})
</script>

<template>
    <div class="" id="instructor-view" v-if="!isStudent">
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
                v-for="announcement in filteredAnnouncements"
                :key="announcement.announcementGUID"
                :announcement-id="announcement.announcementGUID"
                :title="announcement.title"
                :date="announcement.createdDate"
                :name="announcement.instructorName"
                :announcement="announcement.announcement"
                :status="announcement.announcementStatus"
                @announcement-updated="refresh()"
            ></announcement-summary>
        </ul>

        <div class="tab-content" id="nav-tabContent" v-if="isKeywordBlank">
            <!-- List of active announcements -->
            <div
                class="tab-pane fade"
                :class="{show: activeTab === 'active', active: activeTab === 'active'}"
                id="nav-active"
                role="tabpanel"
            >
                <ul class="d-flex align-items-center list-group my-3 p-1" id="activeAnnouncementList">
                    <announcement-summary
                        v-for="announcement in activeAnnouncements"
                        :key="announcement.announcementGUID"
                        :announcement-id="announcement.announcementGUID"
                        :title="announcement.title"
                        :date="announcement.createdDate"
                        :name="announcement.instructorName"
                        :announcement="announcement.announcement"
                        :status="announcement.announcementStatus"
                        @announcement-updated="refresh()"
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
                        v-for="announcement in draftAnnouncements"
                        :key="announcement.announcementGUID"
                        :announcement-id="announcement.announcementGUID"
                        :title="announcement.title"
                        :date="announcement.createdDate"
                        :name="announcement.instructorName"
                        :status="announcement.announcementStatus"
                        :announcement="announcement.announcement"
                        @announcement-updated="refresh()"
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
                        v-for="announcement in archivedAnnouncements"
                        :key="announcement.announcementGUID"
                        :announcement-id="announcement.announcementGUID"
                        :title="announcement.title"
                        :date="announcement.createdDate"
                        :name="announcement.instructorName"
                        :announcement="announcement.announcement"
                        :status="announcement.announcementStatus"
                        @announcement-updated="refresh()"
                    ></announcement-summary>
                </ul>
            </div>
        </div>
    </div>
    <div class="" id="student-view" v-else>
        <ul class="d-flex align-items-center list-group my-3 p-1">
            <announcement-summary
                v-for="announcement in filteredAnnouncements"
                :key="announcement.announcementGUID"
                :announcement-id="announcement.announcementGUID"
                :title="announcement.title"
                :date="announcement.createdDate"
                :name="announcement.instructorName"
                :announcement="announcement.announcement"
                :status="announcement.announcementStatus"
                @announcement-updated="refresh()"
            ></announcement-summary>
        </ul>
    </div>

</template>

