import { queryOptions, skipToken } from "@tanstack/react-query"
import type { Credentials } from "@/shared/types/credentials"
import { chatApi } from "../api/chat"

export const chatQueries = {
	allChats: (credentials: Credentials | null) =>
		queryOptions({
			queryKey: [
				"chats",
				"all",
				credentials?.idInstance,
				credentials?.apiTokenInstance,
			],

			queryFn: credentials ? () => chatApi.getAllChats(credentials) : skipToken,
			staleTime: 10 * 60_000,
			gcTime: 30 * 60_000,
		}),
	chatHistory: (
		credentials: Credentials | null,
		chatId: string | null,
		count: number,
	) =>
		queryOptions({
			queryKey: [
				"chats",
				"getOne",
				credentials?.idInstance,
				credentials?.apiTokenInstance,
				chatId,
				count,
			],

			queryFn:
				credentials && chatId
					? () => chatApi.getChatStory(credentials, chatId, count)
					: skipToken,
			staleTime: 10 * 60_000,
			gcTime: 30 * 60_000,
		}),
}
