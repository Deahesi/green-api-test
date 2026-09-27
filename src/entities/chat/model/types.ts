import type { AccountType } from "@/entities/account/@x/chat"

export type Chat = {
	chatId: string
	name: string
	type: AccountType
	phoneNumber: number
	username: string
}

type MessageBase = {
	idMessage: string
	timestamp: number
	chatId: string
	chatType: AccountType
	isForwarded?: boolean
	forwardingScore?: number
}

type MessageDirection =
	| {
			type: "outgoing"
			statusMessage?: "delivered" | "read"
			sendByApi?: boolean
	  }
	| {
			type: "incoming"
			senderName?: string
			senderType?: AccountType
			senderContactName?: string
	  }

type MediaMessageType =
	"imageMessage" | "videoMessage" | "documentMessage" | "audioMessage"

type MessageContent =
	| {
			typeMessage: "textMessage"
			textMessage: string
	  }
	| {
			typeMessage: MediaMessageType
			downloadUrl: string
			caption?: string
			fileName?: string
			jpegThumbnail?: string
			mimeType?: string
			isAnimated?: boolean
	  }
	| {
			typeMessage: "pollMessage" | "locationMessage"
	  }

export type Message = MessageBase & MessageDirection & MessageContent
