export interface GetTransactionResponse {
    transactionGUID: string
    studentName: string
    instructorName: string
    subjectName: string
    subjectDescription: string
    discountCode: string
    numberOfLessons: number
    discountRate: number
    transactionStatus: string
    paymentAmount: number
    creationDate: string
    confirmedDate: string
    canceledDate: string
    comments: string
}
