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

                    <div class="" id="instructor-view" v-if="role==='INSTRUCTOR'">
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
                                id="nav-active"
                                role="tabpanel"
                                v-show="activeTab === 'active'"
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
                                v-for="announcement in filteredActiveAnnouncements"
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
        </base-card>
    </section>
</template>

<script setup lang="ts">
import BaseCard from '../../components/ui/BaseCard.vue'
import TheSearchBar from '@/components/layout/TheSearchBar.vue';
import AnnouncementSummary from '@/components/announcements/AnnouncementSummary.vue';
import { ref, Ref, computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { RootState } from '@/store/types';
import { GetAnnouncementResponse } from '@/dto/response/getAnnouncementResponse';

const store = useStore<RootState>();

const keyword: Ref<string> = ref('');
const activeTab: Ref<string> = ref('active');

const isKeywordBlank = computed<boolean> (() =>
    keyword.value === ''
)

const subscribedInstructorsEndpoint = computed<string> (() =>
    store.getters['login/backendService'] + 'subscription/' + store.getters['login/getUserGUID']
)

const announcements = computed<Array<GetAnnouncementResponse>> (() => 
    store.getters['announcements/getAnnouncements']
)

const activeAnnouncements = computed<Array<GetAnnouncementResponse>> (() =>
    announcements.value.filter(announcement => announcement.announcementStatus === 'ACTIVE')
)

const draftAnnouncements = computed<Array<GetAnnouncementResponse>> (() =>
    announcements.value.filter(announcement => announcement.announcementStatus === 'DRAFT')
)

const archivedAnnouncements = computed<Array<GetAnnouncementResponse>> (() =>
    announcements.value.filter(announcement => announcement.announcementStatus === 'ARCHIVED')
)

const filteredAnnouncements = computed<Array<GetAnnouncementResponse>> (() =>
    announcements.value.filter(announcement => announcement.title.toLowerCase().includes(keyword.value.toLowerCase()))
)

const filteredActiveAnnouncements = computed<Array<GetAnnouncementResponse>> (() =>
    activeAnnouncements.value.filter(announcement => announcement.title.toLowerCase().includes(keyword.value.toLowerCase()))
)

const role = computed<string> (() =>
    store.getters['login/getRole']
)

function getAnnouncementsUrl(instructorGUID: string): string {
    return store.getters['login/backendService'] + "announcement/" + instructorGUID;
}

async function refresh(): Promise<void> {
    const response: Response = await fetch(subscribedInstructorsEndpoint.value, {
        method: 'GET',
        credentials: 'include'
    })

    if (response.ok) {
        const data: Array<GetAnnouncementResponse> = await response.json();
        store.dispatch('instructors/setSubscribedInstructors', { instructors: data })
    }


    const subscribedInstructors = store.getters['instructors/getSubscribedInstructors'];
    for (const instructor of subscribedInstructors) {
        const instructorGUID = instructor.userGUID;

        const response: Response = await fetch(getAnnouncementsUrl(instructorGUID), {
            method: 'GET',
            credentials: 'include'
        });
        if (response.ok) {
            const data: Array<GetAnnouncementResponse> = await response.json();
            console.log(data);
            store.dispatch('announcements/setAnnouncements', { announcements: data });
        }
    }
}

onBeforeMount(
    async () => refresh()
)
</script>