import { GetAnnouncementResponse } from '@/dto/response/getAnnouncementResponse';
import { defineStore } from 'pinia';

export interface AnnouncementsState {
    announcements: GetAnnouncementResponse[]
}

export const useAnnouncementsStore = defineStore('announcements', {
    state: (): AnnouncementsState => ({
        announcements: []
    }),
    getters: {
        getAnnouncements: state => state.announcements
    },
    actions: {
        setAnnouncements(announcements: GetAnnouncementResponse[]) {
            this.announcements = announcements;
        }
    },
    persist: true,

})
