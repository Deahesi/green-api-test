import { apiClient } from "@/shared/api/client"
import type { Chat, Message } from "../model/types"
import type { Credentials } from "@/shared/types/credentials"
import type { SendMessageBody, SendMessageResponse } from "../model/api"

export const chatApi = {
	getAllChats: async ({
		idInstance,
		apiTokenInstance,
	}: Credentials): Promise<Chat[]> => {
		const response = await apiClient.get<Chat[]>(
			`/waInstance${idInstance}/getChats/${apiTokenInstance}`,
		)
		return response.data
	},
	getChatStory: async (
		{ idInstance, apiTokenInstance }: Credentials,
		chatId: string,
		count: number,
	): Promise<Message[]> => {
		const response = await apiClient.post<Message[]>(
			`/waInstance${idInstance}/getChatHistory/${apiTokenInstance}`,
			{
				count,
				chatId,
			},
		)
		return response.data.toReversed()
	},
	sendMessage: async (
		{ idInstance, apiTokenInstance }: Credentials,
		body: SendMessageBody,
	): Promise<SendMessageResponse> => {
		const response = await apiClient.post<SendMessageResponse>(
			`/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
			body,
		)
		return response.data
	},
}
