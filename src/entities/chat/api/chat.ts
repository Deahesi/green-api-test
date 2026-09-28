import { apiClient } from "@/shared/api/client"
import type { Chat, Message } from "../model/types"
import type { Credentials } from "@/shared/types/credentials"
import type { SendMessageBody, SendMessageResponse } from "../model/api"

export const chatApi = {
	getAllChats: async ({
		idInstance,
		apiTokenInstance,
		apiUrl
	}: Credentials): Promise<Chat[]> => {
		const response = await apiClient.get<Chat[]>(
			`${apiUrl}/waInstance${idInstance}/getChats/${apiTokenInstance}`,
		)
		return response.data
	},
	getChatStory: async (
		{ idInstance, apiTokenInstance, apiUrl }: Credentials,
		chatId: string,
		count: number,
	): Promise<Message[]> => {
		const response = await apiClient.post<Message[]>(
			`${apiUrl}/waInstance${idInstance}/getChatHistory/${apiTokenInstance}`,
			{
				count,
				chatId,
			},
		)
		return response.data.toReversed()
	},
	sendMessage: async (
		{ idInstance, apiTokenInstance, apiUrl }: Credentials,
		body: SendMessageBody,
	): Promise<SendMessageResponse> => {
		const response = await apiClient.post<SendMessageResponse>(
			`${apiUrl}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
			body,
		)
		return response.data
	},
}
