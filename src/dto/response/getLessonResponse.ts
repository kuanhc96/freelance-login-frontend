export interface GetLessonResponse {
    lessonGUID: string
    studentGUID: string
    studentName: string
    instructorGUID: string
    instructorName: string
    startDate: string
    locationGUID: string
    locationName: string
    topic: string
    subjectName: string
    endDate: string
    lessonStatus: string
    discount: number
    instructorComments: string
    studentFeedback: string
    lessonRating: number
}
