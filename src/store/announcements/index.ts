import {GetAnnouncementResponse} from '@/dto/response/getAnnouncementResponse';
import {defineStore} from 'pinia';
import {useInstructorsOrStudentsStore} from "@/store/instructorsOrStudents";
import {useLoginStore} from "@/store/login";
import AnnouncementService from "@/services/AnnouncementService"

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
        async setAnnouncementsForStudent() {
            const instructorsStore = useInstructorsOrStudentsStore();

            for (const instructor of instructorsStore.getSubscribedInstructors) {
                const data: GetAnnouncementResponse[] = await AnnouncementService.getAnnouncementsByGUID(instructor.userGUID);
                this.announcements = this.announcements.concat(data);
            }
        },
        async setAnnouncementsForInstructor() {
            // userGUID is the instructorGUID
            const loginStore = useLoginStore();
            this.announcements = await AnnouncementService.getAnnouncementsByGUID(loginStore.getUserGUID);
        },
        async setAnnouncements() {
            const loginStore = useLoginStore();
            if (loginStore.isStudent) {
                this.setAnnouncementsForStudent();
            } else {
                this.setAnnouncementsForInstructor();
            }
        }
    },

})
