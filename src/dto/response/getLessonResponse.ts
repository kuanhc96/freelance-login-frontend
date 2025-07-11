export interface GetLessonResponse {
    lessonGUID: string
    studentGUID: string
    studentName: string
    instructorGUID: string
    instructorName: string
    startDate: string
    location: string
    topic: string
    subject: string
    lessonStatus: string
    discount: number
    instructorComments: string
    studentFeedback: string
    lessonRating: number
}
