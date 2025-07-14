import {GetAnnouncementResponse} from '@/dto/response/getAnnouncementResponse';
import {defineStore} from 'pinia';
import {ANNOUNCEMENTS_ENDPOINT} from "@/store";
import {useInstructorsOrStudentsStore} from "@/store/instructorsOrStudents";
import {useLoginStore} from "@/store/login";

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
                const response = await fetch(ANNOUNCEMENTS_ENDPOINT + instructor.userGUID, {
                    method: 'GET',
                    credentials: 'include'
                });
                if (response.ok) {
                    this.announcements = await response.json();
                }
            }
        },
        async setAnnouncementsForInstructor() {
            // userGUID is the instructorGUID
            const loginStore = useLoginStore();
            const response: Response = await fetch(ANNOUNCEMENTS_ENDPOINT + loginStore.getUserGUID, {
                method: 'GET',
                credentials: 'include'
            });
            if (response.ok) {
                this.announcements = await response.json();
            }
        },
        async setAnnouncements() {
            const loginStore = useLoginStore();
            if (loginStore.isStudent) {
                await this.setAnnouncementsForStudent();
            } else {
                await this.setAnnouncementsForInstructor();
            }
        }
    },

})
