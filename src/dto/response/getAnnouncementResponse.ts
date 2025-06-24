export interface GetAnnouncementResponse {
    announcementGUID: string
    title: string
    announcement: string
    instructorName: string
    createdDate: string // LocalDateTime in java
    updatedDate: string // LocalDateTime in java
    announcementStatus: string
}