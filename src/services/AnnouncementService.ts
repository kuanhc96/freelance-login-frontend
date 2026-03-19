import resourceServerClient from "@/services/apiClient";
import {ANNOUNCEMENTS_ENDPOINT} from "@/store";
import {GetAnnouncementResponse} from "@/dto/response/getAnnouncementResponse";
import {UpdateAnnouncementRequest} from "@/dto/request/updateAnnouncementRequest";
import {CreateAnnouncementRequest} from "@/dto/request/CreateAnnouncementRequest";
import {CreateAnnouncementResponse} from "@/dto/response/createAnnouncementResponse";

export default {
    getAnnouncementsByGUID(userGUID: string) {
        return resourceServerClient.get<GetAnnouncementResponse[]>(ANNOUNCEMENTS_ENDPOINT + '/' + userGUID);
    },
    editAnnouncement(announcementId: string, title: string, announcement: string, announcementStatus: string) {
        const body: UpdateAnnouncementRequest = {
            announcementGUID: announcementId,
            title: title,
            announcement: announcement,
            announcementStatus: announcementStatus
        };
        return resourceServerClient.put(ANNOUNCEMENTS_ENDPOINT, body);
    },
    createAnnouncement(instructorGUID: string, title: string, announcement: string) {
        const body: CreateAnnouncementRequest = {
            'instructorGUID': instructorGUID,
            'title': title,
            'announcement': announcement
        }
        return resourceServerClient.post<CreateAnnouncementResponse>(ANNOUNCEMENTS_ENDPOINT, body);
    }
}
