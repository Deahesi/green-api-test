export type StateInstance =
	| "notAuthorized"
	| "authorized"
	| "blocked"
	| "suspended"
	| "starting"
	| "pendingPassword"

export type AccountData = {
	avatar: string
	phone: string
	stateInstance: StateInstance
	chatId: string
	suspendedUntil?: number
	username: string
	historySyncProgress: number
}

export type AccountType = "user" | "group" | "supergroup" | "channel" | "bot"

export type ContactData = {
	avatar: string
	name: string
	contactName: string
	chatId: string
	chatType: AccountType
	lastSeen: number
	phoneNumber: number
	username: string
	isPremium: boolean
	isVerified: boolean
	isScam: boolean
	description: string
}
