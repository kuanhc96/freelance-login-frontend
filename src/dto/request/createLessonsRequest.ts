export interface CreateLessonsRequest {
    studentGUID: string,
    instructorGUID: string,
    startDate: string,
    location: string,
    subject: string,
    topic: string,
    repeat: number,
    lessonFrequency: string
}
