import { chatQueries } from "@/entities/chat/queries/chat.queries"
import { useAuthStore } from "@/features/auth/store/auth"
import { useQuery } from "@tanstack/react-query"

export const useChatFromList = (chatId: string) => {
	const credentials = useAuthStore((state) => state.accountCredentials)

	return useQuery({
		...chatQueries.allChats(credentials),
		enabled: false,
		select: (chats) => chats.find((chat) => chat.chatId === chatId),
	})
}
