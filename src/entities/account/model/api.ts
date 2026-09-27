export type CheckAccountBody = {
	phoneNumber?: number | null
	username?: string | null
	force?: boolean
}

export type CheckAccountResponse = {
	exist: boolean
	chatId: string
	username: string
	phoneNumber: number
	fromCache: boolean
}
