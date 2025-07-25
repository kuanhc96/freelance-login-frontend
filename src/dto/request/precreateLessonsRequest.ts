export interface PrecreateLessonsRequest {
    studentGUID: string,
    instructorGUID: string,
    location: string,
    subjectGUID: string,
    packageGUID: string,
    lessonFrequency: string,
    startDate: string
}
