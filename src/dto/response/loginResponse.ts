export interface LoginResponse {
    // tokenDuration: number
    userGUID: string
    email: string
    role: string
    expirationTimestamp: number
}
