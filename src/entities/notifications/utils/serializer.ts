import type { Message } from "@/entities/chat/model/types"
import type { Notification } from "../model/types"

const isRecord = (value: unknown): value is Record<string, unknown> =>
	typeof value === "object" && value !== null && !Array.isArray(value)

const isAccountType = (value: unknown): value is Message["chatType"] =>
	value === "user" ||
	value === "group" ||
	value === "supergroup" ||
	value === "channel" ||
	value === "bot"

const optionalString = (value: unknown) =>
	typeof value === "string" ? value : undefined

const forwardingFields = (data: Record<string, unknown>) => ({
	...(typeof data.isForwarded === "boolean"
		? { isForwarded: data.isForwarded }
		: {}),
	...(typeof data.forwardingScore === "number"
		? { forwardingScore: data.forwardingScore }
		: {}),
})

export const serializeNotification = (
	notification: Notification,
): Message | null => {
	const body: unknown = notification.body
	if (!isRecord(body)) return null

	const { typeWebhook, idMessage, timestamp, senderData, messageData } = body
	if (
		typeWebhook !== "incomingMessageReceived" &&
		typeWebhook !== "outgoingMessageReceived" &&
		typeWebhook !== "outgoingAPIMessageReceived"
	) {
		return null
	}

	if (
		typeof idMessage !== "string" ||
		typeof timestamp !== "number" ||
		!isRecord(senderData) ||
		typeof senderData.chatId !== "string" ||
		!isAccountType(senderData.chatType) ||
		!isRecord(messageData)
	) {
		return null
	}

	const direction =
		typeWebhook === "incomingMessageReceived"
			? {
					type: "incoming" as const,
					senderName: optionalString(senderData.senderName),
					senderType: isAccountType(senderData.senderType)
						? senderData.senderType
						: undefined,
					senderContactName: optionalString(senderData.senderContactName),
				}
			: {
					type: "outgoing" as const,
					...(typeWebhook === "outgoingAPIMessageReceived"
						? { sendByApi: true }
						: {}),
				}

	const base = {
		idMessage,
		timestamp,
		chatId: senderData.chatId,
		chatType: senderData.chatType,
		...direction,
	}

	switch (messageData.typeMessage) {
		case "textMessage": {
			const data = messageData.textMessageData
			if (!isRecord(data) || typeof data.textMessage !== "string") {
				return null
			}

			return {
				...base,
				...forwardingFields(data),
				typeMessage: "textMessage",
				textMessage: data.textMessage,
			}
		}

		case "imageMessage":
		case "videoMessage":
		case "documentMessage":
		case "audioMessage": {
			const data = messageData.fileMessageData
			if (!isRecord(data) || typeof data.downloadUrl !== "string") {
				return null
			}

			return {
				...base,
				...forwardingFields(data),
				typeMessage: messageData.typeMessage,
				downloadUrl: data.downloadUrl,
				caption: optionalString(data.caption),
				fileName: optionalString(data.fileName),
				jpegThumbnail: optionalString(data.jpegThumbnail),
				mimeType: optionalString(data.mimeType),
				isAnimated:
					typeof data.isAnimated === "boolean" ? data.isAnimated : undefined,
			}
		}

		case "pollMessage": {
			const data = messageData.pollMessageData
			if (!isRecord(data)) return null

			return {
				...base,
				...forwardingFields(data),
				typeMessage: "pollMessage",
			}
		}

		case "locationMessage": {
			const data = messageData.locationMessageData
			if (!isRecord(data)) return null

			return {
				...base,
				...forwardingFields(data),
				typeMessage: "locationMessage",
			}
		}

		default:
			return null
	}
}
