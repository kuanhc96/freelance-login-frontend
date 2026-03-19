import {GetAnnouncementResponse} from '@/dto/response/getAnnouncementResponse';
import {defineStore} from 'pinia';
import {useInstructorsOrStudentsStore} from "@/store/instructorsOrStudents";
import {useLoginStore} from "@/store/login";
import AnnouncementService from "@/services/AnnouncementService"
import {AxiosResponse} from "axios";

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
        setAnnouncementsForStudent() {
            const instructorsStore = useInstructorsOrStudentsStore();

            for (const instructor of instructorsStore.getSubscribedInstructors) {
                AnnouncementService.getAnnouncementsByGUID(instructor.userGUID)
                    .then((res: AxiosResponse) => {
                            this.announcements = res.data;
                        }
                    )
            }
        },
        setAnnouncementsForInstructor() {
            // userGUID is the instructorGUID
            const loginStore = useLoginStore();
            AnnouncementService.getAnnouncementsByGUID(loginStore.getUserGUID)
                .then((res: AxiosResponse) => {
                    this.announcements = res.data;
                }
            )
        },
        setAnnouncements() {
            const loginStore = useLoginStore();
            if (loginStore.isStudent) {
                this.setAnnouncementsForStudent();
            } else {
                this.setAnnouncementsForInstructor();
            }
        }
    },

})
