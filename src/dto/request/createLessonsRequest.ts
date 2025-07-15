export interface CreateLessonsRequest {
    studentGUID: string,
    instructorGUID: string,
    startDate: string,
    location: string,
    subjectGUID: string,
    topic: string,
    packageGUID: string,
    lessonFrequency: string
}
