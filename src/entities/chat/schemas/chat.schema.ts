import { z } from "zod"

export const sendMessageBodySchema = z.object({
	chatId: z.string().min(1, "Выберите чат"),
	message: z
		.string()
		.min(1, "Введите сообщение")
		.max(4096, "Сообщение не должно превышать 4096 символов")
		.refine((message) => message.trim().length > 0, "Введите сообщение"),
	quotedMessageId: z.string().min(1).nullable().optional(),
	typingTime: z.int().min(1000).max(20000).nullable().optional(),
	typingType: z
		.enum([
			"text",
			"record_voice_note",
			"upload_voice_note",
			"record_video_note",
			"upload_video_note",
			"record_video",
			"upload_video",
			"upload_photo",
			"upload_document",
			"choose_sticker",
			"choose_location",
			"choose_contact",
		])
		.optional(),
})

export const checkAccountBodySchema = z.object({
	phoneNumber: z
		.string()
		.trim()
		.min(1, "Введите номер телефона")
		.regex(
			/^[1-9]\d{0,14}$/,
			"Номер должен содержать только цифры без + и пробелов",
		)
		.transform(Number),
	username: z
		.string()
		.trim()
		.regex(/^@[A-Za-z0-9_]+$/, "Укажите username в формате @username")
		.optional(),
	force: z.boolean().optional(),
})
