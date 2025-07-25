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
                    <announcements-list
                        :key="keyword"
                        :refresh="refresh"
                    ></announcements-list>
                </div>
            </div>
        </base-card>
    </section>
</template>

<script lang="ts">
import BaseCard from '../../components/ui/BaseCard.vue'
import TheSearchBar from '@/components/layout/TheSearchBar.vue';
import { defineComponent, Ref, ref } from 'vue'
import { useAnnouncementsStore } from "@/store/announcements";
import AnnouncementsList from '@/components/announcements/AnnouncementsList.vue';
export default defineComponent({
    name: 'AnnouncementsPage',
    components: {
        BaseCard,
        TheSearchBar,
        AnnouncementsList
    },
    setup() {
        const announcementsStore = useAnnouncementsStore();
        const keyword: Ref<string> = ref('');
        async function refresh() {
            await announcementsStore.setAnnouncements();
        }

        return {
            keyword,
            refresh
        }
    },
})
</script>
