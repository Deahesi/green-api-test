export type TypingType =
	| "text"
	| "record_voice_note"
	| "upload_voice_note"
	| "record_video_note"
	| "upload_video_note"
	| "record_video"
	| "upload_video"
	| "upload_photo"
	| "upload_document"
	| "choose_sticker"
	| "choose_location"
	| "choose_contact"

export type SendMessageBody = {
	chatId: string
	message: string
	quotedMessageId?: string | null
	typingTime?: number | null
	typingType?: TypingType
}

export type SendMessageResponse = {
	idMessage: string
}
